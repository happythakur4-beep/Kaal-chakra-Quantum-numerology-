export type DeedType = 'punya' | 'papa';

export type PunyaCategory = 
  | 'seva'      // Selfless Service (सेवा)
  | 'satya'     // Truth & Integrity (सत्य)
  | 'daya'      // Compassion & Kindness (दया व करुणा)
  | 'vidya'     // Sharing Knowledge & Wisdom (विद्या दान)
  | 'ahimsa'    // Non-violence & Protection (अहिंसा व जीव रक्षा)
  | 'dharma'    // Duty & Righteous Action (स्वधर्म पालन)
  | 'bhakti';   // Spiritual Devotion & Meditation (भक्ति व साधना)

export type PapaCategory = 
  | 'vachika'   // Sins of Speech (वाचिक पाप - Harsh words, slander, lying)
  | 'kayika'    // Physical Misdeeds (कायिक पाप - Harm, theft, violence)
  | 'manasika'  // Mental Sins (मानसिक पाप - Envy, malice, ill-will)
  | 'droha'     // Betrayal & Fraud (विश्वासघात व कपट)
  | 'lobha'     // Unethical Greed & Hoarding (लोभ व अधार्मिक संचय)
  | 'adharma';  // Neglect of Duty & Exploitation (कर्तव्य हीनता)

export interface KarmaItem {
  id: string;
  title: string;
  hindiTitle: string;
  type: DeedType;
  category: PunyaCategory | PapaCategory;
  points: number; // Positive for Punya (+10 to +100), Negative for Papa (-10 to -100)
  intensity: 'mild' | 'moderate' | 'significant' | 'severe' | 'monumental';
  description: string;
  spiritualContext: string;
  date: string;
  isCustom?: boolean;
  remedy?: string;
}

export interface KarmicDebt {
  id: string;
  title: string;
  hindiTitle: string;
  deity: string;
  description: string;
  impactOnLife: string;
  clearedPercentage: number;
  remedyAction: string;
}

export interface PrayashchittaRemedy {
  id: string;
  name: string;
  hindiName: string;
  category: 'mantra' | 'charity' | 'vow' | 'seva' | 'nature';
  description: string;
  shloka?: string;
  targetCategory: PapaCategory;
  restorationPoints: number;
  frequencyHz?: number;
}

export interface PersonKarmaProfile {
  id: string;
  personName: string;
  rashi: string;
  nakshatra: string;
  birthDate: string;
  birthCity: string;
  sanchitaPoints: number; // Accumulated past karma total
  prarabdhaPoints: number; // Currently ripening karma in this life
  kriyamanaPoints: number; // Present life active actions
  punyaCount: number;
  papaCount: number;
  totalPunyaPoints: number;
  totalPapaPoints: number;
  netKarmicBalance: number;
  karmicRank: string;
  karmicAuraColor: string;
  karmaList: KarmaItem[];
}

export const PRESET_PUNYA_DEEDS: Omit<KarmaItem, 'id' | 'date'>[] = [
  {
    title: 'Annadana (Feeding Hungry Beings)',
    hindiTitle: 'अन्नदान (भूखों को भोजन कराना)',
    type: 'punya',
    category: 'seva',
    points: 45,
    intensity: 'significant',
    description: 'Providing nourishing food to underprivileged individuals, wandering sadhus, or hungry animals with genuine humility.',
    spiritualContext: 'Taittiriya Upanishad declares: "Annam Bahu Kurveeta" (Honor food as Brahman). Feeding the hungry dissolves hunger debts across multiple births.',
  },
  {
    title: 'Go-Seva & Stray Animal Protection',
    hindiTitle: 'गौ-सेवा व बेजुबान पशु-पक्षी रक्षा',
    type: 'punya',
    category: 'ahimsa',
    points: 40,
    intensity: 'significant',
    description: 'Rescuing injured animals, feeding stray dogs/birds, or nurturing cows in shelter with pure affection.',
    spiritualContext: 'Ahimsa is Paramodharma. Protecting voiceless creatures directly neutralizes Rahu-Ketu afflictions and activates Jupiterian grace.',
  },
  {
    title: 'Speaking Truth Under Difficult Circumstances',
    hindiTitle: 'कठिन परिस्थिति में सत्यनिष्ठा',
    type: 'punya',
    category: 'satya',
    points: 50,
    intensity: 'significant',
    description: 'Upholding honesty and transparent truth even when telling a lie could have provided convenient personal gain.',
    spiritualContext: 'Satyameva Jayate. Truth cleanses the Vishuddha (throat chakra) and burns subtle past karmic illusions.',
  },
  {
    title: 'Vidya Dana (Teaching Underprivileged Youth)',
    hindiTitle: 'विद्या दान (निःशुल्क ज्ञान प्रदान)',
    type: 'punya',
    category: 'vidya',
    points: 60,
    intensity: 'monumental',
    description: 'Imparting education, life skills, or spiritual wisdom to those who cannot afford formal instruction.',
    spiritualContext: 'Knowledge is the greatest purifier. Vidya Dana fulfills the Rishi Rina (debt to ancient seers) and enhances Guru/Jupiter.',
  },
  {
    title: 'Forgiving a Deep Betrayal without Grudge',
    hindiTitle: 'हृदय से क्षमादान (बिना द्वेष)',
    type: 'punya',
    category: 'daya',
    points: 55,
    intensity: 'monumental',
    description: 'Releasing bitterness and choosing to forgive an offender completely, freeing both souls from a recurring karmic loop.',
    spiritualContext: 'Kshama (forgiveness) breaks the gravitational pull of vengeance, neutralizing Mars-Saturn malefic karmic binds.',
  },
  {
    title: 'Vriksharopan (Planting Sacred Trees & Grove Care)',
    hindiTitle: 'वृक्षारोपण (पीपल, नीम, तुलसी संवर्धन)',
    type: 'punya',
    category: 'ahimsa',
    points: 35,
    intensity: 'moderate',
    description: 'Planting and nurturing oxygen-rich trees like Peepal, Banyan, Neem, or Tulsi for the collective ecosystem.',
    spiritualContext: 'Varaha Purana states one who plants five trees attains eternal merit. Balances the Prithvi (Earth) element and Mercury.',
  },
  {
    title: 'Seva to Elderly Parents & Mentors',
    hindiTitle: 'माता-पिता व वृद्धजनों की निष्काम सेवा',
    type: 'punya',
    category: 'dharma',
    points: 75,
    intensity: 'monumental',
    description: 'Attending to the physical, emotional, and healthcare needs of aging parents and teachers with respect.',
    spiritualContext: 'Matridevo Bhava, Pitridevo Bhava. Directly dissolves Pitru Rina and grants long life, mental peace, and prosperity.',
  },
  {
    title: 'Silent Mantra Sadhana & Deep Meditation',
    hindiTitle: 'मौन जप व आत्म-अनुसंधान',
    type: 'punya',
    category: 'bhakti',
    points: 30,
    intensity: 'moderate',
    description: 'Daily recitation of sacred frequencies, cultivating stillness, and sending peace vibrations to all sentient beings.',
    spiritualContext: 'Aligns the biofield with cosmic order (Rta), raising vibrational prana and burning seed karmas (Bija Karma).',
  }
];

export const PRESET_PAPA_SINS: Omit<KarmaItem, 'id' | 'date'>[] = [
  {
    title: 'Katur Vachana (Harsh Speech & Verbal Cruelty)',
    hindiTitle: 'कटु वचन व अपमानजनक भाषा (वाचिक दोष)',
    type: 'papa',
    category: 'vachika',
    points: -30,
    intensity: 'moderate',
    description: 'Using demeaning, sarcastic, or cruel words that deeply wound the self-worth and emotional sanity of another person.',
    spiritualContext: 'Words carry acoustic kinetic resonance. Harsh speech pierces the heart deeper than weapons, causing severe Mercury/Budha & 2nd house afflictions.',
    remedy: 'Practice 1 hour of daily Mauna (silence) and chant Gayatri Mantra 27 times to purify the speech center.'
  },
  {
    title: 'Asatya & Deception (Calculated Dishonesty for Profit)',
    hindiTitle: 'धोखाधड़ी, झूठी गवाही व कपट (द्रोह)',
    type: 'papa',
    category: 'droha',
    points: -60,
    intensity: 'severe',
    description: 'Deliberately misrepresenting facts or cheating a trusting individual/business partner for selfish material advantage.',
    spiritualContext: 'Creates dense Tamasik karmic knots that rebound as sudden financial loss, mistrust, and legal complications in Saturn dasha.',
    remedy: 'Return the unjustly obtained wealth or donate an equivalent amount to charity, accompanied by sincere confession.'
  },
  {
    title: 'Irshya & Matsarya (Deep Envy & Wishing Ill-Will)',
    hindiTitle: 'ईर्ष्या, द्वेष व दूसरे के पतन की कामना (मानसिक पाप)',
    type: 'papa',
    category: 'manasika',
    points: -25,
    intensity: 'mild',
    description: 'Harboring secret resentment toward others’ prosperity, happiness, or success, mentally hoping for their downfall.',
    spiritualContext: 'Mental malice poisons one’s own Anahata (Heart) chakra, creating psychological restlessness and Moon-Rahu psychic pollution.',
    remedy: 'Practice Mudita (taking joy in the success of others) and perform daily Surya Namaskar with water oblation.'
  },
  {
    title: 'Harming Innocent Creatures & Environmental Waste',
    hindiTitle: 'जीव हिंसा व प्राकृतिक संसाधनों का अपव्यय',
    type: 'papa',
    category: 'kayika',
    points: -50,
    intensity: 'significant',
    description: 'Inflicting unnecessary physical harm upon animals, birds, insects, or ruthlessly contaminating water sources and nature.',
    spiritualContext: 'Violates the cosmic balance of universal life (Bhuta Rina). Rebounds as chronic health ailments and planetary resistance.',
    remedy: 'Feed stray animals every Saturday, provide clean water pots for birds, and participate in nature conservation.'
  },
  {
    title: 'Kritaghnata (Ingratitude & Abandoning Benefactors)',
    hindiTitle: 'कृतघ्नता (उपकार भूलना व उपकारी से द्रोह)',
    type: 'papa',
    category: 'droha',
    points: -70,
    intensity: 'severe',
    description: 'Forgetting the selfless help given by someone during adversity and turning against them or slandering them later.',
    spiritualContext: 'Mahabharata states: "There is atonement for all sins, but no atonement for the ungrateful." Causes severe loss of fortune.',
    remedy: 'Approach the benefactor with sincere humility, seek their blessings, and support their family or causes.'
  },
  {
    title: 'Neglecting Elderly Parents & Family Duty',
    hindiTitle: 'माता-पिता की उपेक्षा व कर्तव्यहीनता',
    type: 'papa',
    category: 'adharma',
    points: -85,
    intensity: 'monumental',
    description: 'Abandoning aged parents in distress, withholding basic care, or evading righteous familial obligations out of selfish apathy.',
    spiritualContext: 'Triggers severe Pitru Dosha and Shani Mahadasha obstructions, blocking child prosperity and peace of mind.',
    remedy: 'Perform immediate physical seva to parents, offer Tarpana on Amavasya, and support eldercare homes.'
  }
];

export const INITIAL_KARMIC_DEBTS: KarmicDebt[] = [
  {
    id: 'debt-pitru',
    title: 'Pitru Rina (Ancestral Lineage Debt)',
    hindiTitle: 'पितृ ऋण (पूर्वज व कुल ऋण)',
    deity: 'Lord Yama & Ancestral Spirits',
    description: 'The sacred debt owed to our ancestors for the gift of biological life, lineage, genetic wisdom, and initial protection.',
    impactOnLife: 'If unpaid: Unexplained family disputes, delays in childbirth or progeny success, and career stagnation.',
    clearedPercentage: 72,
    remedyAction: 'Perform Shradh / Tarpana on Amavasya, feed crows and cows, and plant a banyan or peepal tree in ancestral memory.'
  },
  {
    id: 'debt-deva',
    title: 'Deva Rina (Debt to Cosmic Elemental Forces)',
    hindiTitle: 'देव ऋण (प्राकृतिक व ईश्वरीय शक्तियों का ऋण)',
    deity: 'Surya, Agni, Varuna, Vayu, Indra',
    description: 'The debt owed to the cosmic gods and elemental forces that provide sunlight, clean air, rainfall, and earthly sustenance.',
    impactOnLife: 'If unpaid: Chronic low vitality, lack of recognition, and feeling disconnected from nature’s abundance.',
    clearedPercentage: 80,
    remedyAction: 'Daily Surya Arghya (water offering to the Sun), Agnihotra or lighting ghee lamps, and conserving water and natural energy.'
  },
  {
    id: 'debt-rishi',
    title: 'Rishi Rina (Debt to Sages, Gurus & Teachers)',
    hindiTitle: 'ऋषि ऋण (गुरु व ज्ञानियों का ऋण)',
    deity: 'Lord Dakshinamurthy & Sage Vyasa',
    description: 'The debt owed to ancient seers, teachers, and intellectuals who passed down scriptures, science, language, and moral codes.',
    impactOnLife: 'If unpaid: Mental confusion, memory issues, inability to assimilate higher wisdom, and academic blocks.',
    clearedPercentage: 88,
    remedyAction: 'Study sacred scriptures (Swadhyaya), teach at least one underprivileged student, and honor your gurus and mentors.'
  },
  {
    id: 'debt-manushya',
    title: 'Manushya Rina (Debt to Human Society & Community)',
    hindiTitle: 'मनुष्य ऋण (समाज व मानव जाति का ऋण)',
    deity: 'Lord Vishnu (Narayana in Humanity)',
    description: 'The debt owed to humanity, doctors, farmers, workers, friends, and society who build civilization and sustain our daily living.',
    impactOnLife: 'If unpaid: Social isolation, lack of loyal companions, loneliness, and legal conflicts.',
    clearedPercentage: 65,
    remedyAction: 'Selfless community service, blood donation, hospitality to unexpected guests (Atithi Devo Bhava), and fair wages to workers.'
  },
  {
    id: 'debt-bhuta',
    title: 'Bhuta Rina (Debt to Animals, Plants & Ecosystem)',
    hindiTitle: 'भूत ऋण (पशु, पक्षी व समस्त प्राणी जगत का ऋण)',
    deity: 'Lord Pashupatinath (Shiva)',
    description: 'The debt owed to domestic animals, birds, insects, and flora that balance the food chain and nourish planetary prana.',
    impactOnLife: 'If unpaid: Restlessness in home environment, sudden domestic obstacles, and psychic disturbances.',
    clearedPercentage: 78,
    remedyAction: 'Daily feeding of birds, street dogs, ants (sugar-flour mix), caring for stray animals, and keeping water pots in summer.'
  }
];

export const PRAYASHCHITTA_REMEDIES: PrayashchittaRemedy[] = [
  {
    id: 'rem-gayatri',
    name: 'Gayatri Mantra Purificatory Chanting',
    hindiName: 'गायत्री महामंत्र शुद्धि साधना',
    category: 'mantra',
    description: '108 daily repetitions of the Savitur Gayatri Mantra to cleanse mental and speech impurities, dissolving psychic debris.',
    shloka: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    targetCategory: 'vachika',
    restorationPoints: 35,
    frequencyHz: 528
  },
  {
    id: 'rem-annadana',
    name: 'Maha Annadana (Mass Hunger Relief)',
    hindiName: 'महा अन्नदान सेवा',
    category: 'charity',
    description: 'Sponsoring or serving warm nutritious meals to 21 or 108 needy people, pilgrims, or orphans without personal publicity.',
    targetCategory: 'lobha',
    restorationPoints: 50
  },
  {
    id: 'rem-mahamrityunjaya',
    name: 'Maha Mrityunjaya Healing Vibrations',
    hindiName: 'महामृत्युंजय मंत्र जप (कायिक शुद्धि)',
    category: 'mantra',
    description: 'Chanting for physical vitality and neutralizing negative karmic impacts of past physical negligence or harm.',
    shloka: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥',
    targetCategory: 'kayika',
    restorationPoints: 45,
    frequencyHz: 432
  },
  {
    id: 'rem-vow-mauna',
    name: 'Mauna Vrata (Sacred Silence Vow)',
    hindiName: 'मौन व्रत व सत्य संकल्प',
    category: 'vow',
    description: 'Observing total silence for 1 day a week or 2 hours daily, cultivating speech austerity and reflecting on truthfulness.',
    targetCategory: 'vachika',
    restorationPoints: 30
  },
  {
    id: 'rem-goseva',
    name: 'Gaushala Seva & Green Fodder Offering',
    hindiName: 'गौशाला सेवा व हरा चारा अर्पण',
    category: 'seva',
    description: 'Offering fresh grass, jaggery, and water to sheltered cows while circumambulating with veneration.',
    targetCategory: 'adharma',
    restorationPoints: 40,
    frequencyHz: 639
  },
  {
    id: 'rem-vriksha',
    name: 'Panchavati Sacred Tree Consecration',
    hindiName: 'पंचवटी वृक्षारोपण व जल सेवा',
    category: 'nature',
    description: 'Planting Peepal, Banyan, Bel, Neem, or Amla and taking pledge to water and guard them until maturity.',
    targetCategory: 'kayika',
    restorationPoints: 40,
    frequencyHz: 741
  }
];

export const INITIAL_PERSON_KARMA_PROFILES: PersonKarmaProfile[] = [
  {
    id: 'profile-anya',
    personName: 'Anya Sharma (Default Seeker)',
    rashi: 'Cancer (Karka - कर्क)',
    nakshatra: 'Pushya (पुष्य)',
    birthDate: '1996-07-14',
    birthCity: 'Varanasi, India',
    sanchitaPoints: 1250,
    prarabdhaPoints: 420,
    kriyamanaPoints: 215,
    punyaCount: 6,
    papaCount: 2,
    totalPunyaPoints: 285,
    totalPapaPoints: -55,
    netKarmicBalance: 230,
    karmicRank: 'Punya-Pradhaana (पुण्य प्रधान - Positive Karmic Ascendant)',
    karmicAuraColor: '#10b981', // Emerald Positive
    karmaList: [
      {
        id: 'k-1',
        title: 'Annadana to 50 Pilgrims at Kashi Ghat',
        hindiTitle: 'काशी घाट पर ५० तीर्थयात्रियों को अन्नदान',
        type: 'punya',
        category: 'seva',
        points: 45,
        intensity: 'significant',
        description: 'Served warm khichdi and fresh water to visiting elderly pilgrims on Karthik Purnima.',
        spiritualContext: 'Feeding pilgrims on sacred riverbanks burns ancestral distress.',
        date: '2026-06-18'
      },
      {
        id: 'k-2',
        title: 'Mentoring 5 Underprivileged Students in Vedic Math',
        hindiTitle: '५ वंचित बच्चों को निःशुल्क गणित व खगोल शिक्षा',
        type: 'punya',
        category: 'vidya',
        points: 60,
        intensity: 'monumental',
        description: 'Conducted weekly free classes and donated notebooks and supplies.',
        spiritualContext: 'Fulfills Rishi Rina and illuminates the Jupiterian path.',
        date: '2026-07-02'
      },
      {
        id: 'k-3',
        title: 'Harsh Speech in Moment of Sudden Anger with Sibling',
        hindiTitle: 'क्रोध के आवेश में भाई से कटु वचन बोलना',
        type: 'papa',
        category: 'vachika',
        points: -30,
        intensity: 'moderate',
        description: 'Lost patience during a stressful family discussion and used hurtful words, causing emotional strain.',
        spiritualContext: 'Afflicts the Vishuddha speech center and creates Mars-Mercury agitation.',
        date: '2026-07-15',
        remedy: 'Seek heartfelt forgiveness and practice 2 hours of quiet meditation.'
      },
      {
        id: 'k-4',
        title: 'Planting 3 Peepal & 2 Neem Saplings',
        hindiTitle: '३ पीपल व २ नीम के पौधे लगाकर संरक्षण का संकल्प',
        type: 'punya',
        category: 'ahimsa',
        points: 35,
        intensity: 'moderate',
        description: 'Planted trees along the temple perimeter and arranged automated drip watering.',
        spiritualContext: 'Generates non-stop bio-pranic merit for decades.',
        date: '2026-07-28'
      },
      {
        id: 'k-5',
        title: 'Rescuing and Nursing an Injured Street Dog',
        hindiTitle: 'घायल श्वान का उपचार व शरण',
        type: 'punya',
        category: 'ahimsa',
        points: 40,
        intensity: 'significant',
        description: 'Provided veterinary care, medication, and foster care for a stray dog with fractured leg.',
        spiritualContext: 'Pleases Lord Bhairava and dissolves malefic Rahu-Ketu shocks.',
        date: '2026-08-05'
      },
      {
        id: 'k-6',
        title: 'Momentary Jealousy over Colleague’s Promotion',
        hindiTitle: 'सहकर्मी की पदोन्नति पर क्षणिक ईर्ष्या व असंतोष',
        type: 'papa',
        category: 'manasika',
        points: -25,
        intensity: 'mild',
        description: 'Felt inward resentment and compared own trajectory instead of genuinely celebrating their milestone.',
        spiritualContext: 'Subtle mental friction that disrupts inner heart peace.',
        date: '2026-08-11',
        remedy: 'Send genuine congratulatory gifts and pray for their sustained well-being.'
      },
      {
        id: 'k-7',
        title: 'Forgiving a Longtime Friend for Broken Promise',
        hindiTitle: 'पुराने मित्र को वादे टूटने पर हृदय से क्षमा',
        type: 'punya',
        category: 'daya',
        points: 55,
        intensity: 'monumental',
        description: 'Chose not to retaliate or speak ill, letting go of long-standing grievance.',
        spiritualContext: 'Liberates both souls from an entangled karmic contract.',
        date: '2026-08-19'
      },
      {
        id: 'k-8',
        title: 'Daily Japa Mala Chanting of Om Namah Shivaya',
        hindiTitle: 'प्रतिदिन १०८ बार ॐ नमः शिवाय जप साधना',
        type: 'punya',
        category: 'bhakti',
        points: 50,
        intensity: 'significant',
        description: 'Maintained unbroken 40-day meditation discipline with pure intent.',
        spiritualContext: 'Elevates cellular consciousness and dissolves Prarabdha friction.',
        date: '2026-08-22'
      }
    ]
  },
  {
    id: 'profile-arjun',
    personName: 'Arjun Verma (The Modern Professional)',
    rashi: 'Leo (Simha - सिंह)',
    nakshatra: 'Magha (मघा)',
    birthDate: '1989-11-20',
    birthCity: 'New Delhi, India',
    sanchitaPoints: 980,
    prarabdhaPoints: 310,
    kriyamanaPoints: 110,
    punyaCount: 3,
    papaCount: 3,
    totalPunyaPoints: 140,
    totalPapaPoints: -115,
    netKarmicBalance: 25,
    karmicRank: 'Madhyama (मध्यम - In Need of Karmic Rebalancing)',
    karmicAuraColor: '#f59e0b', // Amber Balancing
    karmaList: [
      {
        id: 'k-arjun-1',
        title: 'Blood Donation at Emergency Trauma Center',
        hindiTitle: 'आपातकालीन रक्तदान सेवा',
        type: 'punya',
        category: 'daya',
        points: 50,
        intensity: 'significant',
        description: 'Donated rare blood type for an accident victim in critical condition.',
        spiritualContext: 'Raktdana gives second life, directly pacifying malefic Mars.',
        date: '2026-05-12'
      },
      {
        id: 'k-arjun-2',
        title: 'Taking Credit for Junior Colleague’s Project Contribution',
        hindiTitle: 'कनिष्ठ सहयोगी के काम का अनुचित श्रेय लेना',
        type: 'papa',
        category: 'droha',
        points: -60,
        intensity: 'severe',
        description: 'Failed to mention junior designer’s effort in board presentation to secure personal bonus.',
        spiritualContext: 'Karmic theft that invites loss of reputation and sudden team rebellion.',
        date: '2026-06-04',
        remedy: 'Publicly credit the contributor and provide them a mentorship recommendation.'
      },
      {
        id: 'k-arjun-3',
        title: 'Neglecting Aging Parents’ Health Checkups for Business Trip',
        hindiTitle: 'माता-पिता के स्वास्थ्य की अनदेखी',
        type: 'papa',
        category: 'adharma',
        points: -30,
        intensity: 'moderate',
        description: 'Postponed essential medical checkup of mother to attend corporate summit.',
        spiritualContext: 'Generates subtle Pitru debt that creates domestic anxiety.',
        date: '2026-06-25',
        remedy: 'Schedule comprehensive health package and take time off for family care.'
      },
      {
        id: 'k-arjun-4',
        title: 'Anonymous Financial Support to Village School',
        hindiTitle: 'ग्रामीण विद्यालय में गुप्त अर्थदान',
        type: 'punya',
        category: 'vidya',
        points: 45,
        intensity: 'significant',
        description: 'Funded solar electrification and clean water filters for 120 students.',
        spiritualContext: 'Gupt Dana (anonymous charity) carries highest unadulterated spiritual power.',
        date: '2026-07-14'
      },
      {
        id: 'k-arjun-5',
        title: 'Breaking a Promise to Help a Relative in Financial Need',
        hindiTitle: 'जरूरतमंद रिश्तेदार से किया वादा तोड़ना',
        type: 'papa',
        category: 'vachika',
        points: -25,
        intensity: 'mild',
        description: 'Promised assistance but backed out at the last moment due to inconvenience.',
        spiritualContext: 'Causes loss of trustworthiness and weakens Mercury.',
        date: '2026-07-29',
        remedy: 'Extend sincere apology and fulfill whatever part of the commitment is still helpful.'
      },
      {
        id: 'k-arjun-6',
        title: 'Weekly Feeding of Stray Dogs and Birds',
        hindiTitle: 'साप्ताहिक श्वान व पक्षी आहार सेवा',
        type: 'punya',
        category: 'ahimsa',
        points: 45,
        intensity: 'significant',
        description: 'Distributing food every weekend in the neighborhood.',
        spiritualContext: 'Balances Bhuta Rina and protects home from psychic intrusions.',
        date: '2026-08-15'
      }
    ]
  }
];
