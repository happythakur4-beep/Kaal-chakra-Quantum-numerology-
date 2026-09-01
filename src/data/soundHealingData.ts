export interface TibetanBowlData {
  id: string;
  name: string;
  hindiName: string;
  note: string;
  freq: number;
  chakra: string;
  metal: string;
  planet: string;
  color: string;
  healingTarget: string;
  description: string;
}

export interface SoundTherapyCategory {
  id: string;
  title: string;
  hindiTitle: string;
  subtitle: string;
  iconName: string;
  color: string;
  description: string;
}

export interface BuddhaHealingPractice {
  id: string;
  title: string;
  tibetanName: string;
  hindiTitle: string;
  tradition: string;
  instrument: string;
  keyFrequencies: number[];
  mantraText?: string;
  mantraTibetan?: string;
  mantraMeaning?: string;
  description: string;
  howBuddhasUseIt: string[];
  physiologicalEffect: string;
  mudra?: string;
  visualization: string;
}

export const TIBETAN_7_CHAKRA_BOWLS: TibetanBowlData[] = [
  {
    id: 'bowl-root',
    name: 'Root Chakra Tibetan Bowl',
    hindiName: 'मूलाधार तिब्बती कटोरा',
    note: 'C (Root)',
    freq: 256,
    chakra: 'Muladhara • Root',
    metal: 'Lead (Saturn) & Pure Copper',
    planet: 'Saturn (शनि)',
    color: '#ef4444',
    healingTarget: 'Skeletal integrity, adrenal fatigue, deep fear release, physical vitality',
    description: 'Deep grounding resonance that anchors prana in the perineum, stabilizing the central nervous system and dissolving chronic survival anxiety.'
  },
  {
    id: 'bowl-sacral',
    name: 'Sacral Chakra Tibetan Bowl',
    hindiName: 'स्वाधिष्ठान तिब्बती कटोरा',
    note: 'D (Sacral)',
    freq: 288,
    chakra: 'Svadhisthana • Sacral',
    metal: 'Tin (Jupiter) & Bronze',
    planet: 'Jupiter (गुरु)',
    color: '#f97316',
    healingTarget: 'Lymphatic flow, reproductive health, emotional trauma, creative blockages',
    description: 'Fluid, undulating vibrational waves that release stagnant emotional deposits in the lower abdomen and restore creative life force.'
  },
  {
    id: 'bowl-solar',
    name: 'Solar Plexus Tibetan Bowl',
    hindiName: 'मणिपूर तिब्बती कटोरा',
    note: 'E (Solar)',
    freq: 324,
    chakra: 'Manipura • Solar Plexus',
    metal: 'Iron (Mars) & Gold',
    planet: 'Mars (मंगल)',
    color: '#eab308',
    healingTarget: 'Digestive fire (Agni), liver metabolism, personal willpower, metabolic balance',
    description: 'Fiery harmonic center that stimulates the enteric nervous system (gut-brain axis), boosting mitochondrial ATP and inner clarity.'
  },
  {
    id: 'bowl-heart',
    name: 'Heart Chakra Tibetan Bowl',
    hindiName: 'अनाहत तिब्बती कटोरा',
    note: 'F (Heart)',
    freq: 341.3,
    chakra: 'Anahata • Heart',
    metal: 'Copper (Venus) & Silver',
    planet: 'Venus (शुक्र)',
    color: '#10b981',
    healingTarget: 'Cardiovascular coherence, thymus gland immunity, grief dissolution, compassion',
    description: 'The central harmonic bridge connecting lower physical and upper spiritual chakras, generating Heart-Rate Variability (HRV) coherence.'
  },
  {
    id: 'bowl-throat',
    name: 'Throat Chakra Tibetan Bowl',
    hindiName: 'विशुद्ध तिब्बती कटोरा',
    note: 'G (Throat)',
    freq: 384,
    chakra: 'Vishuddha • Throat',
    metal: 'Mercury & Brass',
    planet: 'Mercury (बुध)',
    color: '#06b6d4',
    healingTarget: 'Thyroid regulation, vocal cords, nervous communication, authentic expression',
    description: 'Etheric vibrational tone that clears constricted energy in the neck and cervical spine, opening clear spiritual expression.'
  },
  {
    id: 'bowl-thirdeye',
    name: 'Third Eye Tibetan Bowl',
    hindiName: 'आज्ञा तिब्बती कटोरा',
    note: 'A (Third Eye)',
    freq: 432,
    chakra: 'Ajna • Third Eye',
    metal: 'Silver (Moon) & Electrum',
    planet: 'Moon (चन्द्र)',
    color: '#6366f1',
    healingTarget: 'Pineal gland activation, circadian rhythm, intuitive clarity, headache relief',
    description: 'Pure 432Hz universal harmonic that harmonizes the cerebral hemispheres, stimulating DMT/melatonin synthesis in the epithalamus.'
  },
  {
    id: 'bowl-crown',
    name: 'Crown Chakra Tibetan Bowl',
    hindiName: 'सहस्रार तिब्बती कटोरा',
    note: 'B (Crown)',
    freq: 480,
    chakra: 'Sahasrara • Crown',
    metal: 'Pure Gold (Sun)',
    planet: 'Sun (सूर्य)',
    color: '#a855f7',
    healingTarget: 'Cerebral cortex, higher consciousness, unity awareness, deep peace',
    description: 'Ultra-pure transcendent frequency that connects individual jiva to cosmic consciousness, inducing spontaneous Samadhi and brainwave entrainment.'
  }
];

export const BUDDHA_SOUND_PRACTICES: BuddhaHealingPractice[] = [
  {
    id: 'medicine-buddha',
    title: 'Medicine Buddha (Bhaisajyaguru) Healing Mantra',
    tibetanName: 'སངས་རྒྱས་སྨན་བླ། • Sangye Menla',
    hindiTitle: 'भैषज्यगुरु बुद्ध महा आरोग्य मंत्र',
    tradition: 'Vajrayana Buddhism & Himalayan Tantra',
    instrument: 'Tibetan 7-Metal Singing Bowls + Low Throat Drone + Keisu Bell',
    keyFrequencies: [528, 639, 852, 108],
    mantraText: 'TADYATHA OM BHEKHANDZYE BHEKHANDZYE MAHA BHEKHANDZYE RADZA SAMUDGATE SVAHA',
    mantraTibetan: 'ཏདྱ་ཐཱ། ཨོཾ་བྷཻ་ཥ་ཛྱེ་བྷཻ་ཥ་ཛྱེ་མ་ཧཱ་བྷཻ་ཥ་ཛྱེ་རཱ་ཛཱ་ས་མུདྒ་ཏེ་སྭཱ་ཧཱ།',
    mantraMeaning: 'May the many beings who are sick quickly be freed from all disease and negative emotional karmas by the supreme king of physicians.',
    description: 'The supreme sonic healing practice in Buddhism. The vibrational resonance purifies the 3 Root Poisons (Greed/Attachment, Hatred/Aversion, Ignorance/Delusion) that according to Tibetan medicine (Sowa Rigpa) form the genesis of all 84,000 somatic illnesses.',
    howBuddhasUseIt: [
      'Monastic Lamas chant this mantra in deep harmonic overtones while focusing healing prana into energized water and medicinal herbs.',
      'Sound vibrations stimulate cellular DNA repair while clearing subconscious karmic disease imprints.',
      'Chanted in sets of 7, 21, or 108 repetitions with blue lapis lazuli visualization.'
    ],
    physiologicalEffect: 'Vagus nerve stimulation, reduction of systemic inflammation markers (CRP), activation of endogenous cellular regeneration pathways.',
    mudra: 'Medicine-Granting Mudra (Varada Mudra with Myrobalan plant stem held in right hand)',
    visualization: 'Visualize radiant Lapis Lazuli Blue nectar streaming from the heart of the Medicine Buddha, entering your crown and dissolving all tumors, pathogens, and pain into luminous light.'
  },
  {
    id: 'om-mani-padme-hum',
    title: 'Avalokiteshvara 6-Syllable Resonance (Chenrezig)',
    tibetanName: 'ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ།',
    hindiTitle: 'ॐ मणि पद्मे हूँ • षडाक्षरी करुणा मंत्र',
    tradition: 'Universal Mahayana & Vajrayana Buddhism',
    instrument: 'Tibetan Tingsha Cymbals & Harmonic Singing Bowls',
    keyFrequencies: [396, 417, 528, 639, 741, 963],
    mantraText: 'OM MANI PADME HUM',
    mantraTibetan: 'ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ།',
    mantraMeaning: 'The Jewel is in the Lotus. The indivisibility of pure method (compassion) and profound wisdom (emptiness).',
    description: 'Each of the 6 sacred syllables emits a specific sonic wavelength designed by enlightened masters to close the doors of the 6 Samsaric realms of suffering and purify the 6 afflictive emotions.',
    howBuddhasUseIt: [
      'OM (White): Purifies Pride and ego-fixation (Deva realm)',
      'MA (Green): Purifies Jealousy and rivalry (Asura realm)',
      'NI (Yellow): Purifies Passion and desire (Human realm)',
      'PAD (Blue): Purifies Ignorance and animalistic stupor (Animal realm)',
      'ME (Red): Purifies Greed, craving and insatiable hunger (Preta realm)',
      'HUM (Black/Blue): Purifies Hatred, anger and aggression (Naraka realm)'
    ],
    physiologicalEffect: 'Induces global hemispheric synchronization (Inter-hemispheric coherence) in the EEG 8-12Hz Alpha zone, releasing chronic psychological resistance.',
    visualization: 'See 6 rainbow-colored laser spheres rotating around your heart lotus, incinerating emotional knots.'
  },
  {
    id: 'tingsha-cymbals',
    title: 'Tibetan Tingsha (तिंगशा) Spatial & Auric Reset',
    tibetanName: 'ཏིང་ཤགས། • Ting-Shags',
    hindiTitle: 'तिब्बती तिंगशा ध्वनि शुद्धि',
    tradition: 'Tibetan Monastic Rituals & Bardo Guidance',
    instrument: 'Matched High-Pitch Bronze Cymbals (2400Hz - 3200Hz)',
    keyFrequencies: [2640, 2643.8, 5280],
    description: 'Hand-crafted paired bronze discs connected by a leather strap. When gently struck together, they produce an exceptionally pure, lingering high-frequency chime with a natural 3.8Hz Theta binaural beat.',
    howBuddhasUseIt: [
      'Used at the beginning and end of Buddhist meditation periods to cut through runaway thoughts and ground the mind in the present moment.',
      'Clears stagnant energetic residue from meditation spaces, biofields, and hospital rooms.',
      'Acts as an acoustic acoustic anchor for spirits and transition states during the Bardo.'
    ],
    physiologicalEffect: 'Instant auditory cortex sensory gating reset. Shuts off rumination loops in the brain’s Default Mode Network (DMN).',
    visualization: 'Picture a sphere of diamond-hard crystal clarity expanding 10 meters around your body, instantly evaporating mental chatter.'
  },
  {
    id: 'sacred-gong-bath',
    title: 'Sacred Himalayan Gong & Sonic Shunya (Emptiness)',
    tibetanName: 'གཡང་དྲུང་རོལ་མོ།',
    hindiTitle: 'महागोंग शून्य ध्वनि स्नान',
    tradition: 'Zen & Vajrayana Sound Immersion',
    instrument: 'Large Hand-Hammered Wind Gong & Tam-Tam',
    keyFrequencies: [65, 130, 260, 520],
    description: 'The Gong is the most resonant acoustic instrument known to sacred science. Its multi-octave wash creates "Sonic Shunya" (the experience of vibrational Emptiness), where the ego loses its rigid boundaries.',
    howBuddhasUseIt: [
      'Monks use the expanding gong wave to experience the dissolution of form into empty vibration (Rupa is Shunyata).',
      'The massive acoustic pressure wave washes through every fluid cell in the human body, dislodging deep subconscious trauma.',
      'Transports practitioners straight from ordinary beta consciousness into deep theta/delta dreamless trance.'
    ],
    physiologicalEffect: 'Cellular acoustic micro-massage, stimulating lymphatic drainage, down-regulating the sympathetic nervous system.',
    visualization: 'Feel your body dissolve into an infinite ocean of golden acoustic ripples with no beginning and no end.'
  },
  {
    id: 'heart-sutra-chant',
    title: 'Heart Sutra Transcendent Mantra (Prajnaparamita)',
    tibetanName: 'ཤེས་རབ་སྙིང་པོ།',
    hindiTitle: 'प्रज्ञापारमिता महामंत्र (हृदय सूत्र)',
    tradition: 'Zen, Chan & Mahayana Buddhism',
    instrument: 'Zen Mokugyo (Wooden Fish) + Rin Gong + Monotone Chanting',
    keyFrequencies: [432, 864, 108],
    mantraText: 'GATE GATE PARAGATE PARASAMGATE BODHI SVAHA',
    mantraTibetan: 'གཱ་ཏེ་གཱ་ཏེ་པཱ་ར་གཱ་ཏེ་པཱ་ར་སཾ་གཱ་ཏེ་བོ་དྷི་སྭཱ་ཧཱ།',
    mantraMeaning: 'Gone, gone, gone beyond, fully gone to the other shore of enlightenment, Hail!',
    description: 'The core distillation of the Buddha’s 84,000 teachings. The mantra sound formula dissolves existential panic, fear of death, and attachment to illusory physical limitations.',
    howBuddhasUseIt: [
      'Chanted in unison at dawn and dusk across Zen and Tibetan monasteries to dissolve cognitive dualism.',
      'Used by Buddhist healers when sitting with dying or sick individuals to replace fear with fearless transcendent light.'
    ],
    physiologicalEffect: 'Normalizes cerebral blood perfusion and balances the autonomic nervous system through slow, rhythmic 0.1Hz coherent respiration.',
    visualization: 'Visualize all solid walls, physical blockages, and fearful concepts vanishing like morning mist under the sun.'
  },
  {
    id: 'shakuhachi-suizen',
    title: 'Shakuhachi Bamboo Flute "Blowing Zen" (Suizen)',
    tibetanName: 'གླིང་བུ། • Suizen',
    hindiTitle: 'सुइज़ेन • बाँसुरी प्राणायाम ध्यान',
    tradition: 'Fuke Zen Monks (Komuso) of Japan',
    instrument: '5-Hole Japanese Madake Bamboo Flute (Shakuhachi)',
    keyFrequencies: [324, 432, 648],
    description: 'Suizen ("Blowing Zen") is the practice of playing a single continuous tone on a bamboo flute as an act of non-dual meditation. It is not music; it is breath attaining enlightenment.',
    howBuddhasUseIt: [
      'Zen monks use the varying breath velocity and microtonal pitch bends (Meri-Kari) to observe the rising and falling of sensations without clinging.',
      'Trains supreme diaphragmatic breath mastery and instant mental quietude (Mu).'
    ],
    physiologicalEffect: 'Triggers deep parasympathetic brake via prolonged exhale ratio (1:2 inhale-to-exhale ratio), maximizing nitric oxide absorption in the sinuses.',
    visualization: 'Observe each note like a single bamboo leaf floating effortlessly down a crystal mountain stream.'
  },
  {
    id: 'nada-yoga-sound',
    title: 'Nada Yoga: Meditation on the Inner Sacred Sound (Anahata Nada)',
    tibetanName: 'ནང་གི་སྒྲ། • Inner Bell',
    hindiTitle: 'नाद योग • अनहद नाद ध्यान',
    tradition: 'Vedic-Buddhist Union of Sound Yoga',
    instrument: 'Internal Auditory Focus + External 108Hz Tanpura/Singing Bowl',
    keyFrequencies: [108, 216, 432],
    description: 'The ancient practice of tuning inward to listen to the "Unstruck Sound" (Anahata Nada) resonating inside the auditory nerve and crown center without any physical instrument.',
    howBuddhasUseIt: [
      'Practitioners sit in silence after sound bath sessions to listen to the 10 mystical inner sounds (bells, ocean, flute, thunder, honeybee hum).',
      'The inner sound acts as the ultimate tether that leads the mind directly into Nirvikalpa Samadhi.'
    ],
    physiologicalEffect: 'Profound down-regulation of sensory input, hyper-focus in the prefrontal cortex, induction of high-amplitude 40Hz Gamma brainwaves.',
    visualization: 'Listen beyond your physical ears into the center of the skull, locating the faint high-pitched golden hum of universal life energy.'
  }
];

export const ALL_SOUND_THERAPIES_DATA = {
  solfeggio: [
    { hz: 174, name: 'Pain Relief & Anesthetic', desc: 'Natural anesthetic. Eases somatic pain, releases organ tension, grounds vitality.', note: 'Foundation' },
    { hz: 285, name: 'Cellular & Tissue Regeneration', desc: 'Accelerates wound healing, restores cellular blueprint, reorganizes damaged tissue.', note: 'Regeneration' },
    { hz: 396, name: 'Liberation from Guilt & Fear', desc: 'Muladhara resonance. Dissolves subconscious defence mechanisms and survival anxiety.', note: 'Root Chakra' },
    { hz: 417, name: 'Undoing Trauma & DNA Reset', desc: 'Svadhisthana frequency. Clears past toxic emotional imprints from cellular memory.', note: 'Sacral Chakra' },
    { hz: 432, name: 'Natural Harmonic Tuning (Verdi)', desc: 'Universal golden ratio resonance. Promotes water molecular coherence, lowers blood pressure.', note: 'Cosmic Unity' },
    { hz: 528, name: 'DNA Repair & Miracle Transformation', desc: 'The golden Solfeggio frequency. Reprograms cellular epigenetic switches and activates love resonance.', note: 'Solar / Heart' },
    { hz: 639, name: 'Inter-Cellular & Relational Harmony', desc: 'Anahata heart frequency. Harmonizes endocrine communication, empathy, and deep relationships.', note: 'Heart Chakra' },
    { hz: 741, name: 'Cellular Cleanse & Detoxification', desc: 'Vishuddha cleansing tone. Dissolves electromagnetic toxins, viral loads, and heavy metals.', note: 'Throat Chakra' },
    { hz: 852, name: 'Third-Eye Awakening & Intuition', desc: 'Ajna frequency. Clears spiritual blindness, illuminates third-eye vision, removes brain fog.', note: 'Third Eye' },
    { hz: 963, name: 'Crown Transcendence & Light Infusion', desc: 'Sahasrara frequency. Directly awakens pineal bio-photons and cosmic connection.', note: 'Crown Chakra' }
  ],
  binauralWaves: [
    {
      type: 'delta',
      range: '0.5 – 4.0 Hz',
      name: 'Delta Brainwaves',
      hindiName: 'डेल्टा तरंगें (गहन कायाकल्प)',
      benefit: 'Deep Dreamless Sleep, Human Growth Hormone (HGH) release, Cellular Auto-Immune Reset, DNA repair.',
      bestFor: 'Chronic fatigue, insomnia, physical rehabilitation, organ regeneration'
    },
    {
      type: 'theta',
      range: '4.0 – 8.0 Hz',
      name: 'Theta Brainwaves (Buddhist Dhyana)',
      hindiName: 'थीटा तरंगें (समाधि एवं ध्यान)',
      benefit: 'Deep Buddhist Trance, Shunya experience, Access to Subconscious Memory, Lucid Dreaming, Emotional catharsis.',
      bestFor: 'Deep meditation, trauma resolution, spiritual epiphanies, creative hypnosis'
    },
    {
      type: 'alpha',
      range: '8.0 – 12.0 Hz',
      name: 'Alpha Brainwaves',
      hindiName: 'अल्फा तरंगें (शांत एकाग्रता)',
      benefit: 'Calm Alertness, Flow State, Stress elimination, Serotonin boost, Mind-Body Coherence.',
      bestFor: 'Mindfulness, reading, anxiety relief, emotional balancing'
    },
    {
      type: 'beta',
      range: '13.0 – 30.0 Hz',
      name: 'Beta Brainwaves',
      hindiName: 'बीटा तरंगें (तीक्ष्ण बुद्धि)',
      benefit: 'High-level Cognitive Processing, Logic, Analytical focus, Alert problem-solving.',
      bestFor: 'Studying, complex calculations, energetic motivation'
    },
    {
      type: 'gamma',
      range: '30.0 – 100.0 Hz',
      name: 'Gamma Brainwaves (Enlightenment State)',
      hindiName: 'गामा तरंगें (परमानंद एवं बोधि)',
      benefit: 'Peak Spiritual Epiphanies, Metta (Loving-Kindness) brain state, Unified cognitive binding, High neuroplasticity.',
      bestFor: 'Transcendental awareness, Tibetan master states, supreme clarity'
    }
  ],
  chakraBija: [
    { chakra: 'Root', bija: 'LAM (लं)', hz: 396, color: '#ef4444', element: 'Earth (पृथ्वी)', target: 'Bones, spine, colon, survival' },
    { chakra: 'Sacral', bija: 'VAM (वं)', hz: 417, color: '#f97316', element: 'Water (जल)', target: 'Kidneys, reproductive organs, lymphatic' },
    { chakra: 'Solar', bija: 'RAM (रं)', hz: 528, color: '#eab308', element: 'Fire (अग्नि)', target: 'Stomach, liver, pancreas, metabolism' },
    { chakra: 'Heart', bija: 'YAM (यं)', hz: 639, color: '#10b981', element: 'Air (वायु)', target: 'Heart, thymus, lungs, circulatory' },
    { chakra: 'Throat', bija: 'HAM (हं)', hz: 741, color: '#06b6d4', element: 'Space (आकाश)', target: 'Thyroid, vocal cords, neck, communication' },
    { chakra: 'Third Eye', bija: 'SHAM (शं)', hz: 852, color: '#6366f1', element: 'Light (प्रकाश)', target: 'Pineal, pituitary, brain hemispheres' },
    { chakra: 'Crown', bija: 'AUM / OM (ॐ)', hz: 963, color: '#a855f7', element: 'Consciousness (चेतना)', target: 'Cortex, biofield, infinite prana' }
  ],
  soundBathPresets: [
    {
      id: 'zen-monastery',
      title: 'Zen Mountain Monastery Sunrise',
      hindiTitle: 'हिमालयी ज़ेन मठ प्रभात',
      desc: 'Tibetan 432Hz Bowls + Temple Keisu Bell + Morning Mountain Rain',
      defaultLayers: { bowlFreq: 432, tingsha: true, chant: 'om-mani', thetaBeat: true, nature: 'rain' },
      recommendedTimeMinutes: 15
    },
    {
      id: 'medicine-buddha-temple',
      title: 'Medicine Buddha Cellular Sanctuary',
      hindiTitle: 'भैषज्यगुरु आरोग्य ध्वनि मंडप',
      desc: 'Medicine Buddha Mantra Chants + 528Hz DNA Solfeggio + Tibetan Singing Bowls',
      defaultLayers: { bowlFreq: 528, tingsha: true, chant: 'medicine-buddha', thetaBeat: true, nature: 'drone' },
      recommendedTimeMinutes: 20
    },
    {
      id: 'buddhist-shunya-gong',
      title: 'Sonic Shunya Gong Bath',
      hindiTitle: 'शून्य महानाद गोंग स्नान',
      desc: 'Low Sacred Wind Gong + Deep Theta 4.5Hz + Anahata Tibetan Bowl',
      defaultLayers: { bowlFreq: 341.3, tingsha: false, chant: 'heart-sutra', thetaBeat: true, nature: 'cosmic' },
      recommendedTimeMinutes: 30
    },
    {
      id: 'sleep-delta-recharge',
      title: 'Deep Sleep & Glymphatic 2.0Hz Reset',
      hindiTitle: 'गहन निद्रा एवं कोशिकीय पुनर्जनन',
      desc: 'Delta Brainwaves + 174Hz Pain Relief + 432Hz Ambient Tanpura',
      defaultLayers: { bowlFreq: 174, tingsha: false, chant: 'none', thetaBeat: false, deltaBeat: true, nature: 'stream' },
      recommendedTimeMinutes: 45
    }
  ]
};
