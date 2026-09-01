/**
 * Sanctum Engagement & Occult Science Mastery Tracker
 * Manages persistent user engagement, progress percentages, levels, and completion states
 * for all Occult Science and Vedic Sanctum portals across the platform.
 */

export interface SanctumEngagement {
  portalId: string;
  portalName: string;
  visitsCount: number;
  actionsCount: number;
  lastEngagedAt: number; // Unix timestamp
  progressPercentage: number; // 0 to 100
  level: number; // 1 to 5 (1: Novice, 2: Apprentice, 3: Adept, 4: Master, 5: Siddha)
  levelTitle: string;
  levelTitleHindi: string;
  isCompleted: boolean;
  milestones: string[];
}

const STORAGE_KEY = 'kaalchakra_sanctum_engagements_v2';

// Default metadata for known Occult Science Sanctums
export const SANCTUM_PORTAL_METADATA: Record<string, { name: string; hindiName: string; maxExpectedActions: number }> = {
  kundli: {
    name: 'Janam Kundli & 16 Varga',
    hindiName: 'जन्म कुंडली एवं षोडशवर्ग',
    maxExpectedActions: 5,
  },
  matching: {
    name: '36 Guna Milan & Vivah',
    hindiName: 'कुंडली मिलान एवं विवाह',
    maxExpectedActions: 4,
  },
  mentor: {
    name: 'AI Daivajna Live Guidance',
    hindiName: 'दैवज्ञ ऋषि संवाद',
    maxExpectedActions: 6,
  },
  panchang: {
    name: 'Live Vedic Panchang',
    hindiName: 'दैनिक पंचांग एवं मुहूर्त',
    maxExpectedActions: 4,
  },
  lalkitab: {
    name: 'Lal Kitab & 9 Rin Nivaran',
    hindiName: 'लाल किताब एवं ऋण निवारण',
    maxExpectedActions: 5,
  },
  kp: {
    name: 'KP Astrology & Horary',
    hindiName: 'के.पी. कृष्णमूर्ति ज्योतिष',
    maxExpectedActions: 5,
  },
  vastu: {
    name: 'MahaVastu 16 Zones Grid',
    hindiName: 'महावास्तु 16 दिशा चक्र',
    maxExpectedActions: 5,
  },
  numerology: {
    name: 'Ank Jyotish & Lo Shu Grid',
    hindiName: 'अंक ज्योतिष एवं लो-शू ग्रिड',
    maxExpectedActions: 4,
  },
  'tesla-369': {
    name: 'Tesla 3-6-9 Vortex Nexus',
    hindiName: 'टेस्ला 3-6-9 कॉस्मिक पोर्टल',
    maxExpectedActions: 6,
  },
  'emerald-serpent': {
    name: 'Emerald Serpent House Sanctum',
    hindiName: 'नाग मण्डप कुण्डलिनी विवेक',
    maxExpectedActions: 3,
  },
  'sapphire-eagle': {
    name: 'Sapphire Eagle House Sanctum',
    hindiName: 'गरुड़ मण्डप आकाश तत्व',
    maxExpectedActions: 3,
  },
  'crimson-lion': {
    name: 'Crimson Lion House Sanctum',
    hindiName: 'सिंह मण्डप शौर्य तेजस',
    maxExpectedActions: 3,
  },
  'golden-badger': {
    name: 'Golden Badger House Sanctum',
    hindiName: 'सुवर्ण मण्डप धैर्य ओजस',
    maxExpectedActions: 3,
  },
  'gita-confession': {
    name: 'Gita Confessional Sanctum',
    hindiName: 'गीता प्रायश्चित्त मण्डप',
    maxExpectedActions: 4,
  },
};

const LEVEL_TIERS = [
  { minPct: 0, level: 1, title: 'Initiate Seeker', hindiTitle: 'आरंभिक साधक' },
  { minPct: 25, level: 2, title: 'Apprentice Scholar', hindiTitle: 'जिज्ञासु शिष्य' },
  { minPct: 50, level: 3, title: 'Adept Practitioner', hindiTitle: 'अभ्यासी साधक' },
  { minPct: 75, level: 4, title: 'Master Astrologer', hindiTitle: 'पारंगत ज्योतिषी' },
  { minPct: 100, level: 5, title: 'Siddha Illuminator', hindiTitle: 'सिद्ध आचार्य' },
];

function calculateLevel(progressPct: number) {
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (progressPct >= LEVEL_TIERS[i].minPct) {
      return LEVEL_TIERS[i];
    }
  }
  return LEVEL_TIERS[0];
}

// Initial realistic default seed for active seeker exploration
const SEED_ENGAGEMENTS: Record<string, Partial<SanctumEngagement>> = {
  kundli: {
    visitsCount: 3,
    actionsCount: 3,
    progressPercentage: 65,
    lastEngagedAt: Date.now() - 1000 * 60 * 45, // 45 mins ago
    milestones: ['Cast D1 Lagna Chart', 'Computed Vimshottari Dasha', 'Analysed Gochar Transits'],
  },
  'tesla-369': {
    visitsCount: 4,
    actionsCount: 5,
    progressPercentage: 85,
    lastEngagedAt: Date.now() - 1000 * 60 * 15, // 15 mins ago
    milestones: ['Tuned 528Hz Solfeggio', 'Explored 3-6-9 Vortex', 'Simulated Planetary Alignment'],
  },
  panchang: {
    visitsCount: 2,
    actionsCount: 2,
    progressPercentage: 45,
    lastEngagedAt: Date.now() - 1000 * 60 * 120, // 2 hours ago
    milestones: ['Checked Daily Rahu Kaal', 'Calculated Choghadiya Timings'],
  },
  mentor: {
    visitsCount: 1,
    actionsCount: 1,
    progressPercentage: 30,
    lastEngagedAt: Date.now() - 1000 * 60 * 240, // 4 hours ago
    milestones: ['Initiated First Dialogue with Daivajna'],
  },
};

class SanctumEngagementManager {
  private engagements: Record<string, SanctumEngagement> = {};
  private listeners: Array<() => void> = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this.engagements = JSON.parse(raw);
      } else {
        // Initialize with seed engagements for richer initial experience
        const initial: Record<string, SanctumEngagement> = {};
        Object.entries(SANCTUM_PORTAL_METADATA).forEach(([id, meta]) => {
          const seed = SEED_ENGAGEMENTS[id] || {};
          const visits = seed.visitsCount || 0;
          const actions = seed.actionsCount || 0;
          const pct = seed.progressPercentage || (visits > 0 ? 20 : 0);
          const tier = calculateLevel(pct);

          initial[id] = {
            portalId: id,
            portalName: meta.name,
            visitsCount: visits,
            actionsCount: actions,
            lastEngagedAt: seed.lastEngagedAt || (visits > 0 ? Date.now() - 86400000 : 0),
            progressPercentage: pct,
            level: tier.level,
            levelTitle: tier.title,
            levelTitleHindi: tier.hindiTitle,
            isCompleted: pct >= 100,
            milestones: seed.milestones || (visits > 0 ? ['Sanctum Entered'] : []),
          };
        });
        this.engagements = initial;
        this.saveToStorage();
      }
    } catch {
      this.engagements = {};
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.engagements));
      this.notifyListeners();
    } catch (e) {
      console.warn('Failed to save sanctum engagement:', e);
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l());
  }

  public getEngagement(portalId: string): SanctumEngagement {
    if (!this.engagements[portalId]) {
      const meta = SANCTUM_PORTAL_METADATA[portalId] || {
        name: portalId,
        hindiName: portalId,
        maxExpectedActions: 4,
      };
      const tier = calculateLevel(0);
      this.engagements[portalId] = {
        portalId,
        portalName: meta.name,
        visitsCount: 0,
        actionsCount: 0,
        lastEngagedAt: 0,
        progressPercentage: 0,
        level: tier.level,
        levelTitle: tier.title,
        levelTitleHindi: tier.hindiTitle,
        isCompleted: false,
        milestones: [],
      };
    }
    return this.engagements[portalId];
  }

  public getAllEngagements(): Record<string, SanctumEngagement> {
    return { ...this.engagements };
  }

  /**
   * Record when user visits or enters a sanctum portal
   */
  public recordVisit(portalId: string): SanctumEngagement {
    const curr = this.getEngagement(portalId);
    const newVisits = curr.visitsCount + 1;
    const meta = SANCTUM_PORTAL_METADATA[portalId];
    const maxActions = meta?.maxExpectedActions || 4;

    // Calculate boosted progress: first visit gives 20%, additional visits add progressive points
    const baseProgress = Math.min(100, Math.max(curr.progressPercentage, 20 + Math.min(newVisits * 5, 20) + (curr.actionsCount / maxActions) * 60));
    const finalPct = Math.round(baseProgress);
    const tier = calculateLevel(finalPct);

    const updated: SanctumEngagement = {
      ...curr,
      visitsCount: newVisits,
      lastEngagedAt: Date.now(),
      progressPercentage: finalPct,
      level: tier.level,
      levelTitle: tier.title,
      levelTitleHindi: tier.hindiTitle,
      isCompleted: finalPct >= 100,
      milestones: curr.milestones.includes('Sanctum Entered')
        ? curr.milestones
        : [...curr.milestones, 'Sanctum Entered'],
    };

    this.engagements[portalId] = updated;
    this.saveToStorage();
    return updated;
  }

  /**
   * Record a specific action, calculation, or achievement within a sanctum
   */
  public recordAction(portalId: string, milestoneName?: string, boostPct?: number): SanctumEngagement {
    const curr = this.getEngagement(portalId);
    const newActions = curr.actionsCount + 1;
    const meta = SANCTUM_PORTAL_METADATA[portalId];
    const maxActions = meta?.maxExpectedActions || 4;

    const actionIncrement = boostPct !== undefined ? boostPct : Math.round(80 / maxActions);
    const newPct = Math.min(100, Math.max(curr.progressPercentage + actionIncrement, 25));
    const tier = calculateLevel(newPct);

    const milestones = curr.milestones;
    if (milestoneName && !milestones.includes(milestoneName)) {
      milestones.push(milestoneName);
    }

    const updated: SanctumEngagement = {
      ...curr,
      actionsCount: newActions,
      lastEngagedAt: Date.now(),
      progressPercentage: newPct,
      level: tier.level,
      levelTitle: tier.title,
      levelTitleHindi: tier.hindiTitle,
      isCompleted: newPct >= 100,
      milestones,
    };

    this.engagements[portalId] = updated;
    this.saveToStorage();
    return updated;
  }

  /**
   * Reset or recalibrate progress if user wants a clean slate
   */
  public resetEngagement(portalId: string) {
    const meta = SANCTUM_PORTAL_METADATA[portalId] || { name: portalId, hindiName: portalId, maxExpectedActions: 4 };
    const tier = calculateLevel(0);
    this.engagements[portalId] = {
      portalId,
      portalName: meta.name,
      visitsCount: 0,
      actionsCount: 0,
      lastEngagedAt: 0,
      progressPercentage: 0,
      level: tier.level,
      levelTitle: tier.title,
      levelTitleHindi: tier.hindiTitle,
      isCompleted: false,
      milestones: [],
    };
    this.saveToStorage();
  }
}

export const sanctumTracker = new SanctumEngagementManager();
