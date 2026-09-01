export interface HubbleDiscoveryItem {
  id: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  chapter: 1 | 2 | 3 | 0; // 0 = Timeline/Intro, 1 = Neighborhood, 2 = Intriguing, 3 = Farthest
  distanceLightYears: string;
  lookbackTime: string;
  keyStats: { label: string; value: string }[];
  summaryHi: string;
  summaryEn: string;
  deepExplanationHi: string;
  deepExplanationEn: string;
  keyTakeaway: string;
  quote?: { text: string; author: string; affiliation: string };
  scientificTags: string[];
  cosmicCoordinates?: string;
  relatedMissions?: string[];
  visualTheme: 'spiral' | 'collision' | 'lens' | 'deep-red' | 'quasar' | 'dwarf' | 'infrared' | 'telescope';
}

export interface TimelineEvent {
  year: string;
  titleHi: string;
  titleEn: string;
  descriptionHi: string;
  descriptionEn: string;
  scientistOrMission: string;
  significance: string;
}

export const HUBBLE_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1610',
    titleHi: 'गैलीलियो द्वारा मंदाकिनी (Milky Way) के तारों का दर्शन',
    titleEn: 'Galileo Resolves the Milky Way into Stars',
    descriptionHi: 'गैलीलियो गैलीली ने नवनिर्मित दूरबीन का उपयोग कर आकाश में चमकने वाली दुधिया पट्टी (Milky Way) को देखा और पाया कि यह अनगिनत दूरस्थ तारों का एक विशाल समूह है।',
    descriptionEn: 'Galileo Galilei uses the newly invented telescope to resolve the band of light running across the night sky into myriad distant stars.',
    scientistOrMission: 'Galileo Galilei',
    significance: 'First observational proof that the Milky Way consists of countless individual stars.'
  },
  {
    year: '1750',
    titleHi: 'थॉमस राइट का "बाहरी ब्रह्मांडीय द्वीप" सिद्धांत',
    titleEn: 'Thomas Wright Speculates on External Galaxies',
    descriptionHi: 'अंग्रेज खगोलशास्त्री थॉमस राइट ने अनुमान लगाया कि रात के आकाश में दिखने वाले धुंधले बादल (नेबुला) हमारी आकाशगंगा से बाहर स्थित स्वतंत्र आकाशगंगाएं (Island Universes) हैं।',
    descriptionEn: 'Thomas Wright speculates that fuzzy sky patches called nebulae are external galaxies like the Milky Way, located far beyond our own.',
    scientistOrMission: 'Thomas Wright',
    significance: 'Conceptual birth of external galaxies beyond our own.'
  },
  {
    year: '1771',
    titleHi: 'मेसियर कैटलॉग का प्रकाशन (Messier Catalog)',
    titleEn: 'Charles Messier Publishes Non-Stellar Catalog',
    descriptionHi: 'फ्रांसीसी धूमकेतु खोजी चार्ल्स मेसियर ने गैर-तारकीय पिंडों की सूची बनाई, जिसमें तीन दर्जन से अधिक आकाशगंगाएं दर्ज थीं, हालांकि तब उनकी असीम दूरी अज्ञात थी।',
    descriptionEn: 'Charles Messier publishes his catalog of non-stellar objects, including over three dozen galaxies.',
    scientistOrMission: 'Charles Messier',
    significance: 'First systematic mapping of deep sky objects (M31, M51, M87, etc.).'
  },
  {
    year: '1845',
    titleHi: 'लॉर्ड रॉस द्वारा चक्राकार नेबुला (M51 Whirlpool) का अन्वेषण',
    titleEn: 'Lord Rosse Resolves Spiral Nebulae (M51)',
    descriptionHi: 'आयरलैंड के तीसरे अर्ल ऑफ रॉस ने उस समय के सबसे बड़े टेलीस्कोप (Leviathan of Parsonstown) से M51 भंवर आकाशगंगा की सर्पिल (Spiral) भुजाओं को पहली बार देखा।',
    descriptionEn: 'William Parsons resolves spiral structure in nebulae such as M51 (Whirlpool Galaxy) using the world’s largest telescope of the era.',
    scientistOrMission: 'William Parsons (Lord Rosse)',
    significance: 'Discovery of spiral structure in galactic objects.'
  },
  {
    year: '1920',
    titleHi: 'द ग्रेट डिबेट (The Great Debate): ब्रह्मांड का विस्तार',
    titleEn: 'The Great Debate: Shapley vs. Curtis',
    descriptionHi: 'वाशिंगटन में हार्लो शेपली और हेबर कर्टिस के बीच ऐतिहासिक बहस हुई कि क्या सर्पिल नेबुला हमारी आकाशगंगा के भीतर हैं या इसके बाहर स्वतंत्र ब्रह्मांड हैं।',
    descriptionEn: 'Harlow Shapley and Heber Curtis argue publicly whether spiral nebulae are inside the Milky Way or separate island universes.',
    scientistOrMission: 'Harlow Shapley & Heber Curtis',
    significance: 'Framed the fundamental question of modern observational cosmology.'
  },
  {
    year: '1924',
    titleHi: 'एडविन हबल द्वारा एंड्रोमेडा की दूरी व ब्रह्मांड विस्तार का प्रमाण',
    titleEn: 'Edwin Hubble Proves M31 is an External Galaxy',
    descriptionHi: 'एडविन हबल ने माउंट विल्सन वेधशाला से सेफिड चर तारों द्वारा साबित किया कि एंड्रोमेडा हमारी आकाशगंगा से बाहर है। उन्होंने ब्रह्मांड के निरंतर विस्तार और आकाशगंगाओं के वर्गीकरण का नियम दिया।',
    descriptionEn: 'Edwin Hubble proves Andromeda lies far outside the Milky Way and discovers cosmic expansion, transforming galaxies into "markers of space and time".',
    scientistOrMission: 'Edwin Hubble',
    significance: 'Definitive proof of the expanding multi-galactic universe.'
  },
  {
    year: '1932',
    titleHi: 'अदृश्य डार्क मैटर (Dark Matter) के साक्ष्य',
    titleEn: 'Evidence for Invisible Dark Matter',
    descriptionHi: 'आकाशगंगाओं की गति के अध्ययन से पता चला कि ब्रह्मांड का अधिकांश द्रव्यमान एक अनदेखे और अदृश्य पदार्थ (डार्क मैटर) से बना है, और दृश्यमान तारे केवल छोटा अंश हैं।',
    descriptionEn: 'Studies of galaxy cluster motions reveal that an invisible form of matter dominates the cosmos.',
    scientistOrMission: 'Fritz Zwicky / Jan Oort',
    significance: 'Galaxies contain only a fraction of the universe’s total matter.'
  },
  {
    year: '1964',
    titleHi: 'कॉस्मिक माइक्रोवेव बैकग्राउंड (CMB) की खोज',
    titleEn: 'Cosmic Microwave Background Discovery',
    descriptionHi: 'पेन्ज़ियास और विल्सन ने महाविस्फोट (Big Bang) के अवशेष विकिरण की खोज की, जिसने साबित किया कि आकाशगंगाएं एक अत्यंत तप्त और घने आरंभिक ब्रह्मांड से विकसित हुई हैं।',
    descriptionEn: 'Discovery of CMB radiation provides conclusive observational proof that galaxies evolved from a hot, dense Big Bang fireball.',
    scientistOrMission: 'Arno Penzias & Robert Wilson',
    significance: 'Validated the Big Bang cosmological model.'
  },
  {
    year: '1970s',
    titleHi: 'वेरा रुबिन द्वारा डार्क मैटर के प्रभुत्व की पुष्टि',
    titleEn: 'Vera Rubin Confirms Dark Matter Dominance',
    descriptionHi: 'खगोलशास्त्री वेरा रुबिन और केंट फोर्ड ने सर्पिल आकाशगंगाओं के बाहरी तारों की घूर्णन गति मापकर सिद्ध किया कि प्रत्येक आकाशगंगा एक विशाल अदृश्य डार्क मैटर हेलो में समाहित है।',
    descriptionEn: 'Vera Rubin and Kent Ford measure flat galaxy rotation curves, confirming that invisible dark matter dictates galactic dynamics.',
    scientistOrMission: 'Vera Rubin & Kent Ford',
    significance: 'Overturned classical stellar dynamics; established dark matter haloes.'
  },
  {
    year: '1990',
    titleHi: 'हबल स्पेस टेलीस्कोप का प्रक्षेपण एवं COBE उपग्रह',
    titleEn: 'Hubble Space Telescope Launch & COBE Mission',
    descriptionHi: 'नासा ने पृथ्वी के वायुमंडल की धुंध से ऊपर हबल टेलीस्कोप को स्थापित किया। COBE ने आरंभिक ब्रह्मांड के तापमान में सूक्ष्म उतार-चढ़ाव खोजे जिनसे पहली आकाशगंगाएं बनीं।',
    descriptionEn: 'NASA launches the Hubble Space Telescope into Earth orbit. COBE maps primeval temperature ripples that seeded early galaxies.',
    scientistOrMission: 'NASA / ESA',
    significance: 'Begins the golden age of ultra-sharp space-based astronomy.'
  },
  {
    year: '1994',
    titleHi: 'M87 आकाशगंगा के केंद्र में महाकाय ब्लैक होल की पुष्टि',
    titleEn: 'Hubble Confirms Supermassive Black Hole in M87',
    descriptionHi: 'हबल ने M87 आकाशगंगा के केंद्र में सूर्य से करोड़ों गुना भारी सुपरमैसिव ब्लैक होल की मौजूदगी प्रमाणित की और दिखाया कि लगभग सभी बड़ी आकाशगंगाओं के केंद्र में ब्लैक होल होते हैं।',
    descriptionEn: 'Hubble proves the existence of a supermassive black hole at the center of M87, linking black hole mass with parent galaxy mass.',
    scientistOrMission: 'Hubble Space Telescope Team',
    significance: 'Black holes recognized as universal galactic engines.'
  },
  {
    year: '1995',
    titleHi: 'हबल डीप फील्ड (Hubble Deep Field - HDF)',
    titleEn: 'The Historic Hubble Deep Field',
    descriptionHi: 'आकाश के एक खाली और अंधकारमय दिखने वाले छोटे से बिंदु पर हबल को 10 दिनों तक केंद्रित कर हजारों सुदूर प्राचीन आकाशगंगाओं को खोजा गया, जिसने ब्रह्मांड के इतिहास को खोल दिया।',
    descriptionEn: 'Staring into an apparently empty speck of sky, Hubble unveils thousands of primordial galaxies across billions of light-years.',
    scientistOrMission: 'Robert Williams & STScI Team',
    significance: 'Showed the young universe was packed with small, clumpy, chaotic galaxies.'
  },
  {
    year: '1996',
    titleHi: 'क्वासर (Quasars) और आकाशगंगा टकराव का संबंध',
    titleEn: 'Quasars Located at Galactic Collision Cores',
    descriptionHi: 'हबल की उच्च-विभेदन तस्वीरों ने स्पष्ट किया कि ब्रह्मांड के सबसे चमकदार पिंड "क्वासर" वास्तव में टकराती हुई आकाशगंगाओं के केंद्र में स्थित ब्लैक होल द्वारा ईंधन पाकर दहकते हैं।',
    descriptionEn: 'Hubble proves quasars reside in colliding galaxy cores, where gas is funneled into supermassive black holes.',
    scientistOrMission: 'Hubble Science Team',
    significance: 'Explains the engine powering the brightest beacons in cosmic history.'
  },
  {
    year: '1998',
    titleHi: 'डार्क एनर्जी (Dark Energy) एवं त्वरित ब्रह्मांड की खोज',
    titleEn: 'Accelerating Universe & Dark Energy Discovery',
    descriptionHi: 'सुदूर आकाशगंगाओं में सुपरनोवा के हबल अध्ययनों ने चौंकाने वाला खुलासा किया कि ब्रह्मांड का विस्तार धीमा नहीं बल्कि "डार्क एनर्जी" के कारण तीव्र गति से त्वरित हो रहा है।',
    descriptionEn: 'Distant supernova observations prove cosmic expansion is accelerating, driven by mysterious Dark Energy permeating all space.',
    scientistOrMission: 'High-Z Supernova Team & Supernova Cosmology Project (Nobel 2011)',
    significance: '70% of the universe is driven by mysterious repulsive Dark Energy.'
  },
  {
    year: '2014',
    titleHi: 'हबल अल्ट्रा डीप फील्ड (Hubble Ultra Deep Field - HUDF)',
    titleEn: 'Hubble Ultra Deep Field (10,000 Galaxies)',
    descriptionHi: '10 वर्षों के अवलोकन के संकलन से पराबैंगनी, दृश्य और अवरक्त तरंगों में लगभग 10,000 आकाशगंगाओं का अभूतपूर्व चित्र बनाया गया, जो बिग बैंग के केवल 400-500 मिलियन वर्ष बाद तक देखता है।',
    descriptionEn: 'A 10-year composite spanning UV to near-infrared reveals 10,000 evolving galaxies across 13 billion years of cosmic time.',
    scientistOrMission: 'Hubble Frontier Fields Team',
    significance: 'The most comprehensive cosmic time machine image in human history.'
  }
];

export const HUBBLE_DISCOVERIES: HubbleDiscoveryItem[] = [
  // ==========================================
  // CHAPTER 1: OUR GALACTIC NEIGHBORHOOD
  // ==========================================
  {
    id: 'andromeda-phat',
    titleEn: 'The Andromeda Galaxy (M31) & PHAT Survey',
    titleHi: 'एंड्रोमेडा आकाशगंगा (M31) एवं 10 करोड़ तारों का मोज़ेक',
    subtitleEn: '117 Million Stars and 2,753 Star Clusters Mapped',
    subtitleHi: 'हमारी सबसे बड़ी पड़ोसी आकाशगंगा के 117 मिलियन तारों का अभूतपूर्व सर्वेक्षण',
    chapter: 1,
    distanceLightYears: '2.5 Million Light-Years',
    lookbackTime: '2.5 Million Years Ago',
    visualTheme: 'spiral',
    keyStats: [
      { label: 'Exposures Combined', value: '7,000+ Hubble exposures' },
      { label: 'Stars Resolved', value: '> 100 Million Stars' },
      { label: 'Clusters Cataloged', value: '2,753 Blue Clusters' },
      { label: 'Citizen Scientists', value: '30,000 Volunteers' }
    ],
    summaryHi: 'हबल के PHAT प्रोग्राम ने 7,000 से अधिक एक्सपोजर जोड़कर एंड्रोमेडा आकाशगंगा के 10 करोड़ से अधिक व्यक्तिगत तारों को अलग-अलग देखा। इससे सिद्ध हुआ कि ब्रह्मांड में नए तारे बनने का अनुपात (Mass Ratio) एक सार्वभौमिक नियम का पालन करता है।',
    summaryEn: 'Combining over 7,000 exposures, Hubble resolved over 100 million individual stars in Andromeda’s disk, proving that the universe follows a universal stellar-mass recipe when creating stars.',
    deepExplanationHi: 'एंड्रोमेडा हमारी मंदाकिनी (Milky Way) की सबसे बड़ी पड़ोसी सर्पिल आकाशगंगा है। 30,000 स्वयंसेवी नागरिक वैज्ञानिकों की मदद से 2,753 युवा नीले तारा समूहों का अध्ययन किया गया। अध्ययन में पाया गया कि सबसे विशाल तारे पहले के अनुमान से 25% कम हैं, जिसका अर्थ है कि प्रारंभिक ब्रह्मांड में भारी तत्वों (जैसे लोहा, सोना, कार्बन) के निर्माण में समय लगा क्योंकि कम सुपरनोवा हुए थे।',
    deepExplanationEn: 'The Panchromatic Hubble Andromeda Treasury (PHAT) mapped 61,000 light-years of Andromeda. Citizen scientists sifted through thousands of images to identify star clusters ranging from 4M to 24M years old. The discovery that massive stars are 25% less abundant implies earlier estimates underestimated the masses of distant galaxies.',
    keyTakeaway: 'Universal Star-Birth Formula: Both Milky Way and Andromeda follow identical stellar distribution ratios from massive blue supergiants to small red dwarfs.',
    quote: {
      text: 'Given the sheer volume of Hubble images, our study would not have been possible without the help of citizen scientists.',
      author: 'Daniel Weisz',
      affiliation: 'University of Washington'
    },
    scientificTags: ['M31', 'PHAT Survey', 'Stellar IMF', 'Citizen Science', 'Spiral Galaxy']
  },
  {
    id: 'milkyway-andromeda-collision',
    titleEn: 'The Great Galactic Collision: Milky Way vs. Andromeda',
    titleHi: 'महा-टक्कर: 4 अरब वर्ष बाद मंदाकिनी और एंड्रोमेडा का विलय',
    subtitleEn: 'Head-On Collision Predicted by Hubble Trajectory Data',
    subtitleHi: 'दोनों सर्पिल आकाशगंगाएं मिलकर एक विशाल अंडाकार (Elliptical) आकाशगंगा बनेंगी',
    chapter: 1,
    distanceLightYears: '2.5 Million Light-Years (Closing at 250,000 mph)',
    lookbackTime: 'Present to +4 Billion Years in Future',
    visualTheme: 'collision',
    keyStats: [
      { label: 'Impact Onset', value: '4 Billion Years from Now' },
      { label: 'Settling Duration', value: '2 Billion Years' },
      { label: 'Final Morphology', value: 'Giant Oval Elliptical Galaxy' },
      { label: 'Solar System Fate', value: 'Flung into New Outer Orbit' }
    ],
    summaryHi: 'हबल द्वारा एंड्रोमेडा की सटीक 3D गति मापने पर पुष्टि हुई कि 4 अरब साल बाद हमारी मंदाकिनी और एंड्रोमेडा आमने-सामने टकराएंगी। तारों के बीच दूरी इतनी अधिक है कि तारे सीधे नहीं टकराएंगे, परंतु गुरुत्वाकर्षण सूर्य को नए परिक्रमा पथ पर धकेल देगा।',
    summaryEn: 'Hubble’s lateral motion measurements show Andromeda and the Milky Way are on a direct collision course 4 billion years from now, merging over 2 billion years into a single giant elliptical galaxy.',
    deepExplanationHi: 'वर्तमान में दोनों आकाशगंगाएं गुरुत्वाकर्षण द्वारा 250,000 मील प्रति घंटे की गति से एक-दूसरे की ओर खिंच रही हैं। 4 अरब वर्ष में प्रथम समागम होगा, जिससे दोनों की सर्पिल भुजाएं विकृत होकर लंबी गैस-धूल पूंछों में बदल जाएंगी। 6 अरब वर्ष में दोनों के केंद्रीय सुपरमैसिव ब्लैक होल आपस में मिलकर एक भीमकाय अंडाकार आकाशगंगा का निर्माण करेंगे जिसे वैज्ञानिक "मिल्कोमेडा" (Milkomeda) कहते हैं।',
    deepExplanationEn: 'Computer simulations fed by Hubble data demonstrate a head-on smashup. Gas clouds will violently compress, sparking an immense firestorm of new star formation. The Sun and planets will survive unharmed physically but will be relocated into a vastly different orbit around the new galactic center.',
    keyTakeaway: 'Spiral galaxies grow by consuming satellites and eventually merge with giant companions into massive ellipticals.',
    scientificTags: ['Galactic Merger', 'Milkomeda', 'Local Group Dynamics', 'Future Cosmos']
  },
  {
    id: 'smith-cloud',
    titleEn: 'The Returning Smith Cloud: Recycled Galactic Gas',
    titleHi: 'स्मिथ क्लाउड: 700,000 मील/घंटा से वापस लौटता गैस का दैत्य',
    subtitleEn: '11,000 Light-Year Gas Cloud Plunging Back into Milky Way',
    subtitleHi: '3 करोड़ वर्षों में टकराकर 20 लाख नए सूर्यों को जन्म देगा',
    chapter: 1,
    distanceLightYears: '40,000 Light-Years from Earth (Falling toward disk)',
    lookbackTime: 'Ejected 70M Yrs Ago • Return in 30M Yrs',
    visualTheme: 'dwarf',
    keyStats: [
      { label: 'Cloud Length', value: '11,000 Light-Years' },
      { label: 'Cloud Width', value: '2,500 Light-Years' },
      { label: 'Speed', value: '700,000 mph (1.1M km/h)' },
      { label: 'Star-Birth Capacity', value: 'Enough gas for 2 Million Suns' }
    ],
    summaryHi: 'हबल ने 11,000 प्रकाश वर्ष लंबे "स्मिथ क्लाउड" में सल्फर तत्व का विश्लेषण कर सिद्ध किया कि यह गैस 7 करोड़ वर्ष पहले हमारी अपनी आकाशगंगा से बाहर फेंकी गई थी और अब 3 करोड़ वर्ष बाद पुनः लौटकर 20 लाख नए तारों को जन्म देगी।',
    summaryEn: 'Using ultraviolet spectroscopy on background quasars, Hubble proved the massive Smith Cloud was ejected from the Milky Way 70M years ago and is now boomeranging back to forge 2 million new suns.',
    deepExplanationHi: 'पहले माना जाता था कि यह कोई विफल तारारहित आकाशगंगा है। परंतु हबल के कॉस्मिक ओरिजिन स्पेक्ट्रोग्राफ ने पाया कि इसमें बाहरी अंतरिक्ष की शुद्ध हाइड्रोजन नहीं, बल्कि तारों द्वारा बनाया गया सल्फर मौजूद है। यह साबित करता है कि आकाशगंगा एक सक्रिय "फाउंटेन" की तरह सामग्री को बाहर फेंकती है और रीसायकल (Recycle) करके नए तारों का निर्माण जारी रखती है।',
    deepExplanationEn: 'The presence of heavy elements like sulfur confirms the gas originated in the Milky Way’s outer disk rather than pristine intergalactic space. In 30 million years, when it plows into the Perseus Arm, it will ignite a spectacular galactic firestorm.',
    keyTakeaway: 'The Milky Way is a dynamic bubbling ecosystem that recycles its stellar material in giant 100-million-year fountain cycles.',
    quote: {
      text: 'The Milky Way is a bubbling, very active place where gas can be thrown out of one part of the disk and then return back down into another.',
      author: 'Andrew Fox',
      affiliation: 'Space Telescope Science Institute'
    },
    scientificTags: ['Smith Cloud', 'Galactic Recycling', 'Gas Hydrodynamics', 'Star Formation']
  },
  {
    id: 'milkyway-core-blackhole',
    titleEn: 'Piercing the Milky Way Heart & Galactic Bulge White Dwarfs',
    titleHi: 'मंदाकिनी के हृदय की गहराई: 5 लाख तारे और 16 प्राचीन श्वेत वामन',
    subtitleEn: 'SWEEPS Survey Proves Bulge Formed Rapidly in 2 Billion Years',
    subtitleHi: 'Sagittarius A* (40 लाख सौर द्रव्यमान ब्लैक होल) के चारों ओर तारकीय सघनता',
    chapter: 1,
    distanceLightYears: '27,000 Light-Years (Galactic Center)',
    lookbackTime: '27,000 Years (Bulge age ~12 Billion Years)',
    visualTheme: 'deep-red',
    keyStats: [
      { label: 'Core Star Density', value: '1 Million Suns packed in 4.3 ly' },
      { label: 'Central Black Hole', value: '4 Million Solar Masses (Sgr A*)' },
      { label: 'White Dwarfs Found', value: '16 Ancient Stellar Relics' },
      { label: 'Bulge Age', value: 'Formed in < 2 Billion Years' }
    ],
    summaryHi: 'हबल के इंफ्रारेड कैमरों ने धूल के घने बादलों को चीरकर मंदाकिनी के केंद्र में 5 लाख से अधिक तारों और 16 प्राचीन श्वेत वामन (White Dwarfs) तारों को खोज निकाला, जिससे साबित हुआ कि केंद्र का उभार (Bulge) डिस्क से पहले बहुत तेजी से बना था।',
    summaryEn: 'Hubble pierced the dust-enshrouded galactic core, revealing half a million stars orbiting Sagittarius A* and identifying 16 ancient white dwarfs that prove the central bulge formed rapidly before the disk.',
    deepExplanationHi: 'मंदाकिनी के केंद्र में तारों का घनत्व इतना अधिक है मानो हमारे सूर्य और निकटतम तारे अल्फा सेंटॉरी (4.3 प्रकाश वर्ष) के बीच 10 लाख सूर्य ठूंस दिए गए हों। हबल के SWEEPS सर्वेक्षण ने 26,000 प्रकाश वर्ष दूर मंदाकिनी के उभार में प्राचीन सफेद बौने तारों की गति, चमक और रंग का सूक्ष्म विश्लेषण कर ब्रह्मांडीय पुरातत्व (Cosmic Archaeology) किया।',
    deepExplanationEn: 'The survey revealed that the bulge’s stars were born in a rapid 2-billion-year burst, with a higher proportion of low-mass stars than in the outer disk where our Solar System resides.',
    keyTakeaway: 'The central hub of our galaxy formed in a quick primordial frenzy, while the outer spiral arms grew leisurely over billions of years.',
    quote: {
      text: 'The environment in the bulge may have been different than the one in the disk, resulting in a different star-formation mechanism.',
      author: 'Annalisa Calamida',
      affiliation: 'Space Telescope Science Institute'
    },
    scientificTags: ['Sagittarius A*', 'SWEEPS Survey', 'White Dwarfs', 'Cosmic Archaeology', 'Galactic Bulge']
  },
  {
    id: 'magellanic-leading-arm',
    titleEn: 'Magellanic Cosmic Tug-of-War & The Leading Arm',
    titleHi: 'मैगेलैनिक बादलों का गुरुत्वाकर्षण युद्ध और लीडिंग आर्म',
    subtitleEn: 'Small vs Large Magellanic Cloud Gas Stream Feeding the Milky Way',
    subtitleHi: 'सुदूर क्वासरों के प्रकाश द्वारा गैस के स्रोत का पता लगाया गया',
    chapter: 1,
    distanceLightYears: '160,000 to 200,000 Light-Years',
    lookbackTime: '1-2 Billion Years of Gravitational Interaction',
    visualTheme: 'quasar',
    keyStats: [
      { label: 'Leading Arm Span', value: 'Half the length of Milky Way' },
      { label: 'Background Probes', value: '7 Distant Quasars' },
      { label: 'Gas Victor', value: 'Large Magellanic Cloud pulling from Small' },
      { label: 'Function', value: 'Injecting fresh fuel into Milky Way' }
    ],
    summaryHi: 'हमारी आकाशगंगा की परिक्रमा कर रहे दो बौने पड़ोसी (लार्ज व स्मॉल मैगेलैनिक क्लाउड) आपस में लड़ रहे हैं। हबल ने 7 सुदूर क्वासरों के प्रकाश का स्पेक्ट्रोस्कोपी अध्ययन कर साबित किया कि लार्ज क्लाउड ने स्मॉल क्लाउड से गैस छीनकर एक विशाल "लीडिंग आर्म" बनाई है जो हमारी आकाशगंगा को पोषण दे रही है।',
    summaryEn: 'Hubble probed light from 7 background quasars to reveal that the Large Magellanic Cloud is winning a gravitational tug-of-war, ripping a massive gas arm from the Small Magellanic Cloud to feed our galaxy.',
    deepExplanationHi: 'यह गैस की विशाल धारा हमारी आकाशगंगा की आधी लंबाई के बराबर फैली है। हबल के कॉस्मिक ओरिजिन स्पेक्ट्रोग्राफ ने गैस की रासायनिक संरचना (ऑक्सीजन और हाइड्रोजन का अनुपात) मापकर पुष्टि की कि यह गैस स्मॉल मैगेलैनिक क्लाउड से लूटी गई थी।',
    deepExplanationEn: 'By measuring the chemical fingerprints and radial velocities of the gas silhouetted against brilliant background quasars, astronomers unmasked the culprit in this multi-billion-year intergalactic robbery.',
    keyTakeaway: 'Dwarf satellite galaxies constantly donate virgin gas to sustain star birth in giant host spiral galaxies.',
    quote: {
      text: 'We can measure the composition and velocity of the gas to determine which dwarf galaxy is the culprit.',
      author: 'Kat Barger',
      affiliation: 'Texas Christian University'
    },
    scientificTags: ['Magellanic Clouds', 'Leading Arm', 'Quasar Spectroscopy', 'Tidal Stripping']
  },
  {
    id: 'andromeda-giant-halo',
    titleEn: 'Andromeda’s Invisible Giant Gas Halo',
    titleHi: 'एंड्रोमेडा का अदृश्य महा-प्रभामंडल (Giant Halo)',
    subtitleEn: 'Stretches 1 Million Light-Years — Halfway to the Milky Way',
    subtitleHi: 'यदि आंखों से दिखता तो पूर्णिमा के चंद्रमा से 100 गुना बड़ा प्रतीत होता',
    chapter: 1,
    distanceLightYears: 'Stretches 1 to 2 Million Light-Years in radius',
    lookbackTime: '5 Years of Archived Hubble Data Analysis',
    visualTheme: 'lens',
    keyStats: [
      { label: 'Halo Radius', value: '1,000,000 Light-Years' },
      { label: 'Halo Mass', value: 'Half the mass of all stars in Andromeda' },
      { label: 'Apparent Size', value: '100x the diameter of the Full Moon' },
      { label: 'Enrichment', value: 'Heavy supernova elements' }
    ],
    summaryHi: 'हबल ने खोजा कि एंड्रोमेडा आकाशगंगा के चारों ओर गैस का एक अत्यंत विशाल गर्म प्रभामंडल (Halo) है जो 10 लाख प्रकाश वर्ष दूर तक फैला है—यानी हमारी मंदाकिनी तक आधे रास्ते तक आ चुका है। इसमें तारों के कुल द्रव्यमान का आधा हिस्सा गर्म गैस के रूप में मौजूद है।',
    summaryEn: 'Analyzing quasar light filters, Hubble found Andromeda’s dark gas halo is 6x larger and 1,000x more massive than expected, stretching 1 million light-years across space.',
    deepExplanationHi: 'क्योंकि यह गैस स्वयं दृश्य प्रकाश में नहीं चमकती, खगोलविदों ने इसके पीछे स्थित सुदूर क्वासरों की चमक में अवशोषण (Absorption) की जांच की। इस गैस में भारी तत्वों की मौजूदगी दर्शाती है कि यह करोड़ों सुपरनोवा विस्फोटों द्वारा अंतरिक्ष में फेंकी गई है।',
    deepExplanationEn: 'The halo acts as a giant reservoir of star-forming fuel and heavy elements ejected by stellar explosions, governing the future evolution of giant spiral galaxies.',
    keyTakeaway: 'Galaxies extend far beyond their visible starry disks through vast, enriched gas envelopes that already interlock with neighboring galaxies.',
    quote: {
      text: 'The properties of these gaseous halos control the rate at which stars form in galaxies.',
      author: 'Nicolas Lehner',
      affiliation: 'University of Notre Dame'
    },
    scientificTags: ['Circumgalactic Medium', 'Andromeda Halo', 'Supernova Enrichment', 'Quasar Absorption']
  },

  // ==========================================
  // CHAPTER 2: INTRIGUING GALAXIES ACROSS THE UNIVERSE
  // ==========================================
  {
    id: 'bedin-1',
    titleEn: 'Bedin I: The 13-Billion-Year-Old Cosmic Fossil in Our Backyard',
    titleHi: 'बेदिन 1 (Bedin I): हमारे पड़ोस में छिपा 13 अरब वर्ष पुराना जीवाश्म',
    subtitleEn: 'Prehistoric Dwarf Galaxy Hidden Behind Globular Cluster NGC 6752',
    subtitleHi: 'हमारी आकाशगंगा से 30 गुना छोटी और 1000 गुना धुंधली प्राचीन आकाशगंगा',
    chapter: 2,
    distanceLightYears: '30 Million Light-Years Away',
    lookbackTime: '13 Billion Years Old (Nearly age of Universe)',
    visualTheme: 'dwarf',
    keyStats: [
      { label: 'Diameter', value: 'Only 3,000 Light-Years' },
      { label: 'Brightness', value: '1,000x fainter than Milky Way' },
      { label: 'Isolation', value: '2 Million ly from nearest large galaxy' },
      { label: 'Age', value: '~13 Billion Years' }
    ],
    summaryHi: 'हबल से NGC 6752 तारा गुच्छ का अध्ययन करते समय गलती से उसके ठीक पीछे छिपी एक छोटी आदिम आकाशगंगा "बेदिन I" मिली। यह 13 अरब वर्ष पुरानी है और अपने जन्म के बाद से पूरी तरह शांत रहकर प्रारंभिक ब्रह्मांड का सजीव जीवाश्म बनी हुई है।',
    summaryEn: 'While studying a foreground globular cluster, Hubble serendipitously discovered Bedin I—a tiny, 13-billion-year-old dwarf galaxy that has lived in complete isolation since the dawn of the cosmos.',
    deepExplanationHi: 'बेदिन I मात्र 3,000 प्रकाश वर्ष चौड़ी है और किसी भी बड़ी आकाशगंगा से कम से कम 20 लाख प्रकाश वर्ष दूर बिल्कुल एकांत में है। इसमें न तो गैस बची है और न ही नए तारे बन रहे हैं। यह हमें बताती है कि बिग बैंग के तुरंत बाद बनी पहली छोटी आकाशगंगाएं कैसी दिखती थीं।',
    deepExplanationEn: 'Bedin I’s stellar population is pristine and ancient. Because it never collided with other galaxies or accreted fresh gas, it serves as an undisturbed time capsule of early galactic formation.',
    keyTakeaway: 'Isolated dwarf fossils allow astronomers to study pristine early universe conditions right at our cosmic doorstep.',
    quote: {
      text: 'Had the galaxy been ten times farther away, it would have been much harder to detect, even with Hubble.',
      author: 'Luigi Bedin',
      affiliation: 'Astronomical Observatory of Padua'
    },
    scientificTags: ['Bedin I', 'Galactic Fossil', 'Dwarf Spheroidal', 'Early Universe Relic']
  },
  {
    id: 'pisces-a-b',
    titleEn: 'Pisces A & Pisces B: Awakening Dwarf Galaxies from the Cosmic Void',
    titleHi: 'मीन ए और बी (Pisces A & B): महाशून्य से जागती सोई हुई आकाशगंगाएं',
    subtitleEn: 'Dormant for Billions of Years, Doubling Star Birth upon Entering Gas Filament',
    subtitleHi: 'लोकल वॉयड (Local Void) के निर्जन स्थान से निकलकर पहली बार तारे बनाना शुरू किया',
    chapter: 2,
    distanceLightYears: '19 Million (Pisces A) & 30 Million (Pisces B) Light-Years',
    lookbackTime: 'Awakened < 100 Million Years Ago',
    visualTheme: 'dwarf',
    keyStats: [
      { label: 'Hydrogen Reserve', value: 'Pristine unspent hydrogen' },
      { label: 'Star Birth Surge', value: '2x previous rate in last 100M yrs' },
      { label: 'Origin Zone', value: 'The Local Void (Empty Space)' },
      { label: 'Trigger', value: 'Crossing dense gas filament boundary' }
    ],
    summaryHi: 'अरबों वर्षों तक ब्रह्मांड के खाली इलाके (Local Void) में शांत रहने के बाद, मीन ए और मीन बी नामक दो बौनी आकाशगंगाएं हाल ही में घनी गैस की पट्टी में दाखिल हुईं और 10 करोड़ साल पहले अचानक नए तारों का तीव्र निर्माण शुरू कर दिया।',
    summaryEn: 'Having spent billions of years in the barren Local Void, dwarf galaxies Pisces A and B recently drifted into a gas-rich filament, sparking a late swell of furious star birth at double their prior rate.',
    deepExplanationHi: 'अधिकांश विकसित आकाशगंगाएं अपनी हाइड्रोजन गैस का बड़ा हिस्सा तारों में बदल चुकी हैं, लेकिन इन दोनों में अप्रयुक्त हाइड्रोजन का विशाल भंडार था। जब ये खाली अंतरिक्ष से निकलकर बाहरी गैस क्लाउड से टकराईं, तो तारों की नई पीढ़ी का जन्म हुआ।',
    deepExplanationEn: 'Radio telescopes spotted them as hydrogen blobs, but Hubble resolved individual young stars. This demonstrates how environmental density directly dictates when and how galaxies ignite star formation.',
    keyTakeaway: 'Galaxies can remain in a cosmic deep freeze for billions of years until environmental gas triggers their awakening.',
    quote: {
      text: 'These galaxies may have spent most of their history in the void.',
      author: 'Erik Tollerud',
      affiliation: 'Space Telescope Science Institute'
    },
    scientificTags: ['Pisces A', 'Pisces B', 'Local Void', 'Late Starburst', 'Dwarf Galaxies']
  },
  {
    id: 'kiso-5639-tadpole',
    titleEn: 'Kiso 5639: The Cosmic Tadpole Galaxy Starburst',
    titleHi: 'कीसो 5639 (Kiso 5639): अंतरिक्षीय टैडपोल आकाशगंगा का भीषण विस्फोट',
    subtitleEn: 'Furious Star Birth in 2,700-Light-Year Head Sparked by Intergalactic Gas',
    subtitleHi: 'प्रारंभिक ब्रह्मांड में पाई जाने वाली टैडपोल आकाशगंगाओं का दुर्लभ नजदीकी उदाहरण',
    chapter: 2,
    distanceLightYears: '82 Million Light-Years Away',
    lookbackTime: 'Starburst age < 1 Million Years',
    visualTheme: 'spiral',
    keyStats: [
      { label: 'Head Diameter', value: '2,700 Light-Years' },
      { label: 'Cluster Age', value: '< 1 Million Years Old' },
      { label: 'Cluster Mass', value: '3x to 6x heavier than normal' },
      { label: 'Prevalence in Early Universe', value: '~10% of all early galaxies' }
    ],
    summaryHi: '82 मिलियन प्रकाश वर्ष दूर स्थित कीसो 5639 एक टैडपोल (मेंढक के बच्चे) जैसी आकृति की आकाशगंगा है। इसके 2,700 प्रकाश वर्ष लंबे "सिर" में मात्र 10 लाख साल पहले अंतरिक्षीय गैस के टकराने से नए तारों की भट्टी दहक उठी है।',
    summaryEn: 'Hubble imaged Kiso 5639, a rare nearby tadpole-shaped galaxy whose 2,700-light-year head is ablaze with dozens of newborn massive star clusters less than a million years old.',
    deepExplanationHi: 'हबल अल्ट्रा डीप फील्ड के अनुसार आरंभिक ब्रह्मांड में 10% आकाशगंगाएं इसी तरह खींची हुई टैडपोल जैसी थीं जो बाद में मिलकर बड़ी सर्पिल आकाशगंगाएं बनीं। कीसो 5639 हमें करीब से दिखाती है कि कैसे गैस फिलामेंट के टकराने से एक सिरे पर महाकाय तारों के समूह पैदा होते हैं।',
    deepExplanationEn: 'The galaxy’s leading edge ran into an intergalactic gas filament, depositing dense fuel that ignited a cosmic fireworks display glowing brightly in the pink emission lines of ionized hydrogen.',
    keyTakeaway: 'Tadpole galaxies reveal how asymmetrical gas accretion shaped the earliest building blocks of the universe.',
    quote: {
      text: 'I think Kiso 5639 is a beautiful, up-close example of what must have been common long ago.',
      author: 'Debra Elmegreen',
      affiliation: 'Vassar College'
    },
    scientificTags: ['Kiso 5639', 'Tadpole Galaxy', 'Starburst Head', 'Hydrogen Emission']
  },
  {
    id: 'elliptical-blackhole-thunderstorm',
    titleEn: 'Black Hole Feedback & The "Thunderstorm" Cycle in Elliptical Galaxies',
    titleHi: 'सुपरमैसिव ब्लैक होल और विशाल आकाशगंगाओं में "तूफानी वर्षा" चक्र',
    subtitleEn: 'Self-Regulating Star Birth: Black Hole Jets Heat Halo Gas Like Raindrops',
    subtitleHi: 'Abell 1664, 1795, 2597, Hydra A आदि में तारों के निर्माण का नियमन',
    chapter: 2,
    distanceLightYears: 'Hundreds of Millions to Billions of Light-Years',
    lookbackTime: 'Multi-billion year feedback cycles',
    visualTheme: 'quasar',
    keyStats: [
      { label: 'Galaxies Studied', value: 'Abell 1664, 1795, 2597, Hydra A, RX J1504, ZwCl 8193' },
      { label: 'Mechanism', value: 'Black Hole Jet Heating vs Gas Cooling' },
      { label: 'Analogy', value: 'Atmospheric Thunderstorm & Rain' },
      { label: 'Result', value: 'Prevents runaway star birth in giant ellipticals' }
    ],
    summaryHi: 'हबल ने पराबैंगनी किरणों में देखा कि विशाल अंडाकार आकाशगंगाओं के केंद्र में स्थित ब्लैक होल की हाई-एनर्जी जेट्स गैस को गर्म रखती हैं। जब गैस ठंडी होकर बारिश की बूंदों की तरह केंद्र पर गिरती है, तो तारे बनते हैं और ब्लैक होल फिर दहककर गैस को गर्म कर देता है—यह एक स्वचालित वेदर साइकिल है।',
    summaryEn: 'Hubble revealed that central black holes act like cosmic thermostats: their high-energy jets heat surrounding gas halos, moderating how much gas precipitates into cold star-forming droplets.',
    deepExplanationHi: 'वैज्ञानिक लंबे समय से हैरान थे कि ब्रह्मांड की सबसे बड़ी आकाशगंगाएं और अधिक तारे क्यों नहीं बनातीं। हबल के UV चित्रों ने दिखाया कि ब्लैक होल जेट्स गैस को जरूरत से ज्यादा ठंडा नहीं होने देतीं। यदि बहुत अधिक गैस ठंडी होती है, तो ब्लैक होल का भोजन बढ़ता है, जेट्स शक्तिशाली होकर तापमान बढ़ा देती हैं और तारा निर्माण थम जाता है।',
    deepExplanationEn: 'This self-regulating feedback loop maintains a delicate cosmic balance, explaining why giant elliptical galaxies continue to produce stars at a modest, controlled pace long after their prime.',
    keyTakeaway: 'Black holes do not just consume matter; their relativistic jets regulate the climate and star-making rate of entire host galaxies.',
    quote: {
      text: 'What we are seeing is a process like a thunderstorm. Some of that gas cools and precipitates into cold clumps that fall back toward the galaxy’s center like raindrops.',
      author: 'Megan Donahue',
      affiliation: 'Michigan State University'
    },
    scientificTags: ['AGN Feedback', 'Elliptical Galaxies', 'Black Hole Jets', 'Cooling Flows']
  },
  {
    id: 'ngc-1277-red-and-dead',
    titleEn: 'NGC 1277: The "Red and Dead" Relic Galaxy Unchanged for 10 Billion Years',
    titleHi: 'NGC 1277: 10 अरब वर्षों से अपरिवर्तित "लाल एवं मृत" जीवाश्म आकाशगंगा',
    subtitleEn: 'Starved of Gas, It Never Gobbled Satellites and Retains Only Ancient Red Clusters',
    subtitleHi: 'पर्सियस क्लस्टर में 24 करोड़ प्रकाश वर्ष दूर स्थित प्रारंभिक ब्रह्मांड का अछूता नमूना',
    chapter: 2,
    distanceLightYears: '240 Million Light-Years (Perseus Cluster)',
    lookbackTime: 'Frozen in time for 10 Billion Years',
    visualTheme: 'deep-red',
    keyStats: [
      { label: 'Initial Star Rate', value: '1,000x faster than Milky Way today' },
      { label: 'Globular Clusters', value: '100% Red (Metal-Rich), 0% Blue' },
      { label: 'Cannibalism', value: 'Never swallowed satellite galaxies' },
      { label: 'Central Black Hole', value: 'Exceptionally massive core' }
    ],
    summaryHi: 'NGC 1277 अपने आरंभिक दिनों में हमारी मंदाकिनी से 1,000 गुना तेजी से तारे बना रही थी, परंतु अचानक गैस खत्म होने से 10 अरब साल पहले इसका विकास थम गया। हबल ने पाया कि इसके सभी तारा समूह लाल रंग के हैं, जिसका अर्थ है कि इसने कभी किसी अन्य आकाशगंगा को नहीं निगला।',
    summaryEn: 'Hubble discovered that nearby galaxy NGC 1277 has remained completely unchanged for 10 billion years. Lacking the blue star clusters acquired by galaxy mergers, it is a pristine "red and dead" relic.',
    deepExplanationHi: 'सुदूर ब्रह्मांड में ऐसी लाल और मृत आकाशगंगाएं केवल धुंधले लाल बिंदुओं के रूप में दिखती हैं, लेकिन 24 करोड़ प्रकाश वर्ष दूर होने के कारण हबल ने NGC 1277 के गोलाकार समूहों (Globular Clusters) का विस्तृत अध्ययन किया। यह आकाशगंगा पर्सियस क्लस्टर के केंद्र में इतनी तेज गति से घूम रही थी कि इसे नई गैस नहीं मिल सकी और यह जम गई।',
    deepExplanationEn: 'The total absence of metal-poor blue globular clusters confirms NGC 1277 never merged with satellite galaxies, making it a pure, unadulterated snapshot of early galactic architecture.',
    keyTakeaway: 'Some galaxies formed all their stars in an early sprint and have coasted through cosmic history as living relics without merging.',
    quote: {
      text: 'We can explore such original galaxies in full detail and probe the conditions of the early universe.',
      author: 'Ignacio Trujillo',
      affiliation: 'Instituto de Astrofísica de Canarias'
    },
    scientificTags: ['NGC 1277', 'Relic Galaxy', 'Red and Dead', 'Globular Clusters', 'Perseus Cluster']
  },
  {
    id: 'markarian-231-double-blackhole',
    titleEn: 'Markarian 231 (Mrk 231): Double Supermassive Black Hole Engine',
    titleHi: 'मरकारियन 231: दो महाकाय ब्लैक होल की परिक्रमा से दहकता निकटतम क्वासर',
    subtitleEn: 'Nearest Quasar to Earth at 581 Million Light-Years Powered by Binary Singularity',
    subtitleHi: 'अल्ट्रावायलेट डोनट होल से सिद्ध हुआ कि दो ब्लैक होल एक-दूसरे का चक्कर लगा रहे हैं',
    chapter: 2,
    distanceLightYears: '581 Million Light-Years Away',
    lookbackTime: 'Merger ignited ~1 Million Years Ago',
    visualTheme: 'quasar',
    keyStats: [
      { label: 'System Type', value: 'Binary Supermassive Black Holes' },
      { label: 'Distance', value: '581 Million Light-Years (Nearest Quasar)' },
      { label: 'Primary Black Hole', value: '150 Million Solar Masses' },
      { label: 'Secondary Companion', value: '4 Million Solar Masses (orbits in 1.2 yrs)' }
    ],
    summaryHi: 'पृथ्वी के सबसे निकटतम क्वासर "Markarian 231" के केंद्र में हबल ने एक चौंकाने वाली खोज की: इसके केंद्र में एक नहीं, बल्कि दो सुपरमैसिव ब्लैक होल एक-दूसरे की परिक्रमा कर रहे हैं, जिन्होंने 10 लाख साल पहले आकाशगंगा विलय के बाद क्वासर को प्रज्वलित किया।',
    summaryEn: 'Hubble uncovered evidence that the nearest quasar, Markarian 231, is driven by two supermassive black holes whirling around each other, carving a distinctive donut hole in the ultraviolet accretion disk.',
    deepExplanationHi: 'यदि केंद्र में केवल एक ब्लैक होल होता, तो पूरी डिस्क पराबैंगनी किरणों में समान रूप से चमकती। लेकिन हबल ने देखा कि केंद्र की ओर UV चमक अचानक गिर जाती है। गतिशील गणनाओं से साबित हुआ कि एक छोटा ब्लैक होल डिस्क के बीच में गैप बना रहा है। यह जोड़ा अंततः टकराकर प्रचंड गुरुत्वाकर्षण तरंगें उत्पन्न करेगा।',
    deepExplanationEn: 'The secondary black hole was acquired when a smaller galaxy merged with Mrk 231. The binary system completes an orbit every 1.2 years and will eventually merge into a single supermassive singularity.',
    keyTakeaway: 'Galactic mergers bring supermassive black holes into binary dances that ignite the most brilliant quasar beacons in the cosmos.',
    quote: {
      text: 'Binary black holes are natural consequences of these mergers of galaxies.',
      author: 'Xinyu Dai',
      affiliation: 'University of Oklahoma'
    },
    scientificTags: ['Mrk 231', 'Binary Black Hole', 'Quasar Accretion', 'Gravitational Waves']
  },

  // ==========================================
  // CHAPTER 3: THE FARTHEST GALAXIES & COSMIC FRONTIER
  // ==========================================
  {
    id: 'gravitational-lensing-einstein-rings',
    titleEn: 'Gravitational Lensing: Nature’s Cosmic Zoom Lenses & Einstein Rings',
    titleHi: 'गुरुत्वाकर्षण लेंसिंग: ब्रह्मांडीय आवर्धक लेंस और आइंस्टीन के छल्ले',
    subtitleEn: 'Massive Clusters Warp Space-Time to Magnify Distant Primordial Galaxies by 20x+',
    subtitleHi: 'Abell 370, Abell 2744, SDSS J0146-0929 में अंतरिक्ष-समय का वक्र रूप',
    chapter: 3,
    distanceLightYears: 'Lenses: 3.5-5 Billion ly • Background Galaxies: 12-13.3 Billion ly',
    lookbackTime: 'Up to 13.3 Billion Years (500M yrs after Big Bang)',
    visualTheme: 'lens',
    keyStats: [
      { label: 'Magnification Power', value: 'Up to 20x to 50x magnification' },
      { label: 'Frontier Clusters', value: 'Abell 2744, Abell 370, Abell S1063, MACS J0416' },
      { label: 'Einstein Ring', value: 'SDSS J0146-0929 complete light circle' },
      { label: 'Physical Principle', value: 'Einstein’s General Relativity (Mass Warps Spacetime)' }
    ],
    summaryHi: 'अल्बर्ट आइंस्टीन के सामान्य सापेक्षता सिद्धांत के अनुसार विशाल आकाशगंगा समूहों का गुरुत्वाकर्षण अंतरिक्ष-समय के ताने-बाने को मोड़ देता है। हबल इस प्राकृतिक ज़ूम लेंस का उपयोग करके उन अति-सुदूर आकाशगंगाओं को 20 गुना बड़ा और चमकीला करके देख पाता है जिन्हें देखना अन्यथा असंभव था।',
    summaryEn: 'Predicted by Einstein, the colossal gravity of massive foreground galaxy clusters bends and magnifies the light of faint background galaxies into glowing arcs, streaks, and complete Einstein rings.',
    deepExplanationHi: 'हबल फ्रंटियर फील्ड्स प्रोग्राम ने 6 विशाल आकाशगंगा समूहों (जैसे Abell 370 और Abell 2744) को प्राकृतिक दूरबीन के रूप में उपयोग किया। जब प्रकाश मुड़ता है, तो पृष्ठभूमि की आकाशगंगा एक से अधिक स्थानों पर चाप (Arcs) या संपूर्ण वलय (Ring) के रूप में दिखाई देती है, जिससे वैज्ञानिक बिग बैंग के कुछ ही सौ मिलियन वर्ष बाद के तारों का अध्ययन कर पाते हैं।',
    deepExplanationEn: 'Without gravitational lensing, Hubble’s 2.4-meter mirror would be physically incapable of resolving embryonic galaxies from the first billion years of cosmic time.',
    keyTakeaway: 'Gravitational lensing transforms foreground galaxy clusters into colossal cosmic magnifying glasses that open a window to the dawn of the universe.',
    scientificTags: ['Gravitational Lensing', 'Einstein Ring', 'Frontier Fields', 'General Relativity', 'Abell 370']
  },
  {
    id: 'macs-2129-1-dead-disk',
    titleEn: 'MACS 2129-1: The Distant "Dead" Disk Galaxy That Defies Cosmic Models',
    titleHi: 'MACS 2129-1: युवा ब्रह्मांड में घूमती "मृत" डिस्क आकाशगंगा का रहस्य',
    subtitleEn: '3x More Massive than Milky Way, Spinning 2x Faster, Stopped Star Birth Early',
    subtitleHi: 'खगोलविदों की पुरानी धारणा को बदला कि शुरुआती मृत आकाशगंगाएं केवल अंडाकार होती हैं',
    chapter: 3,
    distanceLightYears: '10.5 Billion Light-Years (Seen when universe was a few billion years old)',
    lookbackTime: '10.5 Billion Years Ago',
    visualTheme: 'spiral',
    keyStats: [
      { label: 'Mass', value: '3x Massive than Milky Way' },
      { label: 'Size', value: 'Half the diameter of Milky Way' },
      { label: 'Rotation Speed', value: 'More than 2x faster than Milky Way' },
      { label: 'Mystery', value: 'Why did star formation stop in a flat disk?' }
    ],
    summaryHi: 'हबल ने गुरुत्वाकर्षण लेंस की सहायता से MACS 2129-1 नामक आकाशगंगा की खोज की, जो मंदाकिनी से 3 गुना भारी और 2 गुना तेज गति से घूम रही है, परंतु इसने अत्यधिक प्रारंभिक काल में ही नए तारे बनाना बंद कर दिया था। इसने वैज्ञानिकों को आकाशगंगा विकास के मॉडलों पर पुनर्विचार करने को विवश किया।',
    summaryEn: 'Magnified by cluster MACS J2129-0741, Hubble revealed a compact, fast-spinning disk galaxy that had already halted all star formation when the universe was only a few billion years old.',
    deepExplanationHi: 'पहले माना जाता था कि प्रारंभिक ब्रह्मांड में जो आकाशगंगाएं शांत (Dead) हुईं, वे टकराव के कारण अंडाकार (Elliptical) बन चुकी थीं। परंतु MACS 2129-1 एक चपटी डिस्क है जो तेजी से घूम रही है। इससे सिद्ध हुआ कि डिस्क आकाशगंगाएं बिना टकराए भी अपने तारे बनाने की क्षमता खो सकती हैं।',
    deepExplanationEn: 'Reconstructing the gravitationally lensed source revealed a compact disk that challenges existing theories about how massive galaxies exhaust or expel their gas supply.',
    keyTakeaway: 'Early massive galaxies could shut off star formation while still retaining their ordered disk rotation.',
    quote: {
      text: 'Perhaps we have been blind to the fact that early ‘dead’ galaxies could in fact be disks.',
      author: 'Sune Toft',
      affiliation: 'Niels Bohr Institute, University of Copenhagen'
    },
    scientificTags: ['MACS 2129-1', 'Dead Disk Galaxy', 'Quenched Galaxies', 'VLT Spectroscopy']
  },
  {
    id: 'brightest-infrared-galaxies',
    titleEn: 'The Universe’s Brightest Infrared Galaxies',
    titleHi: 'ब्रह्मांड की सबसे चमकदार अवरक्त (Infrared) आकाशगंगाएं',
    subtitleEn: 'Shining with the Brilliance of 10 to 100 Trillion Suns Enshrouded in Dust',
    subtitleHi: 'मंदाकिनी की तुलना में 5,000 से 10,000 गुना अधिक तीव्र गति से तारे पैदा कर रही हैं',
    chapter: 3,
    distanceLightYears: '8 to 11.5 Billion Light-Years Away',
    lookbackTime: '8 to 11.5 Billion Years (Cosmic Noon)',
    visualTheme: 'infrared',
    keyStats: [
      { label: 'Luminosity', value: '10 Trillion to 100 Trillion Suns' },
      { label: 'Star Formation Rate', value: '5,000x to 10,000x faster than Milky Way' },
      { label: 'Known Population', value: 'Only a few dozen exist across cosmos' },
      { label: 'Appearance', value: 'Invisible in visible light; dazzling in infrared' }
    ],
    summaryHi: 'हबल और ग्रेविटेशनल लेंसिंग ने 8 से 11.5 अरब वर्ष पुरानी ऐसी दुर्लभ आकाशगंगाओं की तस्वीरें लीं जो धूल के पीछे छिपी हैं और 10 लाख करोड़ से 100 लाख करोड़ सूर्यों की प्रचंड चमक से इन्फ्रारेड तरंगों में चमक रही हैं। ये मंदाकिनी से 10,000 गुना तेजी से तारे बना रही हैं।',
    summaryEn: 'Hubble imaged hyper-luminous infrared galaxies shining with the fury of up to 100 trillion suns, churning out thousands of stars per year during the peak era of cosmic star production.',
    deepExplanationHi: 'दृश्य प्रकाश में ये आकाशगंगाएं घनी धूल के कारण लगभग अदृश्य हैं, लेकिन इन्फ्रारेड में इनकी चमक ब्रह्मांड के सबसे शक्तिशाली प्रकाशस्तंभों जैसी है। वैज्ञानिक खोज कर रहे हैं कि क्या यह तीव्र चमक आकाशगंगाओं के भयानक टकराव से है या बाहरी ठंडी गैस की मूसलाधार बारिश से।',
    deepExplanationEn: 'Gravitational lensing stretches these ultra-luminous infrared beasts into rings and arcs, allowing Hubble’s high resolution to dissect the engines driving their unprecedented star formation rates.',
    keyTakeaway: 'At the peak of cosmic history ("Cosmic Noon"), dust-shrouded monster galaxies forged stellar populations at rates thousands of times greater than modern galaxies.',
    quote: {
      text: 'We want to understand what’s powering these monsters, and gravitational lensing allows us to study them in greater detail.',
      author: 'James Lowenthal',
      affiliation: 'Smith College'
    },
    scientificTags: ['ULIRGs', 'Cosmic Noon', 'Infrared Astronomy', 'Hyper-Star Formation']
  },
  {
    id: 'spt0615-jd-stretched-arc',
    titleEn: 'SPT0615-JD: Stretched Embryonic Arc from 500 Million Years After Big Bang',
    titleHi: 'SPT0615-JD: बिग बैंग के मात्र 50 करोड़ वर्ष बाद की तनी हुई चाप आकाशगंगा',
    subtitleEn: '13.3 Billion Light-Years Distant, Half the Size of Small Magellanic Cloud',
    subtitleHi: 'प्रारंभिक ब्रह्मांड की पहली आकाशगंगाओं का आकार और द्रव्यमान मापने का सुनहरा अवसर',
    chapter: 3,
    distanceLightYears: '13.3 Billion Light-Years Away',
    lookbackTime: '13.3 Billion Years Ago (Universe at ~3.5% current age)',
    visualTheme: 'lens',
    keyStats: [
      { label: 'Distance', value: '13.3 Billion Light-Years' },
      { label: 'Galaxy Size', value: '< 2,500 Light-Years across' },
      { label: 'Mass', value: '< 3 Billion Solar Masses (1/100th of Milky Way)' },
      { label: 'Geometry', value: 'Stretched into extended arc by gravitational lens' }
    ],
    summaryHi: 'हबल और स्पिट्ज़र टेलीस्कोप ने 13.3 अरब प्रकाश वर्ष दूर एक भ्रूणीय आकाशगंगा SPT0615-JD खोजी जो उस समय की है जब ब्रह्मांड मात्र 50 करोड़ वर्ष का था। गुरुत्वाकर्षण लेंस ने इसे एक लंबी लाल चाप (Arc) में तान दिया, जिससे इसके आकार का पहली बार सटीक मापन संभव हुआ।',
    summaryEn: 'Hubble and Spitzer teamed up with gravitational lensing to resolve SPT0615-JD, an infant galaxy seen when the universe was only 500 million years old, stretched into an extended arc.',
    deepExplanationHi: 'इस काल की अधिकांश आकाशगंगाएं केवल छोटे लाल बिंदु जैसी दिखती हैं, लेकिन इस लेंसिंग चाप के कारण वैज्ञानिक जान पाए कि यह मात्र 2,500 प्रकाश वर्ष चौड़ी (स्मॉल मैगेलैनिक क्लाउड से भी आधी) थी और इसका द्रव्यमान हमारे सूर्य से केवल 3 अरब गुना था।',
    deepExplanationEn: 'This embryonic specimen offers a unique window into the physical dimensions and stellar populations of the first generation of galaxies that reionized the cosmos.',
    keyTakeaway: 'The first galaxies were tiny, lightweight building blocks that gradually coalesced over billions of years into mature spiral galaxies.',
    quote: {
      text: 'This galaxy offers the unique opportunity for resolving stellar populations in the very early universe.',
      author: 'Brett Salmon',
      affiliation: 'Space Telescope Science Institute'
    },
    scientificTags: ['SPT0615-JD', 'Primordial Galaxy', 'Cosmic Dawn', 'Spitzer Joint Observation']
  },
  {
    id: 'gn-z11-farthest-record',
    titleEn: 'GN-z11: The Cosmic Frontier Distance Record (13.4 Billion Light-Years)',
    titleHi: 'GN-z11: हबल द्वारा देखी गई ब्रह्मांड की सबसे सुदूरतम शिशु आकाशगंगा',
    subtitleEn: 'Redshift z=11.1 • Seen When the Universe Was Only 3% of Its Current Age',
    subtitleHi: 'मंदाकिनी से 25 गुना छोटी परंतु 20 गुना तेजी से प्रचंड नीले तारों का निर्माण कर रही है',
    chapter: 3,
    distanceLightYears: '13.4 Billion Light-Years (Proper distance now ~32 Billion ly)',
    lookbackTime: '13.4 Billion Years Ago (400M yrs after Big Bang, Redshift z=11.1)',
    visualTheme: 'deep-red',
    keyStats: [
      { label: 'Redshift (z)', value: 'z = 11.1 (Spectroscopically Confirmed)' },
      { label: 'Universe Age at Emission', value: '~400 Million Years (3% of current age)' },
      { label: 'Size', value: '25x Smaller than Milky Way' },
      { label: 'Stellar Mass', value: '1% of Milky Way' },
      { label: 'Star Formation Rate', value: '20x faster than Milky Way today' }
    ],
    summaryHi: 'हबल टेलीस्कोप द्वारा देखा गया अब तक का सबसे दूरस्थ पिंड GN-z11 है, जो 13.4 अरब प्रकाश वर्ष दूर स्थित है (जब ब्रह्मांड अपनी वर्तमान आयु का केवल 3% था)। ब्रह्मांड के विस्तार के कारण इसका नीला प्रकाश लाल (Redshift z=11.1) हो चुका है।',
    summaryEn: 'GN-z11 represents the outer boundary of Hubble’s vision: an infant galaxy existing just 400 million years after the Big Bang, blazing with brilliant star formation 20 times faster than the Milky Way today.',
    deepExplanationHi: 'उर्स मेजर तारामंडल में खोजी गई GN-z11 हमारे वैज्ञानिक मॉडलों को चुनौती देती है क्योंकि इतने आरंभिक काल में इतनी विशाल और चमकदार आकाशगंगा की उम्मीद नहीं थी। हबल के ग्रिज्म स्पेक्ट्रोस्कोपी द्वारा इसकी सटीक दूरी मापी गई। यह रिकॉर्ड हबल के जीवनकाल का सर्वोच्च शिखर रहा।',
    deepExplanationEn: 'Spectroscopic confirmation of redshift 11.1 pushed Hubble to its absolute optical limits. Up close it would blaze with ferocious ultraviolet light from hot young stars, but cosmic expansion stretched its light into the near-infrared spectrum.',
    keyTakeaway: 'GN-z11 proves that massive galaxy assembly and vigorous star formation ignited far earlier in cosmic history than theorists originally believed.',
    quote: {
      text: 'We’ve taken a major step back in time, beyond what we’d ever expected to be able to do with Hubble.',
      author: 'Pascal Oesch',
      affiliation: 'Yale University'
    },
    scientificTags: ['GN-z11', 'Redshift 11.1', 'Cosmic Distance Record', 'GOODS Survey', 'First Stars']
  },
  {
    id: 'multi-wavelength-astronomy-summary',
    titleEn: 'Multi-Wavelength Cosmic Anthology: Hubble, Chandra, Spitzer & Webb',
    titleHi: 'बहु-तरंगदैर्घ्य ब्रह्मांडीय दर्शन: हबल, चंद्रा एक्स-रे, स्पिट्ज़र व जेम्स वेब',
    subtitleEn: 'M101 Pinwheel & NGC 2623 in Visible, Infrared, X-Ray and Beyond',
    subtitleHi: 'आकाशगंगाओं का जन्म से परिपक्वता तक का संपूर्ण ब्रह्मांडीय पारिवारिक एलबम',
    chapter: 0,
    distanceLightYears: 'Spans from Solar Neighborhood to Cosmic Horizon',
    lookbackTime: '13.8 Billion Years of Galactic Evolution',
    visualTheme: 'telescope',
    keyStats: [
      { label: 'Hubble Primary Mirror', value: '94.5 inches (2.4m) ultra-smooth' },
      { label: 'Detection Sensitivity', value: '31st Magnitude (10 Billion x fainter than human eye)' },
      { label: 'Wavelength Coverage', value: 'Ultraviolet (UV), Visible, Near-Infrared (NIR)' },
      { label: 'Servicing Missions', value: '5 Space Shuttle Missions (1993-2009)' }
    ],
    summaryHi: 'जिस प्रकार एक मां अपने बच्चे के जन्म से वयस्क होने तक का फोटो एलबम रखती है, हबल ने ब्रह्मांड के 13.8 अरब वर्षों के इतिहास में आकाशगंगाओं के जन्म, बचपन, टकराव और परिपक्वता का संपूर्ण सजीव संकलन तैयार किया है।',
    summaryEn: 'Like a mother’s photo collection chronicling a child growing from birth to adulthood, Hubble captures the evolving life cycle of galaxies across the full expanse of cosmic space and time.',
    deepExplanationHi: 'जब हम पिनव्हील आकाशगंगा (M101) या टकराती हुई NGC 2623 को हबल (दृश्य प्रकाश), स्पिट्ज़र (अवरक्त) और चंद्रा (एक्स-रे) में देखते हैं, तो तारों का जन्म, गर्म गैस और ब्लैक होल की पूरी भौतिकी स्पष्ट हो जाती है। यह विरासत अब जेम्स वेब स्पेस टेलीस्कोप (JWST) के साथ मिलकर और अधिक गहराई में जारी है।',
    deepExplanationEn: 'By revealing that early galaxies were small and clumpy, tracing how mergers build giant spirals, and measuring dark energy and cosmic expansion, Hubble transformed astronomy forever.',
    keyTakeaway: 'Galaxies are living, evolving cosmic islands whose gas, dust, stars, and black holes continuously chronicle the story of the universe.',
    scientificTags: ['Multi-Wavelength', 'Chandra X-Ray', 'Spitzer IR', 'JWST', 'Hubble Legacy']
  }
];
