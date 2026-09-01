// ==========================================================================
// SACRED BHAGAVAD GITA REPOSITORY & KARMA DECISION SYSTEM
// Full 18 Adhyayas (Chapters), Shlokas, Karmic Doctrines & Decision Engine
// ==========================================================================

export type GitaYogaPath = 'karma' | 'jnana' | 'bhakti' | 'raja';

export type GitaKarmaClassification = 
  | 'karma'          // Prescribed / Dharmic Action (विहित कर्म)
  | 'akarma'         // Selfless / Non-binding Nishkama Action (अकर्म / निष्काम कर्म)
  | 'vikarma'        // Prohibited / Sinful / Destructive Action (विकर्म / निषिद्ध कर्म)
  | 'tyaga'          // Renunciation of the fruit of action (फल त्याग)
  | 'daivi_sampad'   // Divine Auspicious Nature (दैवी सम्पद्)
  | 'asuri_sampad';  // Demonic / Egotistical Binding (आसुरी सम्पद्)

export type GunaType = 'sattva' | 'rajas' | 'tamas';

export interface GitaVerse {
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  english: string;
  hindi: string;
  speaker: 'Sri Krishna' | 'Arjuna' | 'Sanjaya' | 'Dhritarashtra';
  karmicPrinciple: string;
  karmaClassification: GitaKarmaClassification;
  dominantGuna: GunaType;
  chittaShuddhiImpact: number; // -100 to +100
  practicalKarmicAdvice: string;
  frequencyHz?: number;
}

export interface GitaChapter {
  number: number;
  sanskritTitle: string;
  devanagariTitle: string;
  englishTitle: string;
  hindiTitle: string;
  yogaPath: GitaYogaPath;
  totalVerses: number;
  karmicTheme: string;
  philosophicalSummary: string;
  karmicDecisionRule: string;
  keyVerses: GitaVerse[];
}

export interface GitaDilemmaCase {
  id: string;
  title: string;
  category: string;
  dilemma: string;
  personChoiceA: string;
  personChoiceB: string;
  gitaVerdict: string;
  gitaChapterRef: number;
  gitaVerseRef: string;
  gunaAnalysis: {
    sattva: number;
    rajas: number;
    tamas: number;
  };
  karmaType: GitaKarmaClassification;
  krishnaCounsel: string;
  scoreAdjustment: number;
}

// --------------------------------------------------------------------------
// 1. ALL 18 ADHYAYAS (CHAPTERS) OF SRIMAD BHAGAVAD GITA
// --------------------------------------------------------------------------

export const BHAGAVAD_GITA_CHAPTERS: GitaChapter[] = [
  {
    number: 1,
    sanskritTitle: 'Arjuna Vishada Yoga',
    devanagariTitle: 'अर्जुनविषादयोग',
    englishTitle: 'The Yoga of the Despondency of Arjuna',
    hindiTitle: 'अर्जुन का विषाद और कर्म संशय',
    yogaPath: 'karma',
    totalVerses: 47,
    karmicTheme: 'Moral Paralysis, Attachment & The Crisis of Action',
    philosophicalSummary: 'Arjuna is overcome by grief, sentimental delusion, and grief on seeing his kin on the battlefield, casting down his bow Gandiva in profound confusion over duty.',
    karmicDecisionRule: 'Refusing right duty (Svadharma) out of emotional attachment (Moha) or fear of pain generates heavy Tamasic and Rajasic karma. True morality is not escaping duty, but fulfilling it without personal bias.',
    keyVerses: [
      {
        chapter: 1,
        verse: 28,
        sanskrit: 'दृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम्।\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति॥',
        transliteration: 'dṛṣṭvemaṁ sva-janaṁ kṛṣṇa yuyutsuṁ samupasthitam\nsīdanti mama gātrāṇi mukhaṁ ca pariśuṣyati',
        speaker: 'Arjuna',
        english: 'Seeing my own kinsmen gathered here eager for war, O Krishna, my limbs fail me and my mouth is parched.',
        hindi: 'हे कृष्ण! युद्ध की इच्छा वाले इन स्वजनों को देखकर मेरे अंग शिथिल हो रहे हैं और मुख सूख रहा है।',
        karmicPrinciple: 'Attachment to the "I and Mine" (Aham-Mama) clouds discernment (Viveka) and creates karmic confusion.',
        karmaClassification: 'vikarma',
        dominantGuna: 'tamas',
        chittaShuddhiImpact: -20,
        practicalKarmicAdvice: 'Do not mistake sentimental attachment for true righteousness. Act from universal principles, not personal fondness.',
        frequencyHz: 432
      },
      {
        chapter: 1,
        verse: 47,
        sanskrit: 'एवमुक्त्वार्जुनः संख्ये रथोपस्थ उपाविशत्।\nविसृज्य सशरं चापं शोकसंविग्नमानसः॥',
        transliteration: 'evam uktvārjunaḥ saṅkhye rathopastha upāviśat\nvisṛjya sa-śaraṁ cāpaṁ śoka-saṁvigna-mānasaḥ',
        speaker: 'Sanjaya',
        english: 'Having spoken thus on the battlefield, Arjuna cast aside his bow and arrows and sat down upon the chariot, his mind overwhelmed with grief.',
        hindi: 'रणभूमि में ऐसा कहकर शोकमग्न मन वाले अर्जुन धनुष-बाण को त्यागकर रथ के पिछले भाग में बैठ गए।',
        karmicPrinciple: 'Abandoning righteous responsibility due to emotional agony is not renunciation, but faint-heartedness.',
        karmaClassification: 'vikarma',
        dominantGuna: 'tamas',
        chittaShuddhiImpact: -25,
        practicalKarmicAdvice: 'Never make life decisions in states of acute grief or emotional breakdown.',
        frequencyHz: 396
      }
    ]
  },
  {
    number: 2,
    sanskritTitle: 'Sankhya Yoga',
    devanagariTitle: 'सांख्ययोग',
    englishTitle: 'The Yoga of Knowledge & Self-Realization',
    hindiTitle: 'ज्ञान योग, आत्मा की अमरता और निष्काम कर्म',
    yogaPath: 'jnana',
    totalVerses: 72,
    karmicTheme: 'Eternal Soul, Equanimity & The Doctrine of Nishkama Karma',
    philosophicalSummary: 'Sri Krishna reveals the immortality of the Atman, cuts through mortality, and establishes the foundational law of action: You have the right to work, but never to the fruits.',
    karmicDecisionRule: 'Actions performed with unwavering equanimity (Samatvam), without anxiety for victory or defeat, produce zero binding karma (Akarma).',
    keyVerses: [
      {
        chapter: 2,
        verse: 47,
        sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
        transliteration: 'karmaṇy evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi',
        speaker: 'Sri Krishna',
        english: 'You have a right to perform your prescribed duty, but never to the fruits of action. Let not the fruit of action be your motive, nor let your attachment be to inaction.',
        hindi: 'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्मफल के हेतु मत बनो और न ही अकर्मण्यता में तुम्हारी आसक्ति हो।',
        karmicPrinciple: 'The Supreme Law of Nishkama Karma: Detach intention from egoic reward to dissolve karmic bonds instantly.',
        karmaClassification: 'akarma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 100,
        practicalKarmicAdvice: 'Focus 100% of your energy on excellence of execution; surrender all outcome anxiety to the Supreme Cosmos.',
        frequencyHz: 528
      },
      {
        chapter: 2,
        verse: 48,
        sanskrit: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥',
        transliteration: 'yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate',
        speaker: 'Sri Krishna',
        english: 'Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called Yoga.',
        hindi: 'हे धनंजय! आसक्ति त्यागकर, सफलता और असफलता में समान भाव रखकर योग में स्थित होकर कर्म करो। यह समत्व ही योग कहलाता है।',
        karmicPrinciple: 'Equanimity in both triumph and catastrophe is the ultimate shield against karmic residue.',
        karmaClassification: 'akarma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 90,
        practicalKarmicAdvice: 'Cultivate an inner sanctuary unaffected by praise, criticism, profit, or loss.',
        frequencyHz: 639
      },
      {
        chapter: 2,
        verse: 62,
        sanskrit: 'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥',
        transliteration: 'dhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate\nsaṅgāt sañjāyate kāmaḥ kāmāt krodho \'bhijāyate',
        speaker: 'Sri Krishna',
        english: 'While contemplating the objects of the senses, a person develops attachment to them, from attachment desire is born, and from unfulfilled desire anger arises.',
        hindi: 'विषयों का चिन्तन करने वाले पुरुष की उनमें आसक्ति हो जाती है। आसक्ति से कामना उत्पन्न होती है और कामना में बाधा आने से क्रोध उत्पन्न होता है।',
        karmicPrinciple: 'The chain of karmic destruction starts from careless mental contemplation of worldly temptations.',
        karmaClassification: 'vikarma',
        dominantGuna: 'rajas',
        chittaShuddhiImpact: -40,
        practicalKarmicAdvice: 'Guard your mind stream. Cut lust and greed at the level of initial thought before they solidify into compulsive deeds.',
        frequencyHz: 741
      }
    ]
  },
  {
    number: 3,
    sanskritTitle: 'Karma Yoga',
    devanagariTitle: 'कर्मयोग',
    englishTitle: 'The Yoga of Action & Duty',
    hindiTitle: 'कर्मयोग, यज्ञ भावना और निःस्वार्थ सेवा',
    yogaPath: 'karma',
    totalVerses: 43,
    karmicTheme: 'Svadharma, Cosmic Wheel of Yajna & Work as Worship',
    philosophicalSummary: 'Sri Krishna explains that no being can remain inactive even for a single moment. Action performed for universal benefit (Yajna) frees the soul, whereas selfish action enslaves.',
    karmicDecisionRule: 'Action done for selfless contribution (Yajna-Artha) purifies the mind. Doing another’s duty imperfectly is better than doing another’s duty unnaturally.',
    keyVerses: [
      {
        chapter: 3,
        verse: 9,
        sanskrit: 'यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः।\nतदर्थं कर्म कौन्तेय मुक्तसङ्गः समाचर॥',
        transliteration: 'yajñārthāt karmaṇo \'nyatra loko \'yaṁ karma-bandhanaḥ\ntad-arthaṁ karma kaunteya mukta-saṅgaḥ samācara',
        speaker: 'Sri Krishna',
        english: 'Work done as a sacrifice for the Supreme Divine must be performed; otherwise, work causes bondage in this material world. Therefore, perform your duties for His satisfaction alone, free from attachment.',
        hindi: 'यज्ञ (निःस्वार्थ सेवा) के अतिरिक्त अन्य कारणों से किया गया कर्म ही इस संसार में बन्धन का कारण बनता है। इसलिए हे कौन्तेय! आसक्तिरहित होकर यज्ञ के लिए ही कर्म करो।',
        karmicPrinciple: 'Sacrificial and communal service transforms binding labor into divine freedom.',
        karmaClassification: 'akarma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 95,
        practicalKarmicAdvice: 'Dedicate every email, task, or meal to the service of the whole universe.',
        frequencyHz: 852
      },
      {
        chapter: 3,
        verse: 35,
        sanskrit: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥',
        transliteration: 'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt\nsva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ',
        speaker: 'Sri Krishna',
        english: 'It is far better to perform one’s own prescribed duty, even if faulty, than another’s duty perfectly. Destruction in the course of performing one’s own duty is auspicious, but engaging in another’s duty is perilous.',
        hindi: 'दूसरों के कर्तव्य को भली-भांति करने की अपेक्षा अपना कर्तव्य चाहे त्रुटिपूर्ण ही क्यों न हो, श्रेष्ठ है। अपने स्वधर्म में मरना भी कल्याणकारी है, किन्तु परधर्म भय उत्पन्न करने वाला है।',
        karmicPrinciple: 'Authenticity of purpose: You are accountable for your own innate soul calling, not social imitation.',
        karmaClassification: 'karma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 85,
        practicalKarmicAdvice: 'Stop comparing your career or spiritual pace with others; embrace your unique stations of duty.',
        frequencyHz: 528
      }
    ]
  },
  {
    number: 4,
    sanskritTitle: 'Jnana Karma Sanyasa Yoga',
    devanagariTitle: 'ज्ञानकर्मसंन्यासयोग',
    englishTitle: 'The Yoga of Wisdom & Renunciation of Action',
    hindiTitle: 'ज्ञान, कर्म और संन्यास का समन्वय',
    yogaPath: 'jnana',
    totalVerses: 42,
    karmicTheme: 'Dissolving Karma in the Fire of Knowledge (Jnanagni)',
    philosophicalSummary: 'The mystery of Divine Incarnation (Avatar) and the fourfold soul orders (Varna). The fire of Self-Knowledge burns all accumulated past karma (Sanchita Karma) into harmless ashes.',
    karmicDecisionRule: 'He who sees inaction in action, and action in inaction, is truly wise among humans. Knowledge is the ultimate cleanser of karmic guilt.',
    keyVerses: [
      {
        chapter: 4,
        verse: 18,
        sanskrit: 'कर्मण्यकर्म यः पश्येदकर्मणि च कर्म यः।\nस बुद्धिमान्मनुष्येषु स युक्तः कृत्स्नकर्मकृत्॥',
        transliteration: 'karmaṇy akarma yaḥ paśyed akarmaṇi ca karma yaḥ\nsa buddhimān manuṣyeṣu sa yuktaḥ kṛtsna-karma-kṛt',
        speaker: 'Sri Krishna',
        english: 'One who sees inaction in action, and action in inaction, is intelligent among men, and is in the transcendental position, although engaged in all sorts of activities.',
        hindi: 'जो कर्म में अकर्म देखता है और अकर्म में कर्म देखता है, वही मनुष्यों में बुद्धिमान है, वही योगी है और सम्पूर्ण कर्मों को करने वाला है।',
        karmicPrinciple: 'Outer dynamic activity with zero ego identity leaves no karmic fingerprint on the cosmos.',
        karmaClassification: 'akarma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 95,
        practicalKarmicAdvice: 'Act vigorously in the world while knowing your true Self is the pure, unaffected observer.',
        frequencyHz: 963
      },
      {
        chapter: 4,
        verse: 37,
        sanskrit: 'यथैधांसि समिद्धोऽग्निर्भस्मसात्कुरुतेऽर्जुन।\nज्ञानाग्निः सर्वकर्माणि भस्मसात्कुरुते तथा॥',
        transliteration: 'yathaidhāṁsi samiddho \'gnir bhasmasāt kurute \'rjuna\njñānāgniḥ sarva-karmāṇi bhasmasāt kurute tathā',
        speaker: 'Sri Krishna',
        english: 'As a blazing fire turns firewood to ashes, O Arjuna, so does the fire of knowledge burn to ashes all reactions to material activities.',
        hindi: 'जैसे प्रज्वलित अग्नि काष्ठ को भस्म कर देती है, वैसे ही हे अर्जुन! ज्ञान रूपी अग्नि सम्पूर्ण कर्मों और उनके पाप-पुण्य बंधनों को भस्म कर देती है।',
        karmicPrinciple: 'No matter how deep your karmic debts, illuminated Self-knowledge obliterates centuries of karmic impressions.',
        karmaClassification: 'akarma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 100,
        practicalKarmicAdvice: 'Invest daily in spiritual wisdom and meditation to dissolve subconscious guilt and fear.',
        frequencyHz: 528
      }
    ]
  },
  {
    number: 5,
    sanskritTitle: 'Karma Sanyasa Yoga',
    devanagariTitle: 'कर्मसंन्यासयोग',
    englishTitle: 'The Yoga of Renunciation of Action',
    hindiTitle: 'कर्म संन्यास योग और निष्काम साधना',
    yogaPath: 'karma',
    totalVerses: 29,
    karmicTheme: 'Inner Renunciation vs Outer Escapism',
    philosophicalSummary: 'Sri Krishna demonstrates that Karma Yoga (selfless work) is superior and easier than mere physical ascetic withdrawal. The lotus leaf sits in water without being wetted; similarly, the sage acts untainted.',
    karmicDecisionRule: 'Offering all actions to Brahman, he who acts without attachment remains untouched by sin, just as a lotus leaf is unaffected by water.',
    keyVerses: [
      {
        chapter: 5,
        verse: 10,
        sanskrit: 'ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः।\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा॥',
        transliteration: 'brahmaṇy ādhāya karmāṇi saṅgaṁ tyaktvā karoti yaḥ\nlipyate na sa pāpena padma-patram ivāmbhasā',
        speaker: 'Sri Krishna',
        english: 'One who performs duty without attachment, surrendering the results unto the Supreme Lord, is unaffected by sinful action, as the lotus leaf is by water.',
        hindi: 'जो पुरुष सभी कर्मों को परमात्मा में अर्पण करके और आसक्ति त्यागकर कर्म करता है, वह पाप से वैसे ही लिप्त नहीं होता जैसे कमल का पत्ता जल से नहीं भीगता।',
        karmicPrinciple: 'Divine Surrender (Ishvara Pranidhana) acts as a non-stick coating for the soul in daily life.',
        karmaClassification: 'akarma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 90,
        practicalKarmicAdvice: 'Live and work in the noisy world like a lotus flower: rooted in muddy soil, but blooming pure and unstained.',
        frequencyHz: 639
      }
    ]
  },
  {
    number: 6,
    sanskritTitle: 'Dhyana Yoga (Atma Samyama Yoga)',
    devanagariTitle: 'आत्मसंयमयोग',
    englishTitle: 'The Yoga of Meditation & Mind Mastery',
    hindiTitle: 'ध्यान योग और मन का संयम',
    yogaPath: 'raja',
    totalVerses: 47,
    karmicTheme: 'The Mind as Friend or Enemy; Assurance to the Fallen Yogi',
    philosophicalSummary: 'Mastering the restless mind through constant practice (Abhyasa) and dispassion (Vairagya). Krishna reassures that no sincere effort on the spiritual path is ever destroyed, carrying forward into future births.',
    karmicDecisionRule: 'The mind is the friend of him who has conquered it, but the enemy of him who has not. Spiritual merits carry over across reincarnations.',
    keyVerses: [
      {
        chapter: 6,
        verse: 5,
        sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
        transliteration: 'uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ',
        speaker: 'Sri Krishna',
        english: 'One must elevate oneself by one’s own mind, and not degrade oneself. For the mind is the friend of the conditioned soul, and its enemy as well.',
        hindi: 'मनुष्य को चाहिए कि वह अपने मन द्वारा अपना उद्धार करे, अपना पतन न होने दे; क्योंकि यह मन ही आत्मा का मित्र है और मन ही आत्मा का शत्रु है।',
        karmicPrinciple: 'Personal self-responsibility: You are the sole architect of your karma and your inner evolution.',
        karmaClassification: 'karma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 85,
        practicalKarmicAdvice: 'Train your inner dialogue to be encouraging, disciplined, and rooted in nobility.',
        frequencyHz: 432
      },
      {
        chapter: 6,
        verse: 40,
        sanskrit: 'पार्थ नैवेह नामुत्र विनाशस्तस्य विद्यते।\nन हि कल्याणकृत्कश्चिद्दुर्गतिं तात गच्छति॥',
        transliteration: 'pārtha naiveha nāmutra vināśas tasya vidyate\nna hi kalyāṇa-kṛt kaścid durgatiṁ tāta gacchati',
        speaker: 'Sri Krishna',
        english: 'O Partha, neither in this world nor in the next is there destruction for him; for never does anyone who does good go to ruin, My son.',
        hindi: 'हे पार्थ! उस पुरुष का न इस लोक में और न परलोक में ही नाश होता है; क्योंकि हे तात! शुभ कर्म करने वाला कोई भी मनुष्य दुर्गति को प्राप्त नहीं होता।',
        karmicPrinciple: 'The Absolute Safety of Punya: Every positive intention and meditation is permanently credited to your soul account.',
        karmaClassification: 'daivi_sampad',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 95,
        practicalKarmicAdvice: 'Never despair over perceived spiritual setbacks; all sincere virtue is eternally preserved.',
        frequencyHz: 528
      }
    ]
  },
  {
    number: 7,
    sanskritTitle: 'Jnana Vijnana Yoga',
    devanagariTitle: 'ज्ञानविज्ञानयोग',
    englishTitle: 'The Yoga of Knowledge & Realization',
    hindiTitle: 'ईश्वरीय ज्ञान, माया और चार प्रकार के भक्त',
    yogaPath: 'jnana',
    totalVerses: 30,
    karmicTheme: 'Divine Energies, The Veil of Maya & The 4 Seekers',
    philosophicalSummary: 'Sri Krishna describes the higher and lower natures of the Divine, the illusion of the three Gunas (Maya), and the four types of virtuous people who worship Him: the distressed, the seeker of wealth, the inquisitive, and the sage.',
    karmicDecisionRule: 'Overcoming the three-gunas Maya requires taking refuge in the Divine. Purity of devotion determines the karmic fruit of prayer.',
    keyVerses: [
      {
        chapter: 7,
        verse: 14,
        sanskrit: 'दैवी ह्येषा गुणमयी मम माया दुरत्यया।\nमामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते॥',
        transliteration: 'daivī hy eṣā guṇa-mayī mama māyā duratyayā\nmām eva ye prapadyante māyām etāṁ taranti te',
        speaker: 'Sri Krishna',
        english: 'This divine energy of Mine, consisting of the three modes of material nature, is difficult to overcome. But those who surrender unto Me easily cross beyond it.',
        hindi: 'मेरी यह त्रिगुणात्मक अलौकिक माया बड़ी दुस्तर है; परन्तु जो केवल मेरी शरण में आते हैं, वे इस माया को सरलता से पार कर जाते हैं।',
        karmicPrinciple: 'Ego alone cannot untangle karmic knots; divine surrender is the ultimate key to transcendence.',
        karmaClassification: 'daivi_sampad',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 90,
        practicalKarmicAdvice: 'Whenever overwhelmed by circumstances, chant the sacred name and surrender the outcome.',
        frequencyHz: 639
      }
    ]
  },
  {
    number: 8,
    sanskritTitle: 'Aksara Brahma Yoga',
    devanagariTitle: 'अक्षरब्रह्मयोग',
    englishTitle: 'The Yoga of the Imperishable Brahman',
    hindiTitle: 'अक्षर ब्रह्म योग और अन्तकाल की स्मृति',
    yogaPath: 'raja',
    totalVerses: 28,
    karmicTheme: 'Death, Rebirth, Cosmic Cycles & The Last Thought Principle',
    philosophicalSummary: 'The mystery of the soul’s departure at death (Anta-Kala). Whatever state of being one remembers when quitting the body, that alone one attains, being always absorbed in such thought.',
    karmicDecisionRule: 'The culmination of a lifetime of habit determines the dying thought and the subsequent rebirth womb (Yoni).',
    keyVerses: [
      {
        chapter: 8,
        verse: 6,
        sanskrit: 'यं यं वापि स्मरन्भावं त्यजत्यन्ते कलेवरम्।\nतं तमेवैति कौन्तेय सदा तद्भावभावितः॥',
        transliteration: 'yaṁ yaṁ vāpi smaran bhāvaṁ tyajaty ante kalevaram\ntaṁ tam evaiti kaunteya sadā tad-bhāva-bhāvitaḥ',
        speaker: 'Sri Krishna',
        english: 'Whatever state of being one remembers when he quits his body, O son of Kunti, that state he will attain without fail, because of being absorbed in such thoughts.',
        hindi: 'मनुष्य अन्तकाल में जिस-जिस भाव का स्मरण करता हुआ शरीर को त्यागता है, हे कौन्तेय! वह उसी भाव को प्राप्त होता है, क्योंकि वह सदा उसी भाव से भावित रहा है।',
        karmicPrinciple: 'The final thought at death is not random; it is the mathematical summation of your lifelong karmic habits.',
        karmaClassification: 'karma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 85,
        practicalKarmicAdvice: 'Practice daily remembrance of the Divine so that your subconscious is saturated with pure light.',
        frequencyHz: 741
      }
    ]
  },
  {
    number: 9,
    sanskritTitle: 'Raja Vidya Raja Guhya Yoga',
    devanagariTitle: 'राजविद्याराजगुह्ययोग',
    englishTitle: 'The Yoga of Sovereign Science & Sovereign Secret',
    hindiTitle: 'सर्वोत्तम ज्ञान, अनन्य भक्ति और कर्म अर्पण',
    yogaPath: 'bhakti',
    totalVerses: 34,
    karmicTheme: 'Ananya Bhakti, Universal Acceptance & Transforming Even Sinners',
    philosophicalSummary: 'The king of knowledge: Krishna declares that even if the most fallen person worships with undivided devotion, they must be considered righteous, for they have rightly resolved.',
    karmicDecisionRule: 'Whatever you eat, whatever you offer or give away, whatever austerities you perform—do that as an offering unto the Divine to neutralize all karmic reactions.',
    keyVerses: [
      {
        chapter: 9,
        verse: 27,
        sanskrit: 'यत्करोषि यदश्नासि यज्जुहोषि ददासि यत्।\nयत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम्॥',
        transliteration: 'yat karoṣi yad aśnāsi yaj juhoṣi dadāsi yat\nyat tapasyasi kaunteya tat kuruṣva mad-arpaṇam',
        speaker: 'Sri Krishna',
        english: 'Whatever you do, whatever you eat, whatever you offer in sacrifice, whatever you give away, and whatever austerities you perform—do that, O son of Kunti, as an offering to Me.',
        hindi: 'हे कौन्तेय! तुम जो कुछ करते हो, जो कुछ खाते हो, जो कुछ हवन करते हो, जो कुछ दान देते हो और जो कुछ तप करते हो, वह सब मुझे अर्पण करो।',
        karmicPrinciple: 'Complete Arpana (offering) sanctifies every biological and mundane act into liberating karma.',
        karmaClassification: 'akarma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 100,
        practicalKarmicAdvice: 'Before taking a bite of food or starting work, whisper: "Krishnarpanamastu" (May this be offered to the Divine).',
        frequencyHz: 852
      },
      {
        chapter: 9,
        verse: 30,
        sanskrit: 'अपि चेत्सुदुराचारो भजते मामनन्यभाक्।\nसाधुरेव स मन्तव्यः सम्यग्व्यवसितो हि सः॥',
        transliteration: 'api cet su-durācāro bhajate mām ananya-bhāk\nsādhur eva sa mantavyaḥ samyag vyavasito hi saḥ',
        speaker: 'Sri Krishna',
        english: 'Even if one of the most abominable conduct worships Me with unswerving devotion, he must be considered righteous, for he has rightly resolved.',
        hindi: 'यदि कोई अतिशय दुराचारी भी अनन्य भाव से मेरा भक्त होकर मुझे भजता है, तो वह साधु ही मानने योग्य है; क्योंकि उसने यथार्थ निश्चय कर लिया है।',
        karmicPrinciple: 'True repentance and devotional redirection instantly overrides past negative karmic gravity.',
        karmaClassification: 'daivi_sampad',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 95,
        practicalKarmicAdvice: 'Never judge another person as permanently condemned. Transformation is available to every soul in an instant.',
        frequencyHz: 528
      }
    ]
  },
  {
    number: 10,
    sanskritTitle: 'Vibhuti Yoga',
    devanagariTitle: 'विभूतियोग',
    englishTitle: 'The Yoga of Divine Glories',
    hindiTitle: 'परमात्मा की दिव्य विभूतियां',
    yogaPath: 'bhakti',
    totalVerses: 42,
    karmicTheme: 'Seeing the Divine in All Excellence & Creation',
    philosophicalSummary: 'Sri Krishna enumerates His cosmic manifestations: Among lights He is the Sun, among rivers the Ganges, among mountains Meru, among trees the Ashvattha.',
    karmicDecisionRule: 'Recognizing the divine spark in all beings eliminates hatred, envy, and cruelty, fostering Universal Compassion (Sarva-Bhuta-Hite-Ratah).',
    keyVerses: [
      {
        chapter: 10,
        verse: 41,
        sanskrit: 'यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा।\nतत्तदेवावगच्छ त्वं मम तेजोऽंशसम्भवम्॥',
        transliteration: 'yad yad vibhūtimat sattvaṁ śrīmad ūrjitam eva vā\ntat tad evāvagaccha tvaṁ mama tejo-\'ṁśa-sambhavam',
        speaker: 'Sri Krishna',
        english: 'Know that all opulent, beautiful, and glorious creations spring from but a spark of My splendor.',
        hindi: 'जो-जो भी ऐश्वर्ययुक्त, कान्तियुक्त और बलशाली वस्तु या प्राणी है, उसे तुम मेरे ही तेज के अंश से उत्पन्न समझो।',
        karmicPrinciple: 'Humility: Any talent or success you possess is not your ego’s creation, but a loan of divine grace.',
        karmaClassification: 'daivi_sampad',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 85,
        practicalKarmicAdvice: 'Never boast of your intelligence or wealth; acknowledge the source of all majesty with gratitude.',
        frequencyHz: 639
      }
    ]
  },
  {
    number: 11,
    sanskritTitle: 'Vishwaroopa Darshana Yoga',
    devanagariTitle: 'विश्वरूपदर्शनयोग',
    englishTitle: 'The Vision of the Universal Cosmic Form',
    hindiTitle: 'विराट विश्वरूप दर्शन और काल स्वरूप',
    yogaPath: 'bhakti',
    totalVerses: 55,
    karmicTheme: 'Kala (Time) as the Inevitable Dispenser of Karma',
    philosophicalSummary: 'Arjuna is granted divine eyes (Divya Chakshu) to witness the terrifying and majestic Cosmic Form where all universes, gods, planets, and armies enter into the blazing mouth of Time.',
    karmicDecisionRule: 'Time (Kala) has already ordained the consequences of actions. Become a conscious instrument of cosmic righteousness (Nimitta-Matram Bhava).',
    keyVerses: [
      {
        chapter: 11,
        verse: 33,
        sanskrit: 'तस्मात्त्वमुत्तिष्ठ यशो लभस्व जित्वा शत्रून् भुङ्क्ष्व राज्यं समृद्धम्।\nमयैवैते निहताः पूर्वमेव निमित्तमात्रं भव सव्यसाचिन्॥',
        transliteration: 'tasmāt tvam uttiṣṭha yaśo labhasva jitvā śatrūn bhuṅkṣva rājyaṁ samṛddham\nmayaivaite nihatāḥ pūrvam eva nimitta-mātraṁ bhava savya-sācin',
        speaker: 'Sri Krishna',
        english: 'Therefore stand up, acquire fame, conquer your enemies, and enjoy a flourishing kingdom! By Me alone these have already been slain; be merely an instrument, O Savyasachin (Arjuna).',
        hindi: 'इसलिए तुम उठो, यश प्राप्त करो, शत्रुओं को जीतकर समृद्ध राज्य का उपभोग करो। ये सब पहले ही मेरे द्वारा मारे जा चुके हैं; हे सव्यसाची! तुम केवल निमित्त मात्र बन जाओ।',
        karmicPrinciple: 'Surrendering ego agency: You are not the doer, but an instrument of cosmic evolutionary order.',
        karmaClassification: 'akarma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 95,
        practicalKarmicAdvice: 'Act without arrogant pride. Know that divine providence guides all ultimate outcomes.',
        frequencyHz: 741
      }
    ]
  },
  {
    number: 12,
    sanskritTitle: 'Bhakti Yoga',
    devanagariTitle: 'भक्तियोग',
    englishTitle: 'The Yoga of Devotion',
    hindiTitle: 'अनन्य भक्ति और परमात्मा के प्रिय भक्त के लक्षण',
    yogaPath: 'bhakti',
    totalVerses: 20,
    karmicTheme: 'The 35 Golden Virtues of the Beloved Soul',
    philosophicalSummary: 'Sri Krishna details the path of single-minded love and outlines the qualities of the devotee who is dearest to Him: free from malice, friendly, compassionate, forgiving, and self-controlled.',
    karmicDecisionRule: 'He who has no ill will toward any being, who is friendly and compassionate, free from possessiveness and egotism—is exceptionally dear to the Divine.',
    keyVerses: [
      {
        chapter: 12,
        verse: 13,
        sanskrit: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥',
        transliteration: 'adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī',
        speaker: 'Sri Krishna',
        english: 'He who is free from malice toward all living beings, friendly and compassionate, devoid of the sense of possessiveness and egoism, balanced in joy and sorrow, and forgiving...',
        hindi: 'जो किसी प्राणी से द्वेष नहीं करता, जो सबका मित्र और दयालु है, जिसमें ममता और अहंकार नहीं है, जो सुख-दुःख में सम और क्षमावान् है...',
        karmicPrinciple: 'Active compassion and absence of malice dissolve all past ancestral and interpersonal karmic debts.',
        karmaClassification: 'daivi_sampad',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 100,
        practicalKarmicAdvice: 'Wish well even to those who criticize or misunderstand you; this burns away toxic negative karma.',
        frequencyHz: 528
      }
    ]
  },
  {
    number: 13,
    sanskritTitle: 'Kshetra Kshetragya Vibhaga Yoga',
    devanagariTitle: 'क्षेत्रक्षेत्रज्ञविभागयोग',
    englishTitle: 'The Field & The Knower of the Field',
    hindiTitle: 'प्रकृति, पुरुष और शरीर-आत्मा का विवेक',
    yogaPath: 'jnana',
    totalVerses: 34,
    karmicTheme: 'The Body as the Karmic Field (Kshetra) & The Witness Consciousness',
    philosophicalSummary: 'The physical vessel and mental apparatus are the field where seeds of karma are sown and reaped; the Atman is the changeless knower and witness (Kshetragya).',
    karmicDecisionRule: 'He who sees that all actions are performed entirely by material nature (Prakriti), and that the Self is non-doer, truly sees.',
    keyVerses: [
      {
        chapter: 13,
        verse: 29,
        sanskrit: 'प्रकृत्यैव च कर्माणि क्रियमाणानि सर्वशः।\nयः पश्यति तथात्मानमकर्तारं स पश्यति॥',
        transliteration: 'prakṛtyaiva ca karmāṇi kriyamāṇāni sarvaśaḥ\nyaḥ paśyati tathātmānam akartāraṁ sa paśyati',
        speaker: 'Sri Krishna',
        english: 'One who sees that all actions are in every way performed by material nature alone, and thus sees that the Self is not the doer, truly sees.',
        hindi: 'जो यह देखता है कि सम्पूर्ण कर्म सब प्रकार से प्रकृति द्वारा ही किए जा रहे हैं और आत्मा अकर्ता है, वही वास्तव में यथार्थ देखता है।',
        karmicPrinciple: 'Transcending the illusion of individual authorship frees the soul from karmic imprisonment.',
        karmaClassification: 'akarma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 90,
        practicalKarmicAdvice: 'Do not claim personal authorship over the mechanical workings of nature and emotions.',
        frequencyHz: 852
      }
    ]
  },
  {
    number: 14,
    sanskritTitle: 'Gunatraya Vibhaga Yoga',
    devanagariTitle: 'गुणत्रयविभागयोग',
    englishTitle: 'The Three Modes of Material Nature (Gunas)',
    hindiTitle: 'सत्त्व, रज और तम तीनों गुणों का विश्लेषण',
    yogaPath: 'jnana',
    totalVerses: 27,
    karmicTheme: 'Sattva (Purity), Rajas (Passion/Greed) & Tamas (Ignorance/Sloth)',
    philosophicalSummary: 'Sri Krishna breaks down the exact mechanics of how Sattva binds by attachment to joy, Rajas by attachment to restless craving and work, and Tamas by heedlessness, laziness, and sleep.',
    karmicDecisionRule: 'When dying in Sattva, one ascends to pure higher realms. In Rajas, one is reborn among people attached to action. In Tamas, one falls into animalistic consciousness.',
    keyVerses: [
      {
        chapter: 14,
        verse: 17,
        sanskrit: 'सत्त्वात्सञ्जायते ज्ञानं रजसो लोभ एव च।\nप्रमादमोहौ तमसो भवतोऽज्ञानमेव च॥',
        transliteration: 'sattvāt sañjāyate jñānaṁ rajaso lobha eva ca\npramāda-mohau tamaso bhavato \'jñānam eva ca',
        speaker: 'Sri Krishna',
        english: 'From Sattva arises true knowledge; from Rajas arises greed; and from Tamas arise heedlessness, delusion, and ignorance.',
        hindi: 'सत्त्वगुण से ज्ञान उत्पन्न होता है, रजोगुण से निःसंदेह लोभ उत्पन्न होता है और तमोगुण से प्रमाद, मोह तथा अज्ञान उत्पन्न होते हैं।',
        karmicPrinciple: 'The foundational law of psychological karma: Your dominant Guna dictates your daily deeds and destiny.',
        karmaClassification: 'karma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 80,
        practicalKarmicAdvice: 'Systematically reduce Tamas and Rajas through clean food, noble company, and selfless work.',
        frequencyHz: 432
      },
      {
        chapter: 14,
        verse: 18,
        sanskrit: 'ऊर्ध्वं गच्छन्ति सत्त्वस्था मध्ये तिष्ठन्ति राजसाः।\nजघन्यगुणवृत्तिस्था अधो गच्छन्ति तामसाः॥',
        transliteration: 'ūrdhvaṁ gacchanti sattva-sthā madhye tiṣṭhanti rājasāḥ\njaghanya-guṇa-vṛtti-sthā adho gacchanti tāmasāḥ',
        speaker: 'Sri Krishna',
        english: 'Those situated in Sattva go upward; the Rajasic stay in the middle; and the Tamasic, abiding in the lowest tendencies, sink downward.',
        hindi: 'सत्त्वगुण में स्थित पुरुष उच्च लोकों में जाते हैं, रजोगुणी मध्य में (मनुष्य लोक में) रहते हैं और नीच वृत्तियों वाले तमोगुणी अधोगति को प्राप्त होते हैं।',
        karmicPrinciple: 'Karmic Gravitation: Pure thought elevates; selfish ambition stagnates; cruelty and sloth pull downward.',
        karmaClassification: 'karma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 85,
        practicalKarmicAdvice: 'Strive to make your thoughts, words, and meals predominantly Sattvic.',
        frequencyHz: 528
      }
    ]
  },
  {
    number: 15,
    sanskritTitle: 'Purushottama Yoga',
    devanagariTitle: 'पुरुषोत्तमयोग',
    englishTitle: 'The Yoga of the Supreme Divine Personality',
    hindiTitle: 'अश्वत्थ संसार वृक्ष और पुरुषोत्तम स्वरूप',
    yogaPath: 'jnana',
    totalVerses: 20,
    karmicTheme: 'The Inverted Banyan Tree of Samsara & The Eternal Soul',
    philosophicalSummary: 'The cosmic tree of material existence with roots above and branches below. It must be cut down with the strong weapon of detachment (Asanga-Shastra). The Divine is the Indweller in every heart.',
    karmicDecisionRule: 'Severing attachment to transient worldly drama with the axe of dispassion is the quickest path to exhausting Sanchita karma.',
    keyVerses: [
      {
        chapter: 15,
        verse: 7,
        sanskrit: 'ममैवांशो जीवलोके जीवभूतः सनातनः।\nमनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति॥',
        transliteration: 'mamaivāṁśo jīva-loke jīva-bhūtaḥ sanātanaḥ\nmanaḥ-ṣaṣṭhānīndriyāṇi prakṛti-sthāni karṣati',
        speaker: 'Sri Krishna',
        english: 'An eternal portion of Myself becomes a living soul in this world of life, drawing around itself the senses and the mind that reside in material nature.',
        hindi: 'इस देह में यह सनातन जीवात्मा मेरा ही अंश है; और वही प्रकृति में स्थित मन और पांचों इन्द्रियों को अपनी ओर आकर्षित करता है।',
        karmicPrinciple: 'Every human being is essentially divine; mistreating any soul is directly mistreating God.',
        karmaClassification: 'daivi_sampad',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 95,
        practicalKarmicAdvice: 'See the sacred divine spark behind every face, friend, stranger, and adversary alike.',
        frequencyHz: 963
      }
    ]
  },
  {
    number: 16,
    sanskritTitle: 'Daivasura Sampad Vibhaga Yoga',
    devanagariTitle: 'दैवासुरसम्पद्विभागयोग',
    englishTitle: 'The Divine & Demonic Natures / Karmic Archetypes',
    hindiTitle: 'दैवी और आसुरी सम्पदा का भेद',
    yogaPath: 'karma',
    totalVerses: 24,
    karmicTheme: 'The 26 Divine Virtues vs The 6 Gates of Hell (Kama, Krodha, Lobha)',
    philosophicalSummary: 'Sri Krishna provides the ultimate benchmark of human karma: Fearlessness, charity, non-violence, truth, forgiveness are divine (Daivi), leading to liberation. Arrogance, anger, greed, cruelty are demonic (Asuri), leading to bondage.',
    karmicDecisionRule: 'Lust (Kama), Anger (Krodha), and Greed (Lobha) are the three gates to self-destruction. Abandoning them guarantees high karmic merit.',
    keyVerses: [
      {
        chapter: 16,
        verse: 1,
        sanskrit: 'अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः।\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम्॥',
        transliteration: 'abhayaṁ sattva-saṁśuddhir jñāna-yoga-vyavasthitiḥ\ndānaṁ damaś ca yajñaś ca svādhyāyas tapa ārjavam',
        speaker: 'Sri Krishna',
        english: 'Fearlessness, purity of heart, steadfastness in knowledge and yoga, charity, self-control, sacrifice, study of the scriptures, austerity, and uprightness...',
        hindi: 'भय का सर्वथा अभाव, अन्तःकरण की शुद्धि, ज्ञानयोग में दृढ़ स्थिति, दान, इन्द्रियदमन, यज्ञ, स्वाध्याय, तप और सरलता...',
        karmicPrinciple: 'The 26 divine qualities generate pure Punya and dissolve lifetimes of psychic darkness.',
        karmaClassification: 'daivi_sampad',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 100,
        practicalKarmicAdvice: 'Cultivate fearlessness and straightforwardness in your interactions today.',
        frequencyHz: 528
      },
      {
        chapter: 16,
        verse: 21,
        sanskrit: 'त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः।\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत्॥',
        transliteration: 'tri-vidhaṁ narakasyedaṁ dvāraṁ nāśanam ātmanaḥ\nkāmaḥ krodhas tathā lobhas tasmād etat trayaṁ tyajet',
        speaker: 'Sri Krishna',
        english: 'There are three gates leading to the hell of self-destruction for the soul: Lust, Anger, and Greed. Therefore, one should abandon these three.',
        hindi: 'काम, क्रोध और लोभ—ये तीन प्रकार के नरक के द्वार आत्मा का नाश करने वाले हैं। इसलिए इन तीनों का त्याग कर देना चाहिए।',
        karmicPrinciple: 'The three primary roots of all Papa (sinful debt): Uncontrolled craving, wrath, and covetousness.',
        karmaClassification: 'asuri_sampad',
        dominantGuna: 'tamas',
        chittaShuddhiImpact: -80,
        practicalKarmicAdvice: 'Whenever tempted by sudden anger or dishonest gain, pause immediately and invoke Krishna.',
        frequencyHz: 396
      }
    ]
  },
  {
    number: 17,
    sanskritTitle: 'Shraddhatraya Vibhaga Yoga',
    devanagariTitle: 'श्रद्धात्रयविभागयोग',
    englishTitle: 'The Threefold Division of Faith, Food & Charity',
    hindiTitle: 'तीन प्रकार की श्रद्धा, आहार, यज्ञ, तप और दान',
    yogaPath: 'karma',
    totalVerses: 28,
    karmicTheme: 'Sattvic, Rajasic & Tamasic Charity (Dana), Food (Ahara) & Vows (Tapas)',
    philosophicalSummary: 'Sri Krishna categorizes human activities based on motivation. Charity given with duty, to a worthy recipient, at proper place and time with no expectation is Sattvic. Charity given grudgingly for return is Rajasic. Charity given with insult to the unworthy is Tamasic.',
    karmicDecisionRule: 'Charity (Dana) gives maximum Punya only when given with reverence and zero expectation of recognition or reciprocation.',
    keyVerses: [
      {
        chapter: 17,
        verse: 20,
        sanskrit: 'दातव्यमिति यद्दानं दीयतेऽनुपकारिणे।\nदेशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम्॥',
        transliteration: 'dātavyam iti yad dānaṁ dīyate \'nupakāriṇe\ndeśe kāle ca pātre ca tad dānaṁ sāttvikaṁ smṛtam',
        speaker: 'Sri Krishna',
        english: 'Charity given out of duty, without expectation of return, at the proper place and time, to a worthy person, is considered Sattvic (pure).',
        hindi: 'दान देना ही कर्तव्य है—ऐसा मानकर जो दान बिना किसी उपकार की आशा के, उचित स्थान और समय पर, योग्य पात्र को दिया जाता है, वह सात्त्विक दान कहलाता है।',
        karmicPrinciple: 'The Golden Law of Pure Giving: Intention, timing, and humility magnify the spiritual merit of charity a thousandfold.',
        karmaClassification: 'daivi_sampad',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 95,
        practicalKarmicAdvice: 'When you give help, protect the dignity of the recipient; never make them feel indebted.',
        frequencyHz: 639
      },
      {
        chapter: 17,
        verse: 21,
        sanskrit: 'यत्तु प्रत्युपकारार्थं फलमुद्दिश्य वा पुनः।\nदीयते च परिक्लिष्टं तद्दानं राजसं स्मृतम्॥',
        transliteration: 'yat tu pratyupakārārthaṁ phalam uddiśya vā punaḥ\ndīyate ca parikliṣṭaṁ tad dānaṁ rājasaṁ smṛtam',
        speaker: 'Sri Krishna',
        english: 'But that charity which is given with the hope of return, or with a desire for fruits, or grudgingly, is said to be Rajasic.',
        hindi: 'परन्तु जो दान प्रत्युपकार के प्रयोजन से अथवा फल को दृष्टि में रखकर अथवा क्लेशपूर्वक (अनिच्छा से) दिया जाता है, वह राजसिक कहा जाता है।',
        karmicPrinciple: 'Transactional generosity yields only ephemeral social results, not true spiritual purification.',
        karmaClassification: 'karma',
        dominantGuna: 'rajas',
        chittaShuddhiImpact: 10,
        practicalKarmicAdvice: 'Do not announce your donations or good deeds for social media likes or praise.',
        frequencyHz: 432
      }
    ]
  },
  {
    number: 18,
    sanskritTitle: 'Moksha Sanyasa Yoga',
    devanagariTitle: 'मोक्षसंन्यासयोग',
    englishTitle: 'The Ultimate Yoga of Liberation & Renunciation',
    hindiTitle: 'मोक्ष संन्यास योग, कर्म के पांच कारण और अन्तिम शरणागति',
    yogaPath: 'karma',
    totalVerses: 78,
    karmicTheme: 'The 5 Factors of Action, Classification of Intellect/Work & The Supreme Promise (Sharanagati)',
    philosophicalSummary: 'The grand synthesis of the entire Gita. Krishna explains the five causes of all actions (Body, Doer, Senses, Effort, Destiny). Giving up selfish desires is Sannyasa; abandoning fruits of action is Tyaga. The final, sweetest verse offers total liberation to whoever surrenders to Him.',
    karmicDecisionRule: 'Surrender all dharmas and take refuge in Sri Krishna alone; He shall liberate you from all sins and karmic debts. Do not grieve.',
    keyVerses: [
      {
        chapter: 18,
        verse: 14,
        sanskrit: 'अधिष्ठानं तथा कर्ता करणं च पृथग्विधम्।\nविविधाश्च पृथक्चेष्टा दैवं चैवात्र पञ्चमम्॥',
        transliteration: 'adhiṣṭhānaṁ tathā kartā karaṇaṁ ca pṛthag-vidham\nvividhāś ca pṛthak ceṣṭā daivaṁ caivātra pañcamam',
        speaker: 'Sri Krishna',
        english: 'The place of action (the body), the performer (ego), the various senses, the many diverse efforts, and fifthly, divine destiny (Providence)—these are the five factors of all action.',
        hindi: 'कर्म की सिद्धि में पांच कारण होते हैं: अधिष्ठान (शरीर), कर्ता (अहंकार), विभिन्न करण (इन्द्रियां), विविध चेष्टाएं और पांचवां दैव (ईश्वरीय विधान/प्रारब्ध)।',
        karmicPrinciple: 'The Fivefold Agency Law: Recognizing that Providence (Daivam) and nature hold 80% of factors dissolves egotistical arrogance.',
        karmaClassification: 'akarma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 90,
        practicalKarmicAdvice: 'Put forth your highest effort (Cheshta), but accept the outcome as the decree of cosmic Daivam.',
        frequencyHz: 528
      },
      {
        chapter: 18,
        verse: 66,
        sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
        transliteration: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ',
        speaker: 'Sri Krishna',
        english: 'Abandon all varieties of dharmas and simply surrender unto Me alone. I shall deliver you from all sinful reactions; do not grieve!',
        hindi: 'सम्पूर्ण धर्मों को त्यागकर केवल मेरी शरण में आ जाओ। मैं तुम्हें समस्त पापों और कर्म-बंधनों से मुक्त कर दूंगा, तुम शोक मत करो।',
        karmicPrinciple: 'The Supreme Maha-Vakya of the Gita: Total unconditional self-surrender (Prapatti) absolves millions of lifetimes of past sins.',
        karmaClassification: 'akarma',
        dominantGuna: 'sattva',
        chittaShuddhiImpact: 100,
        practicalKarmicAdvice: 'When life feels impossible and karmic debts feel heavy, surrender everything to Sri Krishna with absolute trust.',
        frequencyHz: 963
      }
    ]
  }
];

// --------------------------------------------------------------------------
// 2. GITA KARMA DECISION ORACLE CASES (REAL LIFE DILEMMAS & ACTIONS)
// --------------------------------------------------------------------------

export const GITA_KARMA_DECISION_CASES: GitaDilemmaCase[] = [
  {
    id: 'dilemma-1',
    title: 'Work Motivation: Salary & Promotion vs Selfless Duty',
    category: 'Career & Ambition',
    dilemma: 'Should I only perform at my job if promised a high bonus and public recognition, or work with pure dedication regardless of credit?',
    personChoiceA: 'Work aggressively only when bonus and recognition are guaranteed.',
    personChoiceB: 'Perform duty with excellence, viewing work as worship, detachment from appraisal.',
    gitaVerdict: 'Action driven purely by greed for reward is Rajasic (binding). Action done with mastery as an offering to God is Nishkama Karma (liberating).',
    gitaChapterRef: 2,
    gitaVerseRef: 'BG 2.47 & BG 3.9',
    gunaAnalysis: { sattva: 75, rajas: 20, tamas: 5 },
    karmaType: 'akarma',
    krishnaCounsel: 'Do not make the fruit of action your motive. Focus completely on the perfection of your craft (Yogaḥ karmasu kauśalam). Prosperity follows excellence naturally.',
    scoreAdjustment: 40
  },
  {
    id: 'dilemma-2',
    title: 'Confrontation vs Escapism in Righteous Conflict',
    category: 'Conflict & Courage',
    dilemma: 'When faced with injustice or workplace exploitation by people you know, should you walk away to keep peace or stand firm for truth?',
    personChoiceA: 'Walk away silently out of fear of conflict and false sentimentality.',
    personChoiceB: 'Stand firmly for righteousness (Dharma) with calm conviction, without malice.',
    gitaVerdict: 'Running away from necessary duty out of weakness is Tamasic escapism (Arjuna’s error in Ch. 1). Standing for Dharma without hatred is Sattvic courage.',
    gitaChapterRef: 2,
    gitaVerseRef: 'BG 2.2 - Klaibyaṁ mā sma gamaḥ pārtha',
    gunaAnalysis: { sattva: 80, rajas: 15, tamas: 5 },
    karmaType: 'karma',
    krishnaCounsel: 'Do not yield to unmanliness, O warrior. Cast off petty faint-heartedness and arise to defend justice.',
    scoreAdjustment: 50
  },
  {
    id: 'dilemma-3',
    title: 'Charity: Anonymous Giving vs Social Media Publicity',
    category: 'Generosity & Charity',
    dilemma: 'Should I film myself giving food to poor people for social media validation, or give anonymously to protect their self-respect?',
    personChoiceA: 'Film and announce my donations to increase followers and personal fame.',
    personChoiceB: 'Give quietly and reverently at a worthy time, seeking zero public praise.',
    gitaVerdict: 'Giving for vanity and praise is Rajasic Dana (BG 17.21). Giving quietly to protect the recipient’s honor is Sattvic Dana (BG 17.20).',
    gitaChapterRef: 17,
    gitaVerseRef: 'BG 17.20 - Dātavyam iti yad dānam',
    gunaAnalysis: { sattva: 90, rajas: 10, tamas: 0 },
    karmaType: 'daivi_sampad',
    krishnaCounsel: 'The left hand should not know what the right hand gives. Protect the sacred dignity of every being you assist.',
    scoreAdjustment: 45
  },
  {
    id: 'dilemma-4',
    title: 'Betrayal: Revenge vs Karmic Equanimity & Forgiveness',
    category: 'Emotional Mastery',
    dilemma: 'A close colleague or relative cheated you out of money. Should you plot revenge to hurt them, or take legal/rational measures without harboring hatred?',
    personChoiceA: 'Obsess day and night over revenge, wishing suffering upon them.',
    personChoiceB: 'Take necessary practical safeguards while releasing hatred from your heart.',
    gitaVerdict: 'Revenge and malice are the gates of Asuri nature (BG 16.21). Calmness and freedom from enmity (Adveṣṭā) burn away karmic friction.',
    gitaChapterRef: 12,
    gitaVerseRef: 'BG 12.13 & BG 16.21',
    gunaAnalysis: { sattva: 85, rajas: 10, tamas: 5 },
    karmaType: 'akarma',
    krishnaCounsel: 'He who holds no grudge against any living being is dearest to Me. The cosmic law of Karma will balance all debts in its own time.',
    scoreAdjustment: 55
  },
  {
    id: 'dilemma-5',
    title: 'Diet & Consumption: Sattvic Nourishment vs Sensual Greed',
    category: 'Lifestyle & Health',
    dilemma: 'Should I consume whatever tastes intense even if it involves cruelty and health damage, or choose wholesome, peaceful nutrition?',
    personChoiceA: 'Eat excessively for sensory addiction, disregarding life and vitality.',
    personChoiceB: 'Consume fresh, peaceful, nourishing Sattvic foods offered with gratitude.',
    gitaVerdict: 'Foods that are bitter, pungent, and dry cause grief (Rajasic - BG 17.9). Foods that promote lifespan, purity, strength, and joy are Sattvic (BG 17.8).',
    gitaChapterRef: 17,
    gitaVerseRef: 'BG 17.8 - Āyuḥ-sattva-balārogya',
    gunaAnalysis: { sattva: 90, rajas: 10, tamas: 0 },
    karmaType: 'karma',
    krishnaCounsel: 'Purity of food leads to purity of mind (Chitta Shuddhi), which leads to steadfast remembrance of the Self.',
    scoreAdjustment: 35
  },
  {
    id: 'dilemma-6',
    title: 'Past Regret & Guilt vs Surrender to Grace',
    category: 'Spiritual Healing',
    dilemma: 'I committed terrible mistakes in my youth. Am I doomed forever, or can sincere repentance and Krishna surrender redeem me?',
    personChoiceA: 'Remain trapped in chronic self-loathing, believing redemption is impossible.',
    personChoiceB: 'Acknowledge mistakes honestly, make restitution, and surrender to divine grace.',
    gitaVerdict: 'Even the greatest transgressor who turns to unswerving devotion becomes righteous instantly (BG 9.30). Sri Krishna promises total redemption (BG 18.66).',
    gitaChapterRef: 9,
    gitaVerseRef: 'BG 9.30 & BG 18.66',
    gunaAnalysis: { sattva: 95, rajas: 5, tamas: 0 },
    karmaType: 'daivi_sampad',
    krishnaCounsel: 'Never weep in despair over the past. Surrender your burdens to Me; I shall deliver you from all sins. Do not grieve!',
    scoreAdjustment: 60
  }
];

// --------------------------------------------------------------------------
// 3. GITA KARMA EVALUATION HELPER FUNCTIONS
// --------------------------------------------------------------------------

export function evaluateActionWithGita(actionText: string): {
  karmaType: GitaKarmaClassification;
  dominantGuna: GunaType;
  sattvaScore: number;
  rajasScore: number;
  tamasScore: number;
  matchingChapter: GitaChapter;
  matchingVerse: GitaVerse;
  verdictTitle: string;
  verdictExplanation: string;
  krishnaGuidance: string;
  points: number;
} {
  const lower = actionText.toLowerCase();

  // Pattern checks
  const isSelfless = lower.includes('feed') || lower.includes('help') || lower.includes('serve') || lower.includes('charity') || lower.includes('truth') || lower.includes('meditat') || lower.includes('pray') || lower.includes('forgiv') || lower.includes('save') || lower.includes('plant') || lower.includes('teach');
  const isEgoDriven = lower.includes('money') || lower.includes('fame') || lower.includes('show') || lower.includes('pride') || lower.includes('compete') || lower.includes('win') || lower.includes('promotion') || lower.includes('status');
  const isHarmful = lower.includes('cheat') || lower.includes('lie') || lower.includes('steal') || lower.includes('hate') || lower.includes('kill') || lower.includes('hurt') || lower.includes('revenge') || lower.includes('curse') || lower.includes('abuse') || lower.includes('betray');

  if (isHarmful) {
    const ch = BHAGAVAD_GITA_CHAPTERS[15]; // Ch 16
    const verse = ch.keyVerses[1] || ch.keyVerses[0];
    return {
      karmaType: 'vikarma',
      dominantGuna: 'tamas',
      sattvaScore: 10,
      rajasScore: 35,
      tamasScore: 55,
      matchingChapter: ch,
      matchingVerse: verse,
      verdictTitle: 'VIKARMA (निषिद्ध / आसुरी कर्म - Demonic Transgression)',
      verdictExplanation: 'This action stems from anger (Krodha), greed (Lobha), or malicious desire (Kama), which the Gita identifies in Chapter 16 as the three destroyers of the soul.',
      krishnaGuidance: 'Cease this action immediately. Perform Prayashchitta (repentance), seek forgiveness from those harmed, and chant the Maha-Mantra to cleanse the subconscious chitta.',
      points: -50
    };
  }

  if (isEgoDriven && !isSelfless) {
    const ch = BHAGAVAD_GITA_CHAPTERS[16]; // Ch 17
    const verse = ch.keyVerses[1] || ch.keyVerses[0];
    return {
      karmaType: 'karma',
      dominantGuna: 'rajas',
      sattvaScore: 30,
      rajasScore: 60,
      tamasScore: 10,
      matchingChapter: ch,
      matchingVerse: verse,
      verdictTitle: 'RAJASIC SAKAMA KARMA (राजसिक सकाम कर्म - Desire-Bound Action)',
      verdictExplanation: 'The action is not sinful, but it is deeply bound by attachment to personal reward, fame, or social validation (BG 2.47, 17.21). It will yield worldly results but also karmic rebirth cycles.',
      krishnaGuidance: 'Elevate your intention. Perform the exact same work, but mentally dedicate all its results as an offering to God (BG 9.27). This converts Rajas into liberating Sattva.',
      points: 15
    };
  }

  if (isSelfless) {
    const ch = BHAGAVAD_GITA_CHAPTERS[1]; // Ch 2 or 3
    const verse = ch.keyVerses[0];
    return {
      karmaType: 'akarma',
      dominantGuna: 'sattva',
      sattvaScore: 85,
      rajasScore: 12,
      tamasScore: 3,
      matchingChapter: ch,
      matchingVerse: verse,
      verdictTitle: 'NISHKAMA SATTVIC AKARMA (निष्काम सात्त्विक अकर्म - Supreme Pure Virtue)',
      verdictExplanation: 'This deed embodies the highest doctrine of the Bhagavad Gita: Nishkama Karma and Yajna (BG 2.47 & BG 3.9). Performed without egoic attachment, it purifies the inner consciousness and generates immortal Punya.',
      krishnaGuidance: 'Remain steadfast in this selfless spirit. Neither become proud of your virtue nor expect gratitude from those you help. See Narayana in all beings.',
      points: 50
    };
  }

  // Default balanced case
  const ch = BHAGAVAD_GITA_CHAPTERS[2]; // Ch 3
  const verse = ch.keyVerses[0];
  return {
    karmaType: 'karma',
    dominantGuna: 'sattva',
    sattvaScore: 60,
    rajasScore: 30,
    tamasScore: 10,
    matchingChapter: ch,
    matchingVerse: verse,
    verdictTitle: 'SVADHARMA KARMA (स्वधर्म कर्म - Duty Aligned Action)',
    verdictExplanation: 'This action is in harmony with your natural duty and station of life. When performed honestly, it maintains cosmic and social harmony.',
    krishnaGuidance: 'Perform this duty with equanimity. Treat success and failure alike, anchoring your mind in the eternal witness consciousness.',
    points: 30
  };
}
