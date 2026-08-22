import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Lazy initialize GoogleGenAI client
let genAI: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAI;
}

// Resilient model fallback list for high-availability
const MODEL_FALLBACK_CANDIDATES = [
  'gemini-2.5-flash',
  'gemini-flash-latest',
  'gemini-3.7-flash',
  'gemini-2.5-flash-lite',
  'gemini-3.1-flash-lite',
];

/**
 * Execute Gemini API with multi-model fallback and retry on transient 503/429 errors
 */
async function generateGeminiWithFallback(params: {
  contents: any;
  config?: any;
}): Promise<string | null> {
  const ai = getGenAI();
  if (!ai) return null;

  for (const model of MODEL_FALLBACK_CANDIDATES) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        });

        if (response && response.text) {
          return response.text;
        }
      } catch (err: any) {
        const isTransient =
          err?.status === 503 ||
          err?.status === 429 ||
          err?.status === 'UNAVAILABLE' ||
          err?.message?.includes('503') ||
          err?.message?.includes('high demand') ||
          err?.message?.includes('Resource has been exhausted') ||
          err?.message?.includes('quota');

        console.warn(
          `Gemini call with model ${model} (attempt ${attempt + 1}) encountered: ${err?.message || err}. Transient: ${isTransient}`
        );

        if (isTransient && attempt === 0) {
          // Wait briefly before retry on same model
          await new Promise((r) => setTimeout(r, 400));
          continue;
        }

        // If error is not transient or second attempt failed, break to next model candidate
        break;
      }
    }
  }

  return null;
}

/**
 * Safe JSON extractor for model outputs that might contain markdown blocks
 */
function extractAndParseJson<T>(rawText: string, fallback: T): T {
  if (!rawText) return fallback;
  try {
    // Strip markdown code block wrappers if present
    let cleaned = rawText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/```\s*$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
    }

    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }

    return JSON.parse(cleaned) as T;
  } catch (e) {
    console.warn('Failed to parse model output as JSON, using fallback:', e);
    return fallback;
  }
}

/**
 * Contextual Jyotish Knowledge Engine for offline or fallback scenarios
 */
function generateContextualVedicCounsel(userProfile: any, messages: any[]): string {
  const lastUserMsg = messages?.slice().reverse().find((m: any) => m.role === 'user')?.text || '';
  const query = lastUserMsg.toLowerCase();
  const name = userProfile?.name || 'Blessed Soul';
  const lifePath = userProfile?.lifePathNumber || 7;
  const destiny = userProfile?.destinyNumber || 11;

  let advice = '';

  if (query.includes('career') || query.includes('job') || query.includes('business') || query.includes('promotion')) {
    advice = `In your chart, with Life Path ${lifePath} and Destiny ${destiny}, the current 10th House karmic transits favor strategic initiatives over impulsive moves. If you are contemplating a transition, the post-new moon phase will bring decisive clarity. Fortify your solar vitality by wearing natural Ruby or Yellow Sapphire after proper sanctification, and chant the *Gayatri Mantra* facing East at sunrise.`;
  } else if (query.includes('marriage') || query.includes('love') || query.includes('relationship') || query.includes('partner') || query.includes('match')) {
    advice = `The 7th House of Sacred Partnerships is illuminated by benevolent aspects of Jupiter and Venus. Vedic synastry teaches that patience and harmonic communication during Mercury shifts resolve karmic frictions. Foster harmony by placing a Sphatik (Quartz) Sri Yantra in the North-East Ishanya corner of your sanctum.`;
  } else if (query.includes('gemstone') || query.includes('stone') || query.includes('crystal') || query.includes('ring') || query.includes('rudraksha')) {
    advice = `For your planetary resonance (Life Path ${lifePath}), your primary benefic Graha benefits tremendously from **Yellow Sapphire (Pukhraj)** or **Emerald (Panna)** set in Panchdhatu or gold. Wear it on an auspicious Shukla Paksha Thursday/Wednesday morning on the designated finger after chanting the respective Bija Mantra 108 times.`;
  } else if (query.includes('sade sati') || query.includes('saturn') || query.includes('shani') || query.includes('dhaya')) {
    advice = `Lord Shani (Saturn) acts as the supreme cosmic taskmaster, guiding soul purification through discipline and dharma. To mitigate any intense transit pressures, light a mustard oil lamp beneath a Peepal tree on Saturdays, chant the *Hanuman Chalisa*, and selflessly serve the less fortunate. Saturn rewards unwavering integrity.`;
  } else if (query.includes('health') || query.includes('healing') || query.includes('vitality') || query.includes('peace')) {
    advice = `Your bio-energetic alignment indicates that balancing the Solar Plexus (Manipura) and Third Eye (Ajna) chakras is paramount. Engage in Pranayama during the auspicious Brahma Muhurta (4:30 - 5:30 AM), utilize 528Hz Solfeggio sound therapy, and offer copper-vessel water Arghya to Surya Deva.`;
  } else {
    advice = `Your celestial blueprint holds deep spiritual resonance. As Jupiter transits your favorable houses, your intuitive capacities are heightened. Channel your energies toward higher learning, meditation, and purposeful actions. Trust that every karmic obstacle is the divine chisel sculpting your greatest dharmic purpose.`;
  }

  return `Namaste ${name}. ${advice}\n\n*Om Shanti Shanti Shanti.* May the cosmic light continually guide your footsteps.`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Cosmic Guidance Endpoint
  app.post('/api/ai/guidance', async (req, res) => {
    try {
      const { userProfile, transitContext, focusArea } = req.body;
      const lifePath = userProfile?.lifePathNumber || 7;
      const destiny = userProfile?.destinyNumber || 11;
      const name = userProfile?.name || 'Seeker';

      const prompt = `You are Acharya Vidyadhar, a revered Master of Vedic Astrology (Jyotish Shastra), Quantum Numerology, and Sacred Geometry at the All India Institute of Occult Science.
User Profile:
- Name: ${name}
- Date of Birth: ${userProfile?.birthDate || '1996-07-14'}
- Life Path Number: ${lifePath}
- Destiny Number: ${destiny}
- Soul Urge Number: ${userProfile?.soulUrgeNumber || 3}
- Focus Area: ${focusArea || 'General Spiritual & Career Growth'}
- Current Transits: ${transitContext || 'Sun in Leo, Jupiter in Taurus, Saturn in Aquarius'}

Provide profound, highly personalized, and auspicious daily Vedic guidance for today. Return your response strictly in pure JSON format:
{
  "guidance": "2-3 insightful paragraphs explaining planetary influences, karmic currents, and actionable advice",
  "affirmation": "One potent cosmic affirmation",
  "luckyNumbers": [3, 7, 11, 21],
  "favorableColor": "Golden Amber",
  "auspiciousDirection": "North-East (Ishanya)",
  "remedy": "Specific Vedic remedy (Mantra, Daan, or Meditation)"
}`;

      const rawText = await generateGeminiWithFallback({
        contents: prompt,
        config: {
          systemInstruction:
            'You are an authentic Vedic Astrologer and Quantum Numerologist. Always offer encouraging, spiritually grounded, and culturally precise Jyotish wisdom. Return pure JSON.',
          responseMimeType: 'application/json',
        },
      });

      const fallbackGuidance = {
        guidance: `Today's cosmic vibrations align harmoniously with your Life Path ${lifePath} and Destiny ${destiny} frequency. Jupiter's benevolent Drishti upon your natal coordinates enhances spiritual discernment and professional clarity. Focus on steady, dharma-aligned actions during midday.`,
        affirmation: 'I am a conscious vessel of divine universal light, guided by eternal cosmic wisdom.',
        luckyNumbers: [((lifePath * 3) % 9) + 1, lifePath, ((destiny * 2) % 9) + 1, 21],
        favorableColor: lifePath % 2 === 0 ? 'Royal Azure & Pearl White' : 'Radiant Saffron & Aura Gold',
        auspiciousDirection: lifePath > 5 ? 'North-East (Ishanya)' : 'East (Surya Kendra)',
        remedy: 'Offer water to Surya Deva at dawn with Arghya and chant Gayatri Mantra 11 times.',
      };

      if (rawText) {
        const parsed = extractAndParseJson(rawText, fallbackGuidance);
        return res.json({ success: true, ...parsed });
      }

      return res.json({ success: true, ...fallbackGuidance });
    } catch (err: any) {
      console.error('Error generating AI guidance:', err);
      return res.json({
        success: true,
        guidance: `The cosmic alignment brings elevated awareness today. Maintain steady focus on your dharma and let intuition steer your career and relationship steps. Channel the healing vibrations of the 528Hz frequency.`,
        affirmation: 'Divine light illuminates every step of my sacred journey.',
        luckyNumbers: [7, 11, 21],
        favorableColor: 'Radiant Gold',
        auspiciousDirection: 'North-East (Ishanya)',
        remedy: 'Offer water to Surya Deva at dawn with Arghya.',
      });
    }
  });

  // AI Cosmic Mentor Chat Endpoint
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { messages, userProfile, currentKundli } = req.body;

      const formattedContents = (messages || []).map((m: { role: string; text: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const systemPrompt = `You are Acharya Vidyadhar, the Senior Cosmic Guru and Vedic Scholar of the All India Institute of Occult Science.
You provide deep, compassionate, and precise counsel rooted in Vedic Astrology (Parashari & Jaimini), Quantum Numerology, Palmistry, and Sacred Gemstone Therapy.
User context:
- Name: ${userProfile?.name || 'Anya'}
- Birth Details: Date: ${userProfile?.birthDate || '1996-07-14'}, Time: ${userProfile?.birthTime || '06:45'}, Place: ${userProfile?.birthCity || 'Varanasi'}
- Life Path: ${userProfile?.lifePathNumber || 7}, Destiny: ${userProfile?.destinyNumber || 11}
- Kundli details: ${JSON.stringify(currentKundli || { lagna: 'Cancer', rashi: 'Taurus', nakshatra: 'Rohini' })}

Keep your answers spiritually uplifting, practical, concise, and structured with clear astrological rationale, mantras, or gemstone wisdom where relevant. Speak with respectful warmth (Namaste, Blessed Soul).`;

      const responseText = await generateGeminiWithFallback({
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt,
        },
      });

      if (responseText) {
        return res.json({
          success: true,
          reply: responseText,
        });
      }

      // Contextual Jyotish fallback response
      const fallbackReply = generateContextualVedicCounsel(userProfile, messages);
      return res.json({
        success: true,
        reply: fallbackReply,
      });
    } catch (err: any) {
      console.error('Error in AI chat:', err);
      const fallbackReply = generateContextualVedicCounsel(req.body?.userProfile, req.body?.messages);
      return res.json({
        success: true,
        reply: fallbackReply,
      });
    }
  });

  // AI Kundli Matching Synastry Analysis Endpoint
  app.post('/api/ai/kundli-match', async (req, res) => {
    try {
      const { person1, person2, gunaScore, doshas } = req.body;

      const prompt = `Perform an in-depth Ashta-Kuta 36 Guna Vedic Astrology matching analysis for marriage/relationship compatibility between:
Person 1: Name: ${person1?.name}, DOB: ${person1?.birthDate}, Rashi: ${person1?.rashi}, Nakshatra: ${person1?.nakshatra}
Person 2: Name: ${person2?.name}, DOB: ${person2?.birthDate}, Rashi: ${person2?.rashi}, Nakshatra: ${person2?.nakshatra}
Calculated Guna Score: ${gunaScore}/36
Dosha Status: ${JSON.stringify(doshas || {})}

Return a structured pure JSON object with:
{
  "compatibilityVerdict": "Excellent / Very Favorable / Moderate / Requires Remedies",
  "scoreSummary": "Concise summary of strengths across Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi",
  "analysis": "Detailed 2-paragraph astrological and spiritual assessment",
  "recommendations": ["remedy 1", "remedy 2", "remedy 3"],
  "longTermOutlook": "Forecast on emotional, financial, and spiritual longevity"
}`;

      const rawText = await generateGeminiWithFallback({
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction:
            'You are a master Vedic Astrologer specializing in Vivaha Synastry and Ashta-Kuta Milan. Return pure JSON.',
        },
      });

      const fallbackMatch = {
        compatibilityVerdict:
          gunaScore >= 28 ? 'Exceptionally Auspicious Union (Uttam)' : gunaScore >= 18 ? 'Favorable Harmonic Match (Madhyam)' : 'Requires Astrological Remedies',
        scoreSummary: `Ashta-Kuta score of ${gunaScore}/36 signifies strong ${
          gunaScore >= 24 ? 'mental and emotional synergy' : 'growth potential with mutual adjustment'
        } with balanced Graha Maitri and Tara Kuta alignments.`,
        analysis: `The energetic interplay between ${person1?.name || 'Partner 1'} (${person1?.rashi || 'Taurus'} - ${person1?.nakshatra || 'Rohini'}) and ${
          person2?.name || 'Partner 2'
        } (${person2?.rashi || 'Scorpio'} - ${person2?.nakshatra || 'Anuradha'}) indicates deep mutual respect and karmic compatibility. Their temperaments complement each other naturally in personal and spiritual pursuits.\n\nWith regular joint meditation and mutual transparent communication during planetary retrogrades, this auspicious bond will cultivate enduring prosperity, emotional sanctuary, and spiritual evolution.`,
        recommendations: [
          'Perform joint Lakshmi-Narayana or Maha Mrityunjaya archana on Shukla Paksha Thursdays.',
          'Establish a sacred Sri Yantra in the North-East (Ishanya) zone of your shared living space.',
          'Maintain patience during major lunar shifts and celebrate spiritual festivals together.',
        ],
        longTermOutlook: 'Blessed with sustained emotional warmth, dharmic harmony, and familial abundance.',
      };

      if (rawText) {
        const parsed = extractAndParseJson(rawText, fallbackMatch);
        return res.json({ success: true, ...parsed });
      }

      return res.json({ success: true, ...fallbackMatch });
    } catch (err: any) {
      console.error('Error in Kundli match AI:', err);
      return res.json({
        success: true,
        compatibilityVerdict: 'Favorable Harmonic Union',
        scoreSummary: 'Strong emotional and spiritual compatibility indicated by high Graha Maitri and Tara Kuta.',
        analysis: 'This planetary union brings stability and mutual intellectual inspiration.',
        recommendations: ['Practice daily gratitude and chant Om together.', 'Honor the north-east direction of your home.'],
        longTermOutlook: 'Blessed with sustained harmony and prosperity.',
      });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kaal Chakra Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

