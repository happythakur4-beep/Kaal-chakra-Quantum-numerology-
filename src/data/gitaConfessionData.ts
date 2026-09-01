// ==========================================================================
// SACRED BHAGAVAD GITA SIN CONFESSION, PENAL CODE & PRAYASHCHITTA SYSTEM
// श्रीमद्भगवद्गीता महापाप स्वीकारोक्ति, काल-दण्ड विधान एवं प्रायश्चित्त मण्डप
// ==========================================================================

export type SinCategoryKey = 
  | 'vachika'       // Speech / Words (वाचिक - असत्य, कटुवचन, परनिंदा)
  | 'kayika'        // Physical Body / Violence (कायिक - हिंसा, स्तेय, व्यभिचार)
  | 'manasika'      // Mental / Envy / Malice (मानसिक - ईर्ष्या, द्रोह चिन्तन)
  | 'vishwasghata'  // Betrayal / Treachery (विश्वासघात, मित्रद्रोह)
  | 'lobha_shoshan' // Greed / Exploitation / Bribery (लोभ, शोषण, अन्यायोपार्जन)
  | 'ahankara_mada' // Arrogance / Oppressing Weak (अहंकार, दर्प, दुर्बल-दमन)
  | 'guru_pitru'    // Defying Elders / Parents / Mentor (मातृ-पितृ-गुरु तिरस्कार)
  | 'svadharma'     // Abandoning Duty / Moral Cowardice (स्वधर्म त्याग, प्रमाद)
  | 'kama_vyabhichar'; // Lust / Deception in Relationships (कामोन्माद, छल);

export interface GitaSinDefinition {
  id: string;
  category: SinCategoryKey;
  sanskritName: string;
  devanagariTitle: string;
  englishTitle: string;
  hindiTitle: string;
  shortDescription: string;
  detailedDefinition: string;
  severityLevel: 'Mridu (मृदु - Moderate)' | 'Madhyama (मध्यम - Severe)' | 'Ghora (घोर - Gravest/Maha-Papa)';
  karmicTollPoints: number; // e.g. -60 to -350
  
  // Scriptural Bhagavad Gita Reference
  gitaChapter: number;
  gitaVerse: string;
  gitaShlokaSanskrit: string;
  gitaShlokaTransliteration: string;
  gitaShlokaHindi: string;
  gitaShlokaEnglish: string;
  
  // Cosmic Punishment (दण्ड / फल)
  punishmentInThisLife: {
    psychological: string;
    materialDestiny: string;
    planetaryAffliction: string;
  };
  punishmentInHereafter: {
    afterlifeDestiny: string;
    rebirthTendency: string;
  };
  
  // Prescribed Prayashchitta (प्रायश्चित्त / शुद्धि)
  prayashchitta: {
    sankalpaDurationDays: number;
    mantraJapa: {
      mantraSanskrit: string;
      mantraEnglish: string;
      dailyMalas: number;
      frequencyHz: number;
    };
    directRestitution: string; // Action towards victims
    danaSeva: string; // Specific charity/service
    tapasUpavasa: string; // Fasting / bodily discipline
    gitaAdhyayaStudy: string; // Chapter to chant daily
  };
}

export interface ConfessionRecord {
  id: string;
  personName: string;
  date: string;
  category: SinCategoryKey;
  sinTitle: string;
  confessionText: string;
  remorseLevel: 'mild' | 'deep' | 'agonized';
  harmScope: 'individual' | 'family' | 'community' | 'self';
  evaluatedSin: GitaSinDefinition;
  atonementVowStatus: 'unstarted' | 'active' | 'completed';
  vowProgressDays: number;
  totalVowDays: number;
  isBurnedInAgni: boolean;
  burnedTimestamp?: string;
}

// --------------------------------------------------------------------------
// CATEGORY DEFINITIONS
// --------------------------------------------------------------------------

export const SIN_CATEGORIES: Record<SinCategoryKey, {
  name: string;
  hindi: string;
  iconName: string;
  color: string;
  description: string;
}> = {
  vachika: {
    name: 'Vachika Papa (Sins of Speech)',
    hindi: 'वाचिक पाप (वाणी जनित दोष)',
    iconName: 'MessageSquareX',
    color: '#f59e0b',
    description: 'Lies, false witness, slandering, character assassination, harsh abusive speech, and broken sacred promises.'
  },
  kayika: {
    name: 'Kayika Papa (Physical & Bodily Sins)',
    hindi: 'कायिक पाप (शरीर जनित दुष्कर्म)',
    iconName: 'ShieldAlert',
    color: '#ef4444',
    description: 'Violence, cruelty to innocent animals or humans, theft, physical abuse, and desecration of sacred life.'
  },
  manasika: {
    name: 'Manasika Papa (Mental & Thought Sins)',
    hindi: 'मानसिक पाप (मनोविकार व ईर्ष्या)',
    iconName: 'Brain',
    color: '#8b5cf6',
    description: 'Harboring malicious envy, wishing ruin/death on others, plotting destruction, and coveting what belongs to another.'
  },
  vishwasghata: {
    name: 'Vishwasghata (Betrayal & Treachery)',
    hindi: 'विश्वासघात व मित्रद्रोह',
    iconName: 'HeartCrack',
    color: '#dc2626',
    description: 'Betraying those who took refuge in you, breaking sworn oaths, backstabbing loyal allies, and violating sacred trust.'
  },
  lobha_shoshan: {
    name: 'Lobha & Shoshan (Greed & Exploitation)',
    hindi: 'लोभ, शोषण व अन्यायोपार्जन',
    iconName: 'Coins',
    color: '#d97706',
    description: 'Taking bribes, extortion, underpaying laborers, usurping property of orphans/widows, and fraudulent dealings.'
  },
  ahankara_mada: {
    name: 'Ahankara & Darpa (Arrogance & Tyranny)',
    hindi: 'अहंकार, दर्प व दुर्बल-दमन',
    iconName: 'Crown',
    color: '#e11d48',
    description: 'Humiliating the poor, insulting pious beings, intoxicated power abuse, and vanity in subjugating the helpless.'
  },
  guru_pitru: {
    name: 'Guru & Pitru Droha (Defying Elders/Parents)',
    hindi: 'मातृ-पितृ व गुरु तिरस्कार',
    iconName: 'Users',
    color: '#b91c1c',
    description: 'Abandoning aging parents in despair, insulting righteous mentors/gurus, ingratitude towards life-givers.'
  },
  svadharma: {
    name: 'Svadharma Tyaga (Dereliction of Sacred Duty)',
    hindi: 'स्वधर्म त्याग व कायरता',
    iconName: 'Flame',
    color: '#ea580c',
    description: 'Fleeing legitimate responsibilities out of fear or laziness, moral cowardice, and negligence of protective duty.'
  },
  kama_vyabhichar: {
    name: 'Kama & Vyabhichara (Exploitative Lust & Deceit)',
    hindi: 'कामोन्माद, छल व व्यभिचार',
    iconName: 'HeartOff',
    color: '#c026d3',
    description: 'Manipulating hearts for physical gratification, infidelity, destroying family sanctity, and predatory sensual obsession.'
  }
};

// --------------------------------------------------------------------------
// THE 14 GREAT SINS & GITA PENAL CODE DIRECTORY
// --------------------------------------------------------------------------

export const GITA_SIN_REGISTRY: GitaSinDefinition[] = [
  {
    id: 'sin-vishwasghata',
    category: 'vishwasghata',
    sanskritName: 'विश्वासघात एवं मित्रद्रोह (Vishwasghata)',
    devanagariTitle: 'विश्वासघात व शरणार्थी त्याग',
    englishTitle: 'Treachery & Betrayal of Sacred Trust',
    hindiTitle: 'विश्वासघात, मित्रद्रोह एवं भरोसा तोड़ना',
    shortDescription: 'Betraying someone who trusted you blindly or harming a person who sought your protection.',
    detailedDefinition: 'The act of deliberately exploiting vulnerability, leaking secrets entrusted in love, or engineering the downfall of someone who considered you their shield. In Vedic jurisprudence, this is deemed among the most agonizing karmic knots.',
    severityLevel: 'Ghora (घोर - Gravest/Maha-Papa)',
    karmicTollPoints: -250,
    gitaChapter: 16,
    gitaVerse: '16.7 - 16.9',
    gitaShlokaSanskrit: 'प्रवृत्तिं च निवृत्तिं च जना न विदुरासुराः।\nन शौचं नापि चाचारो न सत्यं तेषु विद्यते॥\nअसत्यमप्रतिष्ठं ते जगदाहुरनीश्वरम्।\nअपरस्परसम्भूतं किमन्यत्कामहैतुकम्॥',
    gitaShlokaTransliteration: 'pravṛttiṁ ca nivṛttiṁ ca janā na vidur āsurāḥ\nna śaucaṁ nāpi cācāro na satyaṁ teṣu vidyate\nasatyam apratiṣṭhaṁ te jagad āhur anīśvaram\naparaspara-sambhūtaṁ kim anyat kāma-haitukam',
    gitaShlokaHindi: 'आसुरी स्वभाव वाले मनुष्य कर्तव्य और अकर्तव्य को नहीं जानते। उनमें न तो आन्तरिक-बाह्य पवित्रता होती है, न श्रेष्ठ आचरण और न ही सत्य होता है। वे जगत को सत्यहीन व विश्वासहीन मानते हैं।',
    gitaShlokaEnglish: 'Those possessing demonic nature know neither right action nor renunciation. Neither purity, nor noble conduct, nor truth is found in them. They view the world without foundation and devoid of moral truth.',
    punishmentInThisLife: {
      psychological: 'Perpetual paranoia, inability to trust any lover or companion, chronic subconscious terror of being stabbed in the back.',
      materialDestiny: 'Sudden collapse of personal enterprises at their zenith; abandoned by children or closest partners during vulnerable old age.',
      planetaryAffliction: 'Severe Rahu-Shani Dasha affliction causing sudden disgrace, social exile, and loss of honor.'
    },
    punishmentInHereafter: {
      afterlifeDestiny: 'Submergence in Asipatravana realm where the subtle body undergoes piercing remorse.',
      rebirthTendency: 'Rebirth as a dependent orphan who is constantly cheated and exploited until the karmic balance is squared.'
    },
    prayashchitta: {
      sankalpaDurationDays: 40,
      mantraJapa: {
        mantraSanskrit: 'ॐ नमो भगवते वासुदेवाय नमः (अथवा महामृत्युंजय मन्त्र)',
        mantraEnglish: 'Om Namo Bhagavate Vasudevaya (or Maha Mrityunjaya Mantra)',
        dailyMalas: 5,
        frequencyHz: 528
      },
      directRestitution: 'If the victim is alive, seek heartfelt forgiveness with folded hands. If direct contact causes them trauma, perform secret financial/protective help to their lineage without seeking credit.',
      danaSeva: 'Feed 11 blind or destitute persons on every Saturday or Amavasya; donate brass utensils or warm blankets to orphanages.',
      tapasUpavasa: 'Observe complete saltless fast (Nirlavana Vrata) on every Ekadashi for 1 year.',
      gitaAdhyayaStudy: 'Daily recitation of Srimad Bhagavad Gita Chapter 12 (Bhakti Yoga) and Chapter 16 (Daivasura Sampad Vibhaga Yoga).'
    }
  },
  {
    id: 'sin-paraninda-asatya',
    category: 'vachika',
    sanskritName: 'परनिंदा, असत्यभाषण एवं मिथ्या साक्ष्य (Paraninda & Asatya)',
    devanagariTitle: 'परनिंदा, चरित्र हनन एवं असत्य भाषण',
    englishTitle: 'Malicious Slander, Defamation & False Witness',
    hindiTitle: 'झूठ बोलकर किसी का जीवन/सम्मान नष्ट करना',
    shortDescription: 'Spreading venomous rumors, defaming innocent people, lying in testimony, or ruining reputations.',
    detailedDefinition: 'Using the gift of speech (Saraswati) as a poisoned dagger to destroy an innocent person’s dignity, career, or family harmony. Speech is sacred; weaponizing it incurs heavy Vachika Papa.',
    severityLevel: 'Madhyama (मध्यम - Severe)',
    karmicTollPoints: -140,
    gitaChapter: 17,
    gitaVerse: '17.15',
    gitaShlokaSanskrit: 'अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत्।\nस्वाध्यायाभ्यसनं चैव वाङ्मयं तप उच्यते॥',
    gitaShlokaTransliteration: 'anudvega-karaṁ vākyaṁ satyaṁ priya-hitaṁ ca yat\nsvādhyāyābhyasanaṁ caiva vāṅmayaṁ tapa ucyate',
    gitaShlokaHindi: 'जो वाणी किसी को उद्वेग न पहुंचाने वाली, सत्य, प्रिय और हितकारी हो तथा जो शास्त्रों के स्वाध्याय का अभ्यास कराती हो—वही वाणी का तप कही जाती है। इसका उल्लंघन महादोष है।',
    gitaShlokaEnglish: 'Words that cause no distress, that are truthful, pleasing, and beneficial, and the regular recitation of sacred scriptures—this alone is declared as the austerity of speech.',
    punishmentInThisLife: {
      psychological: 'Loss of mental eloquence, throat and thyroid ailments, chronic fear of exposure, loss of credibility in society.',
      materialDestiny: 'False allegations and legal defamation hurled upon oneself or one’s children; having one’s honest defense dismissed as lies.',
      planetaryAffliction: 'Afflicted Mercury (Budha) in 2nd/8th house causing speech stutter, respiratory distress, and business fraud losses.'
    },
    punishmentInHereafter: {
      afterlifeDestiny: 'Suspension in Raurava hell where the fiery tongue of remorse burns until the karmic toxicity is purged.',
      rebirthTendency: 'Born with speech impairment, or in an environment where no one believes one’s genuine cries for help.'
    },
    prayashchitta: {
      sankalpaDurationDays: 21,
      mantraJapa: {
        mantraSanskrit: 'ॐ ऐं वाग्देव्यै सरस्वत्यै नमः। सत्यं वद धर्मं चर।',
        mantraEnglish: 'Om Aim Vagdevyai Saraswatyai Namah',
        dailyMalas: 3,
        frequencyHz: 432
      },
      directRestitution: 'Publicly retract the slander or write an unequivocal letter restoring the victim’s honor in the eyes of everyone you misled.',
      danaSeva: 'Donate books, pens, and school fees to 5 underprivileged students; sponsor speech therapy or hearing aids for a child.',
      tapasUpavasa: 'Observe complete Mauna Vrata (absolute silence) for 4 hours every morning for 21 consecutive days.',
      gitaAdhyayaStudy: 'Chant Srimad Bhagavad Gita Chapter 17 (Shraddhatraya Vibhaga Yoga) with focus on verses 14-19.'
    }
  },
  {
    id: 'sin-shoshan-lobha',
    category: 'lobha_shoshan',
    sanskritName: 'अन्यायोपार्जन, उत्कोच एवं श्रमिक शोषण (Lobha & Shoshan)',
    devanagariTitle: 'श्रमिक शोषण, रिश्वतखोरी व कपट धन',
    englishTitle: 'Extortion, Wage Theft, Bribery & Predatory Greed',
    hindiTitle: 'मजदूरों का हक मारना, रिश्वत लेना व छल से धन हड़पना',
    shortDescription: 'Withholding rightful wages of the poor, taking bribes, cheating in business, or amassing unearned wealth.',
    detailedDefinition: 'Extracting wealth through coercion, exploiting laborers under duress, evading honest dues, or accepting bribes that deny justice to the deserving. The tears of the exploited burn away familial prosperity.',
    severityLevel: 'Ghora (घोर - Gravest/Maha-Papa)',
    karmicTollPoints: -210,
    gitaChapter: 16,
    gitaVerse: '16.21',
    gitaShlokaSanskrit: 'त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः।\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत्॥',
    gitaShlokaTransliteration: 'tri-vidhaṁ narakasyedaṁ dvāraṁ nāśanam ātmanaḥ\nkāmaḥ krodhas tathā lobhas tasmād etat trayaṁ tyajet',
    gitaShlokaHindi: 'काम, क्रोध और लोभ—ये आत्मा का नाश करने वाले नरक के तीन द्वार हैं। इसलिए इन तीनों का सर्वथा परित्याग कर देना चाहिए।',
    gitaShlokaEnglish: 'Lust, anger, and greed—these are the three gates leading to hell and the ruin of the soul. Therefore, an intelligent person must completely abandon all three.',
    punishmentInThisLife: {
      psychological: 'Constant insatiable greed, inability to enjoy wealth, anxiety over theft and tax raids, toxic offspring who squander money in vice.',
      materialDestiny: 'Sudden catastrophic financial ruin through medical disasters, litigations, or fire accidents that consume ill-gotten wealth.',
      planetaryAffliction: 'Retrograde Saturn & afflicted Jupiter (Brihaspati) destroying family lineage (Kula-Nasham).'
    },
    punishmentInHereafter: {
      afterlifeDestiny: 'Taptakumbha realm where the burning thirst for unpossessed gold torments the subtle mind.',
      rebirthTendency: 'Born into abject destitution where one must break stones and beg for daily sustenance with broken limbs.'
    },
    prayashchitta: {
      sankalpaDurationDays: 30,
      mantraJapa: {
        mantraSanskrit: 'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः। धर्मेणैव धनं लभे।',
        mantraEnglish: 'Om Shreem Hreem Kleem Mahalakshmyai Namah',
        dailyMalas: 5,
        frequencyHz: 639
      },
      directRestitution: 'Calculate the exact amount stolen or underpaid with 18% compound interest and return it secretly or openly to the rightful laborer/victim.',
      danaSeva: 'Organize Anna-Dāna (mass food distribution) for 108 laborers/slum residents; build a water cooler or public shelter.',
      tapasUpavasa: 'Sleep on a simple straw/cotton mat on the floor for 30 days, abstaining from all luxury food, alcohol, and expensive clothing.',
      gitaAdhyayaStudy: 'Chant Srimad Bhagavad Gita Chapter 3 (Karma Yoga) and meditate deeply on verse 3.13.'
    }
  },
  {
    id: 'sin-himsa-krurata',
    category: 'kayika',
    sanskritName: 'प्राणि-हिंसा, निर्दयता एवं क्रूरता (Himsa & Krurata)',
    devanagariTitle: 'निर्दोष जीवों पर क्रूरता एवं हिंसा',
    englishTitle: 'Cruelty to Animals, Violence & Physical Harm',
    hindiTitle: 'निर्दोष जीवों को सताना, पशु हिंसा एवं शारीरिक प्रहार',
    shortDescription: 'Inflicting physical pain on helpless animals, beating the defenseless, or committing acts of bodily harm.',
    detailedDefinition: 'Inflicting intentional bodily torment, slaughtering or torturing animals for sport or vanity, abusing children or domestic dependents. Sri Krishna proclaims all living entities as His divine spark (Mamaivamsho Jivaloke).',
    severityLevel: 'Ghora (घोर - Gravest/Maha-Papa)',
    karmicTollPoints: -280,
    gitaChapter: 16,
    gitaVerse: '16.18 - 16.19',
    gitaShlokaSanskrit: 'अहङ्कारं बलं दर्पं कामं क्रोधं च संश्रिताः।\nमामात्मपरदेहेषु प्रद्विषन्तोऽभ्यसूयकाः॥\nतानहं द्विषतः क्रूरान्संसारेषु नराधमान्।\nक्षिपाम्यजस्रमशुभानासुरीष्वेव योनिषु॥',
    gitaShlokaTransliteration: 'ahaṅkāraṁ balaṁ darpaṁ kāmaṁ krodhaṁ ca saṁśritāḥ\nmām ātma-para-deheṣu pradviṣanto ’bhyasūyakāḥ\ntān ahaṁ dviṣataḥ krūrān saṁsāreṣu narādhamān\nkṣipāmy ajasram aśubhān āsurīṣv eva yoniṣu',
    gitaShlokaHindi: 'अहंकार, बल, घमण्ड, वासना और क्रोध का आश्रय लेने वाले लोग अपने और दूसरों के शरीरों में स्थित मुझ परमात्मा से द्वेष करते हैं। ऐसे क्रूर व नराधमों को मैं बार-बार आसुरी योनियों में ही गिराता हूँ।',
    gitaShlokaEnglish: 'Possessed of egotism, brutal strength, arrogance, lust, and wrath, these malicious persons blaspheme Me who dwells within their own bodies and the bodies of others. Those cruel and hateful sinners I cast perpetually into demonic wombs.',
    punishmentInThisLife: {
      psychological: 'Terrifying nightmares of being butchered, sudden panic attacks, blood disorders, uncontrollable trembling of limbs.',
      materialDestiny: 'Grievous bodily injury, accidental fractures, surgical mutilations, or assault by violent adversaries.',
      planetaryAffliction: 'Malefic Mars (Mangala) in 8th house causing blood contamination, surgery complications, and accidental trauma.'
    },
    punishmentInHereafter: {
      afterlifeDestiny: 'Kumbhipaka and Andhakupa hells where the screams of all tormented creatures echo upon the soul.',
      rebirthTendency: 'Born as a chained beast of burden subjected to daily beatings, or as an animal in a slaughterhouse.'
    },
    prayashchitta: {
      sankalpaDurationDays: 45,
      mantraJapa: {
        mantraSanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्य pushyeya मामृतात्॥',
        mantraEnglish: 'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam',
        dailyMalas: 5,
        frequencyHz: 741
      },
      directRestitution: 'Adopt, rescue, feed, and pay medical expenses for wounded stray animals or injured living beings.',
      danaSeva: 'Provide fodder and clean water at a Cow Shelter (Gaushala) for 45 consecutive days; donate to bird sanctuaries.',
      tapasUpavasa: 'Strict lifelong vegetarianism/veganism with periodic liquid-only fasts on Pradosha and Shivaratri days.',
      gitaAdhyayaStudy: 'Chant Srimad Bhagavad Gita Chapter 15 (Purushottama Yoga) and meditate on verse 15.7.'
    }
  },
  {
    id: 'sin-matru-pitru-guru',
    category: 'guru_pitru',
    sanskritName: 'मातृ-पितृ-गुरु तिरस्कार एवं अकृतज्ञता (Guru-Pitru Droha)',
    devanagariTitle: 'माता-पिता व गुरु का अपमान व तिरस्कार',
    englishTitle: 'Abandonment & Disrespect of Parents and Mentors',
    hindiTitle: 'वृद्ध माता-पिता को बेसहारा छोड़ना एवं गुरु का अपमान',
    shortDescription: 'Abandoning aged parents in their hour of need, shouting at mentors, or betraying those who nurtured you.',
    detailedDefinition: 'Parents and righteous Gurus are the living deities on earth (Matru Devo Bhava, Pitru Devo Bhava). Discarding them once self-sufficient attracts the dreaded Pitru-Dosha and Guru-Shapa.',
    severityLevel: 'Ghora (घोर - Gravest/Maha-Papa)',
    karmicTollPoints: -260,
    gitaChapter: 9,
    gitaVerse: '9.17',
    gitaShlokaSanskrit: 'पिताहमस्य जगतो माता धाता पितामहः।\nवेद्यं पवित्रमोंकार ऋक्साम यजुरेव च॥',
    gitaShlokaTransliteration: 'pitāham asya jagato mātā dhātā pitāmahaḥ\nvedyaṁ pavitram oṁkāra ṛk sāma yajur eva ca',
    gitaShlokaHindi: 'मैं ही इस सम्पूर्ण जगत का पिता, माता, धारण करने वाला और पितामह हूँ। मैं ही जानने योग्य, पवित्र ओंकार तथा ऋग्वेद, सामवेद और यजुर्वेद हूँ। अत: माता-पिता का अपमान साक्षात् मेरा अपमान है।',
    gitaShlokaEnglish: 'I am the Father of this universe, the Mother, the Sustainer, and the Grandfather. I am the object of knowledge, the purifier, the syllable OM, and the sacred Vedas. Insulting parents is insulting the Supreme.',
    punishmentInThisLife: {
      psychological: 'Agonizing loneliness, incurable depression in old age, rebellion and public humiliation by one’s own children.',
      materialDestiny: 'Complete blockage of progeny happiness; constant domestic discord; chronic poverty despite hard labor.',
      planetaryAffliction: 'Severe Pitru Dosha in Kundli with afflicted Sun (Surya - Father) and Moon (Chandra - Mother).'
    },
    punishmentInHereafter: {
      afterlifeDestiny: 'Pitru-Loka rejection where the ancestral spirits refuse oblations from the ungrateful descendant.',
      rebirthTendency: 'Born as a barren individual denied the warmth of family, dying unnoticed in institutional neglect.'
    },
    prayashchitta: {
      sankalpaDurationDays: 40,
      mantraJapa: {
        mantraSanskrit: 'ॐ पितृभ्यो नमः। ॐ श्री गुरवे नमः। क्षमस्व मे अपराधम्।',
        mantraEnglish: 'Om Pitribhyo Namah | Om Shri Gurave Namah',
        dailyMalas: 3,
        frequencyHz: 432
      },
      directRestitution: 'Touch the feet of parents/Gurus, bathe their feet with water, seek their tears of forgiveness, and dedicate monthly income to their medicine and comfort.',
      danaSeva: 'Perform Tarpana at holy ghats (Gaya, Haridwar, or Varanasi); donate clothes and wholesome food to 12 elderly persons at an old age home.',
      tapasUpavasa: 'Observe fast on every Amavasya and Ekadashi, eating only one satvik meal after sunset.',
      gitaAdhyayaStudy: 'Daily recitation of Srimad Bhagavad Gita Chapter 9 (Raja-Vidya Raja-Guhya Yoga).'
    }
  },
  {
    id: 'sin-ahankara-mada',
    category: 'ahankara_mada',
    sanskritName: 'अहंकार, दर्प एवं दुर्बल-दमन (Ahankara & Darp)',
    devanagariTitle: 'शक्ति के मद में निर्बलों का दमन व अपमान',
    englishTitle: 'Tyranny, Arrogance of Power & Mockery of the Weak',
    hindiTitle: 'सत्ता/धन के घमंड में गरीबों का उपहास व दमन करना',
    shortDescription: 'Using wealth, caste, or administrative power to crush the helpless, mocking the poor or disabled.',
    detailedDefinition: 'Intoxication of status where one views oneself as master of all and treats less privileged humans as dirt. The Bhagavad Gita identifies Ahankara as the primary illusion binding the soul to destruction.',
    severityLevel: 'Madhyama (मध्यम - Severe)',
    karmicTollPoints: -180,
    gitaChapter: 18,
    gitaVerse: '18.58',
    gitaShlokaSanskrit: 'मच्चित्तः सर्वदुर्गाणि मत्प्रसादात्तरिष्यसि।\nअथ चेत्त्वमहङ्कारान्न श्रोष्यसि विनङ्क्ष्यसि॥',
    gitaShlokaTransliteration: 'mac-cittaḥ sarva-durgāṇi mat-prasādāt tariṣyasi\natha cet tvam ahaṅkārān na śroṣyasi vinaṅkṣyasi',
    gitaShlokaHindi: 'मुझमें चित्त लगाने से तू मेरी कृपा से सभी संकटों को पार कर जाएगा। किन्तु यदि अहंकारवश तू मेरी बात नहीं सुनेगा, तो सर्वथा नष्ट हो जाएगा।',
    gitaShlokaEnglish: 'Fixing your mind upon Me, you shall overcome all obstacles by My grace. But if, through arrogance and ego, you do not listen, you will be utterly ruined.',
    punishmentInThisLife: {
      psychological: 'Sudden collapse of vanity, acute social alienation, panic attacks when power slips, chronic insomnia.',
      materialDestiny: 'Spectacular public disgrace, sudden bankruptcy, being forced to plead before those one previously humiliated.',
      planetaryAffliction: 'Afflicted Sun (Surya) afflicted by Rahu/Ketu, causing loss of position, demotion, and public scandal.'
    },
    punishmentInHereafter: {
      afterlifeDestiny: 'Vaitarani river crossing where the proud soul is stripped of all ornaments and drowned in mud of humiliation.',
      rebirthTendency: 'Born into servitude, subjected to daily humiliation and forced to clean the refuse of the proud.'
    },
    prayashchitta: {
      sankalpaDurationDays: 21,
      mantraJapa: {
        mantraSanskrit: 'ॐ नमो भगवते वासुदेवाय। नाऽहं कर्ता हरिः कर्ता।',
        mantraEnglish: 'Om Namo Bhagavate Vasudevaya | Na-aham Karta Harih Karta',
        dailyMalas: 3,
        frequencyHz: 528
      },
      directRestitution: 'Prostrate before the person you humiliated, ask for their pardon, and publicly acknowledge your mistake.',
      danaSeva: 'Personally clean the floors of a temple, community kitchen, or public hospital with your own hands for 21 days.',
      tapasUpavasa: 'Eat food only from a simple leaf plate sitting on the bare floor without chairs or cushions for 21 days.',
      gitaAdhyayaStudy: 'Chant Srimad Bhagavad Gita Chapter 18 (Moksha Sannyasa Yoga), meditating on verses 18.51-58.'
    }
  },
  {
    id: 'sin-svadharma-tyaga',
    category: 'svadharma',
    sanskritName: 'स्वधर्म त्याग, कायरता एवं प्रमाद (Svadharma Tyaga)',
    devanagariTitle: 'कर्तव्य त्याग, पलायनवाद एवं कायरता',
    englishTitle: 'Dereliction of Duty, Moral Cowardice & Escapism',
    hindiTitle: 'मुसीबत में कर्तव्य से भागना, परिवार को असहाय छोड़ना',
    shortDescription: 'Abandoning righteous responsibilities out of fear, comfort, or moral laziness when people depended on you.',
    detailedDefinition: 'Leaving the battlefield of life, refusing to protect family or dependents when duty demands sacrifice, preferring indolent pleasure over righteous action (Klaibyam).',
    severityLevel: 'Madhyama (मध्यम - Severe)',
    karmicTollPoints: -130,
    gitaChapter: 2,
    gitaVerse: '2.33 - 2.34',
    gitaShlokaSanskrit: 'अथ चेत्त्वमिमं धर्म्यं संग्रामं न करिष्यसि।\nततः स्वधर्मं कीर्तिं च हित्वा पापमवाप्स्यसि॥\nअकीर्तिं चापि भूतानि कथयिष्यन्ति तेऽव्ययाम्।\nसम्भावितस्य चाकीर्तिर्मरणादतिरिच्यते॥',
    gitaShlokaTransliteration: 'atha cet tvam imaṁ dharmyaṁ saṅgrāmaṁ na kariṣyasi\ntataḥ sva-dharmaṁ kīrtiṁ ca hitvā pāpam avāpsyasi\nakīrtiṁ cāpi bhūtāni kathayiṣyanti te ’vyayām\nsambhāvitasya cākīrtir maraṇād atiricyate',
    gitaShlokaHindi: 'यदि तू इस धर्मयुक्त युद्ध को नहीं करेगा, तो अपने स्वधर्म और कीर्ति को खोकर पाप को प्राप्त होगा। लोग सदा तेरी अपकीर्ति का बखान करेंगे और सम्मानित व्यक्ति के लिए अपकीर्ति मृत्यु से भी बढ़कर कष्टदायी होती है।',
    gitaShlokaEnglish: 'If you refuse to wage this righteous war of duty, you will incur sin by abandoning your sacred duty and honor. People will speak of your eternal infamy, and for a person of honor, dishonor is worse than death.',
    punishmentInThisLife: {
      psychological: 'Lifelong sense of unworthiness, chronic indecisiveness, haunting guilt of what might have been, self-loathing.',
      materialDestiny: 'Loss of leadership roles, treated as a coward by peers, losing opportunities to lesser candidates.',
      planetaryAffliction: 'Afflicted Mars and weak 1st/10th house creating lack of courage, vitality, and willpower.'
    },
    punishmentInHereafter: {
      afterlifeDestiny: 'Limbo of the unresolved, where unfulfilled duties weigh down the subtle body like heavy lead.',
      rebirthTendency: 'Born into situations of inescapable crisis where one is forced to fight without weapons or allies.'
    },
    prayashchitta: {
      sankalpaDurationDays: 21,
      mantraJapa: {
        mantraSanskrit: 'ॐ क्लीं कृष्णाय गोविंदाय गोपीजनवल्लभाय नमः। उत्तिष्ठ भारत!',
        mantraEnglish: 'Om Kleem Krishnaya Govindaya Gopijanavallabhaya Namah',
        dailyMalas: 3,
        frequencyHz: 852
      },
      directRestitution: 'Return to the abandoned post, resume financial and emotional support for the dependents with double vigor.',
      danaSeva: 'Sponsor the education or defense costs of children of soldiers, fire fighters, or martyrs.',
      tapasUpavasa: 'Engage in rigorous physical exercise, martial training, or Surya Namaskar (54 rounds daily) before sunrise.',
      gitaAdhyayaStudy: 'Daily chanting and memorization of Srimad Bhagavad Gita Chapter 2 (Sankhya Yoga), focusing on verses 2.1-38.'
    }
  },
  {
    id: 'sin-kama-chal',
    category: 'kama_vyabhichar',
    sanskritName: 'कामोन्माद, भावनात्मक छल एवं व्यभिचार (Kama & Vyabhichara)',
    devanagariTitle: 'भावनात्मक छल, कामवासना एवं विवाह मर्यादा भंग',
    englishTitle: 'Sensual Deception, Infidelity & Destroying Hearts',
    hindiTitle: 'प्रेम का नाटक कर देह/धन शोषण, पति/पत्नी से विश्वासघात',
    shortDescription: 'Manipulating someone emotionally for physical lust, infidelity in marriage, or breaking a sacred domestic union.',
    detailedDefinition: 'Using romantic falsehoods to consume another soul’s innocence and youth, discarding them when bored, or desecrating the sacred fire vows (Saptapadi) of marriage for transient sensual lust.',
    severityLevel: 'Ghora (घोर - Gravest/Maha-Papa)',
    karmicTollPoints: -220,
    gitaChapter: 3,
    gitaVerse: '3.37 - 3.39',
    gitaShlokaSanskrit: 'काम एष क्रोध एष रजोगुणसमुद्भवः।\nमहाशनो महापाप्मा विद्ध्येनमिह वैरिणम्॥\nआवृतं ज्ञानमेतेन ज्ञानिनो नित्यवैरिणा।\nकामरूपेण कौन्तेय दुष्पूरेणानलेन च॥',
    gitaShlokaTransliteration: 'kāma eṣa krodha eṣa rajo-guṇa-samudbhavaḥ\nmahāśano mahā-pāpmā viddhy enam iha vairiṇam\nāvṛtaṁ jñānam etena jñānino nitya-vairiṇā\nkāma-rūpeṇa kaunteya duṣpūreṇānalena ca',
    gitaShlokaHindi: 'यह काम ही है, यह क्रोध ही है, जो रजोगुण से उत्पन्न होता है। यह महाभोगी और महापापी है। इसे ही तू इस संसार में सबसे बड़ा शत्रु जान। यह ज्ञानी के ज्ञान को अग्नि के समान कभी न तृप्त होने वाली वासना से ढँक देता है।',
    gitaShlokaEnglish: 'It is lust alone, born of the mode of passion, which later transforms into anger. It is insatiable and exceedingly sinful; know this to be the greatest enemy in this world. Knowledge is covered by this eternal enemy of the wise in the form of insatiable fire.',
    punishmentInThisLife: {
      psychological: 'Chronic emotional numbness, inability to experience genuine love, obsessive sexual thoughts that ruin mental peace, venereal/reproductive agony.',
      materialDestiny: 'Divorce, bitter custody battles, public scandal, being deceived and abandoned by the very person one left their family for.',
      planetaryAffliction: 'Afflicted Venus (Shukra) in 6th/8th house causing reproductive diseases, loss of beauty, and domestic hell.'
    },
    punishmentInHereafter: {
      afterlifeDestiny: 'Taptaloha-Shila hell where the subtle body is forced to embrace burning red-hot iron statues of lust.',
      rebirthTendency: 'Born into loveless arrangements where one is treated merely as a commodity and discarded repeatedly.'
    },
    prayashchitta: {
      sankalpaDurationDays: 40,
      mantraJapa: {
        mantraSanskrit: 'ॐ ह्रीं श्रीं क्लीं कृष्णाय नमः। कामात् क्रोधोऽभिजायते, तस्मात् कामं विमुञ्चामि।',
        mantraEnglish: 'Om Hreem Shreem Kleem Krishnaya Namah',
        dailyMalas: 5,
        frequencyHz: 639
      },
      directRestitution: 'Confess with complete humility to the wronged spouse/partner, accept whatever fair restitution they demand, and sever all toxic illicit ties permanently.',
      danaSeva: 'Sponsor the wedding expenses of a destitute orphan girl (Kanyadāna Sahayata); donate to women’s rescue shelters.',
      tapasUpavasa: 'Strict Brahmacharya (sensory and celibate restraint in thought, word, and deed) for 40 consecutive days; cold water bath before sunrise.',
      gitaAdhyayaStudy: 'Recite Srimad Bhagavad Gita Chapter 3 (Karma Yoga) and Chapter 6 (Dhyana Yoga) daily.'
    }
  },
  {
    id: 'sin-manasika-dvesha',
    category: 'manasika',
    sanskritName: 'पर-उत्कर्ष असहिष्णुता, ईर्ष्या एवं द्वेष (Asuya & Dvesha)',
    devanagariTitle: 'ईर्ष्या, द्वेष एवं दूसरे के सर्वनाश की कामना',
    englishTitle: 'Chronic Malice, Poisonous Envy & Wishing Harm',
    hindiTitle: 'दूसरों की उन्नति देखकर जलना, गुप्त रूप से बुरा सोचना',
    shortDescription: 'Habitual jealousy, celebrating the downfall of colleagues or siblings, holding grudges, and silently cursing others.',
    detailedDefinition: 'The toxic state of mind where another’s joy causes you pain, and another’s tragedy brings you secret joy. This mental toxicity corrodes the spiritual heart and attracts Tamasic entities.',
    severityLevel: 'Mridu (मृदु - Moderate)',
    karmicTollPoints: -90,
    gitaChapter: 12,
    gitaVerse: '12.13 - 12.14',
    gitaShlokaSanskrit: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥\nसन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः।\nमय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः॥',
    gitaShlokaTransliteration: 'adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī\nsantuṣṭaḥ satataṁ yogī yatātmā dṛḍha-niścayaḥ\nmayy arpita-mano-buddhir yo mad-bhaktaḥ sa me priyaḥ',
    gitaShlokaHindi: 'जो सब प्राणियों में द्वेषभाव से रहित, सबका मित्र और दयालु है, ममता और अहंकार से रहित, सुख-दुःख में सम और क्षमाशील है—वह निरंतर संतुष्ट योगी भक्त मुझे अत्यंत प्रिय है। द्वेष रखने वाला मुझसे दूर हो जाता है।',
    gitaShlokaEnglish: 'One who is not envious of any living being, who is a friendly and compassionate well-wisher to all, free from possessiveness and false ego, equal in sorrow and joy, forgiving and ever content—such a devotee is very dear to Me.',
    punishmentInThisLife: {
      psychological: 'Constant internal burning, acidity, premature aging, inability to celebrate one’s own achievements.',
      materialDestiny: 'Stagnation in career while seeing all juniors overtake you; bitter isolation with no real friends.',
      planetaryAffliction: 'Afflicted Moon (Chandra) conjunct Ketu causing melancholia, toxic thoughts, and insomnia.'
    },
    punishmentInHereafter: {
      afterlifeDestiny: 'Rebirth in foggy realms of cold shadows where souls cannot see the light of the sun.',
      rebirthTendency: 'Born with sickly constitution, always overshadowed and neglected by peers.'
    },
    prayashchitta: {
      sankalpaDurationDays: 21,
      mantraJapa: {
        mantraSanskrit: 'ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। ॐ शान्तिः शान्तिः शान्तिः।',
        mantraEnglish: 'Sarve Bhavantu Sukhinah Sarve Santu Niramayah',
        dailyMalas: 3,
        frequencyHz: 432
      },
      directRestitution: 'Secretly send blessings and gifts to the person you envied; speak three genuine compliments about their success to mutual friends.',
      danaSeva: 'Distribute sweets and fruits to hospital patients or children in orphanages every Sunday.',
      tapasUpavasa: 'Practice 15 minutes of Metta (loving-kindness meditation) towards rivals before sleeping.',
      gitaAdhyayaStudy: 'Chant Srimad Bhagavad Gita Chapter 12 (Bhakti Yoga) in its entirety.'
    }
  }
];

// --------------------------------------------------------------------------
// DYNAMIC SCRIPTURAL EVALUATION ENGINE FOR CUSTOM USER CONFESSIONS
// --------------------------------------------------------------------------

export function evaluateConfessionWithGita(
  category: SinCategoryKey,
  confessionText: string,
  remorseLevel: 'mild' | 'deep' | 'agonized',
  harmScope: 'individual' | 'family' | 'community' | 'self'
): GitaSinDefinition {
  const textLower = confessionText.toLowerCase();

  // Try matching directly in registry by keywords
  let matchedSin = GITA_SIN_REGISTRY.find(s => s.category === category);

  // If text contains extreme keywords, refine match
  if (textLower.includes('betray') || textLower.includes('cheat') || textLower.includes('trust') || textLower.includes('धोखा') || textLower.includes('विश्वासघात')) {
    matchedSin = GITA_SIN_REGISTRY.find(s => s.id === 'sin-vishwasghata') || matchedSin;
  } else if (textLower.includes('money') || textLower.includes('bribe') || textLower.includes('stole') || textLower.includes('wage') || textLower.includes('रिश्वत') || textLower.includes('धन')) {
    matchedSin = GITA_SIN_REGISTRY.find(s => s.id === 'sin-shoshan-lobha') || matchedSin;
  } else if (textLower.includes('parent') || textLower.includes('father') || textLower.includes('mother') || textLower.includes('guru') || textLower.includes('माता') || textLower.includes('पिता')) {
    matchedSin = GITA_SIN_REGISTRY.find(s => s.id === 'sin-matru-pitru-guru') || matchedSin;
  } else if (textLower.includes('animal') || textLower.includes('beat') || textLower.includes('violence') || textLower.includes('hurt') || textLower.includes('मारना') || textLower.includes('हिंसा')) {
    matchedSin = GITA_SIN_REGISTRY.find(s => s.id === 'sin-himsa-krurata') || matchedSin;
  } else if (textLower.includes('lie') || textLower.includes('rumor') || textLower.includes('slander') || textLower.includes('defame') || textLower.includes('झूठ') || textLower.includes('गाली')) {
    matchedSin = GITA_SIN_REGISTRY.find(s => s.id === 'sin-paraninda-asatya') || matchedSin;
  } else if (textLower.includes('affair') || textLower.includes('lust') || textLower.includes('cheat partner') || textLower.includes('काम') || textLower.includes('व्यभिचार')) {
    matchedSin = GITA_SIN_REGISTRY.find(s => s.id === 'sin-kama-chal') || matchedSin;
  }

  // Fallback if not matched
  if (!matchedSin) {
    matchedSin = GITA_SIN_REGISTRY[0];
  }

  // Adjust severity and penalty based on remorse & scope
  let tollMultiplier = 1.0;
  if (harmScope === 'family') tollMultiplier = 1.25;
  if (harmScope === 'community') tollMultiplier = 1.5;
  if (harmScope === 'self') tollMultiplier = 0.8;

  let remorseDiscount = 0;
  if (remorseLevel === 'agonized') remorseDiscount = 30; // Deep remorse softens initial chitta toxicity
  if (remorseLevel === 'deep') remorseDiscount = 15;

  const finalToll = Math.round(matchedSin.karmicTollPoints * tollMultiplier + remorseDiscount);

  return {
    ...matchedSin,
    karmicTollPoints: finalToll < -350 ? -350 : (finalToll > -40 ? -40 : finalToll)
  };
}

// Initial Sample Confessions for Demo / Reference
export const INITIAL_CONFESSIONS: ConfessionRecord[] = [
  {
    id: 'conf-1',
    personName: 'Devrat Sharma',
    date: '2026-08-20',
    category: 'vishwasghata',
    sinTitle: 'Leaked proprietary blueprint of my mentor’s startup to a competitor for money',
    confessionText: 'Five years ago, my mentor treated me like his son and gave me complete access to his architecture patents. Driven by greed and envy, I quietly sold copies to a rival firm. His startup collapsed, he suffered a stroke, and I bought my first luxury apartment with that dirty money. It haunts me every single night.',
    remorseLevel: 'agonized',
    harmScope: 'family',
    evaluatedSin: GITA_SIN_REGISTRY[0],
    atonementVowStatus: 'active',
    vowProgressDays: 14,
    totalVowDays: 40,
    isBurnedInAgni: true,
    burnedTimestamp: '2026-08-20T11:30:00Z'
  },
  {
    id: 'conf-2',
    personName: 'Ananya Verma',
    date: '2026-08-24',
    category: 'vachika',
    sinTitle: 'Spread malicious slander that ruined a colleague’s engagement',
    confessionText: 'Out of sheer professional rivalry, I planted a false anonymous rumor about a colleague’s moral conduct right before her marriage. Her wedding was called off, and she resigned in humiliation. I got the promotion, but my peace of mind has been completely destroyed since that day.',
    remorseLevel: 'deep',
    harmScope: 'individual',
    evaluatedSin: GITA_SIN_REGISTRY[1],
    atonementVowStatus: 'active',
    vowProgressDays: 6,
    totalVowDays: 21,
    isBurnedInAgni: false
  }
];
