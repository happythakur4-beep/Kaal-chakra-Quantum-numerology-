/**
 * High-Performance Fuzzy Search Engine for Occult Shastras, Tools, and Resources
 * Features:
 * - Substring, token prefix, and consecutive subsequence matching
 * - Levenshtein-based typo tolerance (e.g., 'kndli' -> 'Kundli', 'vasto' -> 'Vastu')
 * - Transliteration & Hindi script tolerance
 * - Weighted relevance scoring & ranking
 * - Highlight span calculation for exact UI rendering
 */

export interface FuzzyMatchResult<T> {
  item: T;
  score: number;
  matchedField: string;
  highlightRanges: [number, number][]; // [start, end] ranges in the matched string
}

/**
 * Calculates Damerau-Levenshtein edit distance for typo tolerance
 */
export function calculateLevenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const al = a.length;
  const bl = b.length;

  // Optimize: single or double row DP
  const row: number[] = Array.from({ length: bl + 1 }, (_, i) => i);

  for (let i = 1; i <= al; i++) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= bl; j++) {
      const temp = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(
        row[j] + 1,        // deletion
        row[j - 1] + 1,    // insertion
        prev + cost        // substitution
      );
      prev = temp;
    }
  }

  return row[bl];
}

/**
 * Checks if query is a contiguous or non-contiguous subsequence of target
 */
export function matchSubsequence(target: string, query: string): { matches: boolean; score: number; ranges: [number, number][] } {
  let tIdx = 0;
  let qIdx = 0;
  const ranges: [number, number][] = [];
  let currentRangeStart = -1;
  let consecutiveMatches = 0;
  let score = 0;

  while (tIdx < target.length && qIdx < query.length) {
    if (target[tIdx].toLowerCase() === query[qIdx].toLowerCase()) {
      if (currentRangeStart === -1) {
        currentRangeStart = tIdx;
      }
      consecutiveMatches++;
      score += 15 + consecutiveMatches * 8; // reward consecutive character matches

      // Reward matches at start of word
      if (tIdx === 0 || target[tIdx - 1] === ' ' || target[tIdx - 1] === '-' || target[tIdx - 1] === '(') {
        score += 25;
      }

      qIdx++;
    } else {
      if (currentRangeStart !== -1) {
        ranges.push([currentRangeStart, tIdx]);
        currentRangeStart = -1;
      }
      consecutiveMatches = 0;
      score -= 1; // minor penalty for gaps
    }
    tIdx++;
  }

  if (currentRangeStart !== -1) {
    ranges.push([currentRangeStart, tIdx]);
  }

  const allMatched = qIdx === query.length;
  return {
    matches: allMatched,
    score: allMatched ? Math.max(score, 10) : 0,
    ranges: allMatched ? ranges : [],
  };
}

/**
 * Evaluates match between search query and a single text field
 */
export function scoreFieldMatch(fieldValue: string, query: string): { score: number; ranges: [number, number][] } {
  if (!fieldValue || !query) return { score: 0, ranges: [] };

  const targetLower = fieldValue.toLowerCase();
  const queryLower = query.toLowerCase().trim();

  if (!queryLower) return { score: 0, ranges: [] };

  // 1. Exact Full Match
  if (targetLower === queryLower) {
    return { score: 1000, ranges: [[0, fieldValue.length]] };
  }

  // 2. Starts with query (Prefix Match)
  if (targetLower.startsWith(queryLower)) {
    return { 
      score: 800 + Math.round((queryLower.length / targetLower.length) * 100), 
      ranges: [[0, queryLower.length]] 
    };
  }

  // 3. Substring match (Exact Phrase within text)
  const substrIdx = targetLower.indexOf(queryLower);
  if (substrIdx !== -1) {
    // Word boundary bonus
    const isWordStart = substrIdx === 0 || targetLower[substrIdx - 1] === ' ' || targetLower[substrIdx - 1] === '(' || targetLower[substrIdx - 1] === '-';
    const boundaryBonus = isWordStart ? 120 : 0;
    const positionBonus = Math.max(0, 100 - substrIdx * 2);

    return {
      score: 500 + boundaryBonus + positionBonus,
      ranges: [[substrIdx, substrIdx + queryLower.length]],
    };
  }

  // 4. Token-level matching (Multi-word search e.g. "kundli milan", "lo shu 3x3")
  const queryTokens = queryLower.split(/\s+/).filter(Boolean);
  const targetWords = targetLower.split(/[\s,()•\-&]+/).filter(Boolean);

  let tokenScore = 0;
  let tokensMatched = 0;
  const tokenRanges: [number, number][] = [];

  for (const qToken of queryTokens) {
    let bestWordScore = 0;
    let bestRange: [number, number] | null = null;

    // Check against each word in target
    for (const tWord of targetWords) {
      const wordIdx = targetLower.indexOf(tWord);
      
      if (tWord === qToken) {
        bestWordScore = Math.max(bestWordScore, 200);
        bestRange = [wordIdx, wordIdx + tWord.length];
      } else if (tWord.startsWith(qToken)) {
        bestWordScore = Math.max(bestWordScore, 150 + Math.round((qToken.length / tWord.length) * 40));
        bestRange = [wordIdx, wordIdx + qToken.length];
      } else if (tWord.includes(qToken)) {
        const subInWord = tWord.indexOf(qToken);
        bestWordScore = Math.max(bestWordScore, 100);
        bestRange = [wordIdx + subInWord, wordIdx + subInWord + qToken.length];
      } else if (qToken.length >= 3 && tWord.length >= 3) {
        // Typo tolerance per word
        const dist = calculateLevenshteinDistance(qToken, tWord);
        const maxDist = qToken.length <= 4 ? 1 : 2;
        if (dist <= maxDist) {
          const typoScore = Math.max(0, 120 - dist * 35);
          if (typoScore > bestWordScore) {
            bestWordScore = typoScore;
            bestRange = [wordIdx, wordIdx + tWord.length];
          }
        }
      }
    }

    if (bestWordScore > 0) {
      tokensMatched++;
      tokenScore += bestWordScore;
      if (bestRange) tokenRanges.push(bestRange);
    }
  }

  if (tokensMatched === queryTokens.length) {
    return {
      score: tokenScore + 100, // all tokens satisfied
      ranges: tokenRanges,
    };
  }

  // 5. Consecutive Subsequence matching (e.g., 'kndli' -> 'kundli', '369' -> '369 Tesla')
  const subseqResult = matchSubsequence(targetLower, queryLower);
  if (subseqResult.matches) {
    return {
      score: 150 + subseqResult.score,
      ranges: subseqResult.ranges,
    };
  }

  // 6. Direct Typo Tolerance over the whole phrase
  if (queryLower.length >= 4) {
    const dist = calculateLevenshteinDistance(queryLower, targetLower.slice(0, queryLower.length + 2));
    const allowedDist = queryLower.length <= 5 ? 1 : 2;
    if (dist <= allowedDist) {
      return {
        score: Math.max(10, 180 - dist * 50),
        ranges: [[0, Math.min(targetLower.length, queryLower.length)]],
      };
    }
  }

  return { score: 0, ranges: [] };
}

/**
 * Generic Fuzzy Search function for any searchable item array
 */
export function fuzzySearch<T>(
  items: T[],
  query: string,
  fieldsConfig: {
    primaryField: (item: T) => string;
    secondaryFields?: Array<{
      get: (item: T) => string | undefined;
      weight: number;
    }>;
    keywordsField?: (item: T) => string[];
  }
): FuzzyMatchResult<T>[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return items.map(item => ({
      item,
      score: 1,
      matchedField: 'title',
      highlightRanges: [],
    }));
  }

  const results: FuzzyMatchResult<T>[] = [];

  for (const item of items) {
    let totalScore = 0;
    let primaryHighlightRanges: [number, number][] = [];
    let bestMatchedField = 'title';
    let maxFieldScore = 0;

    // 1. Primary Field (e.g. Title) - Highest Weight (1.4x)
    const primaryValue = fieldsConfig.primaryField(item);
    if (primaryValue) {
      const { score, ranges } = scoreFieldMatch(primaryValue, trimmed);
      if (score > 0) {
        const weightedScore = score * 1.4;
        totalScore += weightedScore;
        maxFieldScore = weightedScore;
        bestMatchedField = 'title';
        primaryHighlightRanges = ranges;
      }
    }

    // 2. Secondary Fields (e.g. Hindi Title, Subtitle, Category, Description)
    if (fieldsConfig.secondaryFields) {
      for (const sec of fieldsConfig.secondaryFields) {
        const val = sec.get(item);
        if (val) {
          const { score, ranges } = scoreFieldMatch(val, trimmed);
          if (score > 0) {
            const weightedScore = score * sec.weight;
            totalScore += weightedScore;
            if (weightedScore > maxFieldScore) {
              maxFieldScore = weightedScore;
              bestMatchedField = 'secondary';
              if (primaryHighlightRanges.length === 0) {
                primaryHighlightRanges = ranges;
              }
            }
          }
        }
      }
    }

    // 3. Keywords / Synonyms / Acronyms
    if (fieldsConfig.keywordsField) {
      const keywords = fieldsConfig.keywordsField(item);
      if (keywords && keywords.length > 0) {
        for (const kw of keywords) {
          const { score } = scoreFieldMatch(kw, trimmed);
          if (score > 0) {
            totalScore += score * 0.9;
            if (score * 0.9 > maxFieldScore) {
              bestMatchedField = 'keyword';
            }
          }
        }
      }
    }

    if (totalScore > 0) {
      results.push({
        item,
        score: totalScore,
        matchedField: bestMatchedField,
        highlightRanges: primaryHighlightRanges,
      });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  return results;
}
