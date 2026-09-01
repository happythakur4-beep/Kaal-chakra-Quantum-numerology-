import { BrainNode3D, MemoryHypnosisProtocol, MemoryPalaceLociItem } from '../types';

export const BRAIN_NODES_3D: BrainNode3D[] = [
  {
    id: 'hippocampus',
    name: 'Hippocampus (CA1 / CA3 / Dentate Gyrus)',
    sanskritName: 'स्मृति पीठ (Smriti Peetha)',
    function: 'Episodic memory encoding, spatial navigation, and memory consolidation via theta oscillations (4-8 Hz).',
    clinicalSignificance: 'Where memories are indexed. Hypnotic reconsolidation destabilizes the protein matrix in CA1 to allow emotional rewriting.',
    position: [0.35, -0.15, 0.1],
    color: '#06b6d4', // Cyan
    lightningIntensity: 0.9,
    roleInMemory: 'storage'
  },
  {
    id: 'hippocampus_left',
    name: 'Left Hippocampus (Verbal & Narrative Memory)',
    sanskritName: 'वाक् स्मृति नाडी (Vak Smriti)',
    function: 'Verbal memory recall, chronological sequence mapping, and narrative coherence.',
    clinicalSignificance: 'Targeted during the NLP Rewind technique to reverse narrative playback and strip chronological emotional charge.',
    position: [-0.35, -0.15, 0.1],
    color: '#0ea5e9', // Sky blue
    lightningIntensity: 0.85,
    roleInMemory: 'storage'
  },
  {
    id: 'amygdala',
    name: 'Basolateral Amygdala (Emotional Fear Matrix)',
    sanskritName: 'भय चक्र / आवेग ग्रंथि (Bhaya Granthi)',
    function: 'Attaches terror, panic, trauma tags, and autonomic fight-or-flight triggers to sensory experiences.',
    clinicalSignificance: 'Hyperactive in PTSD and painful memories. Hypnotic suggestions depolarize amygdala synapses, decoupling emotional terror from factual memory.',
    position: [0.45, -0.3, -0.15],
    color: '#ef4444', // Red/Crimson
    lightningIntensity: 1.0,
    roleInMemory: 'emotional_tag'
  },
  {
    id: 'amygdala_left',
    name: 'Left Amygdala (Somatic Trauma Anchor)',
    sanskritName: 'शोक ग्रंथि (Shoka Granthi)',
    function: 'Somatic gut feelings, heart racing, and subconscious alarm triggers linked to past trauma.',
    clinicalSignificance: 'Soothed by hypnotic progressive somatic wave and bilateral theta lightning stimulation.',
    position: [-0.45, -0.3, -0.15],
    color: '#f43f5e', // Rose
    lightningIntensity: 0.95,
    roleInMemory: 'emotional_tag'
  },
  {
    id: 'dlpfc',
    name: 'Dorsolateral Prefrontal Cortex (DLPFC)',
    sanskritName: 'बुद्धि क्षेत्र / विवेक केंद्र (Viveka Kendra)',
    function: 'Executive control, conscious working memory, critical factor filter, and hypnotic trance regulation.',
    clinicalSignificance: 'Hypnosis gently quiets the critical factor in DLPFC, allowing direct therapeutic communication with subconscious networks.',
    position: [0.2, 0.5, 0.35],
    color: '#8b5cf6', // Violet
    lightningIntensity: 0.8,
    roleInMemory: 'executive_control'
  },
  {
    id: 'vmPFC',
    name: 'Ventromedial Prefrontal Cortex (vmPFC)',
    sanskritName: 'आत्म बोध नाडी (Atma Bodha)',
    function: 'Extinction learning, safety signaling, and emotional value updating.',
    clinicalSignificance: 'Sends inhibitory GABAergic signals to the amygdala to solidify permanent trauma extinction after hypnotic reconsolidation.',
    position: [0.0, 0.45, -0.2],
    color: '#10b981', // Emerald
    lightningIntensity: 0.85,
    roleInMemory: 'executive_control'
  },
  {
    id: 'temporal_cortex',
    name: 'Lateral Temporal Cortex (Semantic Repository)',
    sanskritName: 'ज्ञान कोश (Jnana Kosha)',
    function: 'Long-term semantic knowledge, conceptual networks, language lexicons, and general fact retention.',
    clinicalSignificance: 'Activated during Hypnotic Hypermnesia and Memory Palace exploration for super-retention.',
    position: [0.65, 0.05, 0.0],
    color: '#f59e0b', // Amber
    lightningIntensity: 0.75,
    roleInMemory: 'storage'
  },
  {
    id: 'acc',
    name: 'Anterior Cingulate Cortex (ACC)',
    sanskritName: 'चित्त समाधान (Chitta Samadhana)',
    function: 'Emotional pain processing, error monitoring, and hypnotic pain/distress modulation.',
    clinicalSignificance: 'Directly down-regulated during hypnotic gray-scale defusion, eliminating the visceral sting of humiliating or distressing memories.',
    position: [0.0, 0.25, 0.2],
    color: '#ec4899', // Pink
    lightningIntensity: 0.7,
    roleInMemory: 'relay'
  }
];

export const MEMORY_HYPNOSIS_PROTOCOLS: MemoryHypnosisProtocol[] = [
  {
    id: 'reconsolidation_lightning',
    title: 'Synaptic Reconsolidation & Amygdala Lightning Decoupling',
    sanskritTitle: 'संस्कार विच्छेदन एवं अमृत पुनर्गठन (Samskara Chedana)',
    category: 'trauma_reconsolidation',
    targetBrainArea: ['Basolateral Amygdala', 'Hippocampus (CA1)', 'Ventromedial PFC'],
    targetBrainwave: 'theta',
    binauralHz: 4.5,
    isochronicHz: 7.83,
    durationMinutes: 12,
    inductionType: 'elman_lightning',
    summary: 'Leverages the 4-to-6 hour neurobiological "labilization window" of activated memories. By evoking the memory briefly and flashing electric hypnotic counter-suggestions, the protein synthesis (PKM-zeta) holding the emotional charge is dissolved, leaving the factual memory intact without distress.',
    neurobiologicalMechanism: 'When a memory is recalled, NMDA receptors open and destabilize the synaptic scaffold. Administering somatic calm and double-dissociation during this window prevents re-storage of norepinephrine and corticotropin-releasing factors in the basolateral amygdala.',
    scientificReferences: [
      'Nader, K. et al. (Nature 2000) - Fear memories require protein synthesis in the amygdala for reconsolidation.',
      'Kindt, M. et al. (Nature Neuroscience 2009) - Beyond extinction: erasing human fear responses via reconsolidation disruption.',
      'Spiegel, D. (Lancet Psychiatry 2017) - Hypnotic modulation of default mode and salience networks in PTSD.'
    ],
    steps: [
      {
        phaseNumber: 1,
        phaseTitle: 'Electric Fixation & Eye-Lock Induction',
        durationSec: 120,
        scriptNarration: 'Look directly into the central neural focal point. Notice the microscopic electrical pulses dancing across the synapse. With every breath you inhale, your eyelids grow heavy as lead. As you exhale, allow all tension to discharge down through your body like static grounding into the earth. Three... two... one... eyes closing, sliding into deep hypnotic calm.',
        subconsciousAction: 'Bypasses the DLPFC critical factor through eye muscle fatigue and hypnotic fixation.',
        visualAnimationState: 'lightning_focus',
        lightningArcTargets: ['dlpfc', 'acc']
      },
      {
        phaseNumber: 2,
        phaseTitle: 'The 10-Percent Micro-Recall (Labilization)',
        durationSec: 90,
        scriptNarration: 'Bring the outline of that old memory into your awareness just for a brief fraction—not living inside it, but looking at a thumbnail snapshot behind three layers of bulletproof tinted glass. Just enough to illuminate the neural engram in the hippocampus. Notice where you feel any tension in the body... and now, freeze that image instantly.',
        subconsciousAction: 'Opens the reconsolidation window by activating the CA1/amygdala memory trace.',
        visualAnimationState: 'lightning_focus',
        lightningArcTargets: ['hippocampus', 'amygdala']
      },
      {
        phaseNumber: 3,
        phaseTitle: 'The Electric Arc Synaptic Severance',
        durationSec: 150,
        scriptNarration: 'Now visualize a radiant bolt of pure electric cyan and violet lightning leaping directly into the emotional connector between the memory and your nervous system. Watch the red emotional alarm wire SNAP and vaporize into harmless mist. The factual information remains, but the emotional charge discharges completely. Zap... dissolve... clear.',
        subconsciousAction: 'Inhibits basolateral amygdala hyper-arousal and activates vmPFC extinction pathways.',
        visualAnimationState: 'synaptic_sever',
        lightningArcTargets: ['amygdala', 'amygdala_left', 'vmPFC']
      },
      {
        phaseNumber: 4,
        phaseTitle: 'Liquid Gold Reconsolidation Seal',
        durationSec: 120,
        scriptNarration: 'Bathe the entire hippocampal memory bank in cool, restorative golden bio-photonic light. The synaptic receptors are now coated in deep peace, resilience, and wisdom. This event is now merely a neutral file in the library of your past—it holds zero power over your breath, your heart, or your future.',
        subconsciousAction: 'Re-stores the memory into long-term storage stripped of autonomic distress.',
        visualAnimationState: 'golden_consolidation',
        lightningArcTargets: ['hippocampus', 'temporal_cortex']
      }
    ],
    postHypnoticSuggestion: 'Whenever your mind wanders past that old event, it feels as distant, flat, and uninteresting as a black-and-white newspaper from twenty years ago.'
  },
  {
    id: 'nlp_rewind_theater',
    title: 'The Hypnotic NLP Rewind & Movie Theater Technique',
    sanskritTitle: 'दृश्य परिवर्तन एवं विपरीत प्रवाह (Drishya Parivartan)',
    category: 'bad_memory_extinction',
    targetBrainArea: ['Left Hippocampus', 'Visual Cortex (V1/V2)', 'Basolateral Amygdala'],
    targetBrainwave: 'theta',
    binauralHz: 5.0,
    isochronicHz: 10.0,
    durationMinutes: 15,
    inductionType: 'progressive_soma',
    summary: 'The world-renowned Fast Phobia Cure and Rewind Protocol developed by Richard Bandler and clinical psychiatrist David Muss. Utilizes double dissociation (sitting in a projection booth watching yourself watch a screen) and high-speed backward playback with upbeat cartoon audio to scramble the temporal narrative sequence in the brain.',
    neurobiologicalMechanism: 'The brain encodes trauma linearly with heavy sensory cues. Running the memory backwards at 500% speed destroys the conditional stimulus-response loop in the temporal lobes and resets the amygdala threat forecast.',
    scientificReferences: [
      'Muss, D. C. (British Journal of Clinical Psychology 1991) - A new technique for treating post-traumatic stress disorder.',
      'Guy, K. et al. (Mental Health Review Journal 2013) - The Rewind Technique for PTSD in clinical practice.'
    ],
    steps: [
      {
        phaseNumber: 1,
        phaseTitle: 'Double Dissociation in the Projection Booth',
        durationSec: 140,
        scriptNarration: 'Imagine you are floating up into a soundproof, safe, luxurious projection booth in an empty movie theater. Look through the glass window and see a version of yourself sitting comfortably in the middle row below. You are safe, protected, and completely detached. On the giant screen far ahead is a frozen black-and-white frame of a moment just BEFORE anything difficult occurred.',
        subconsciousAction: 'Establishes 3rd-person observer detachment to prevent re-traumatization.',
        visualAnimationState: 'gray_fade',
        lightningArcTargets: ['dlpfc', 'acc']
      },
      {
        phaseNumber: 2,
        phaseTitle: 'Black & White Forward Projection',
        durationSec: 100,
        scriptNarration: 'From your safe booth, watch the black-and-white movie play forward on the distant screen until a point AFTER everything was over and you were safe. Notice how flat and grainy it looks without color, like a dusty silent film. Freeze it on the final frame of safety.',
        subconsciousAction: 'Demonstrates to the subconscious that the event has a definitive safe ending.',
        visualAnimationState: 'gray_fade',
        lightningArcTargets: ['hippocampus_left', 'temporal_cortex']
      },
      {
        phaseNumber: 3,
        phaseTitle: 'The High-Speed Rewind Lightning Zip (Zzzzzip!)',
        durationSec: 120,
        scriptNarration: 'Now, jump into the movie itself on the screen and REWIND backwards at supersonic speed in full reverse! People walking backwards, words flying back into mouths, spilled water leaping back into the cup, with a ridiculous comedic circus melody playing at triple speed: ZZZZZIP! Right back to the safe beginning in 2 seconds flat! Let us repeat this 5 times in rapid succession: Forward black and white, REWIND super-fast!',
        subconsciousAction: 'Scrambles temporal synaptic sequencing in hippocampal CA3 neural loops.',
        visualAnimationState: 'rewind_reverse',
        lightningArcTargets: ['hippocampus', 'amygdala', 'temporal_cortex']
      },
      {
        phaseNumber: 4,
        phaseTitle: 'Ecological Future Pace Test',
        durationSec: 90,
        scriptNarration: 'Now try to bring up the old memory and notice how difficult it is to grasp. It slips away like trying to hold smoke. When you try to remember it, your brain instinctively plays the funny rewind song and you feel light, centered, and completely at ease.',
        subconsciousAction: 'Tests and verifies that autonomic arousal (galvanic skin response) is extinguished.',
        visualAnimationState: 'golden_consolidation',
        lightningArcTargets: ['vmPFC', 'amygdala']
      }
    ],
    postHypnoticSuggestion: 'Your mind has permanently broken the old loop. Trying to feel bad about this memory is like trying to turn on a light switch that has been completely disconnected.'
  },
  {
    id: 'submodality_dimmer',
    title: 'Submodality Dimmer & Gray-Scale Thermal Dissolution',
    sanskritTitle: 'छाया विसर्जन एवं रूप शमन (Chhaya Visarjan)',
    category: 'submodality_dimmer',
    targetBrainArea: ['Visual Cortex (V1)', 'Auditory Cortex (A1)', 'Anterior Cingulate Cortex'],
    targetBrainwave: 'alpha',
    binauralHz: 7.0,
    isochronicHz: 12.0,
    durationMinutes: 10,
    inductionType: 'elman_lightning',
    summary: 'Submodalities are the fine structural coding parameters (size, brightness, distance, volume, location) the brain uses to assign emotional significance to a memory. By manipulating these dials under hypnosis, the brain automatically strips the meaning and intensity from unwanted memories.',
    neurobiologicalMechanism: 'Altering sensory parameters reduces activation in the salience network (insula and dorsal ACC) and downshifts sympathetic nervous system tone.',
    scientificReferences: [
      'Bandler, R. & MacDonald, W. (1988) - An Insider’s Guide to Sub-Modalities.',
      'Kosslyn, S. M. et al. (Science 2000) - Neural foundations of imagery and perceptual submodalities.'
    ],
    submodalityInstructions: {
      colorShift: 'Turn color down to 0% (Grainy faded sepia / Charcoal grayscale)',
      distanceShift: 'Push memory 50 meters away into the horizon until it is a tiny postage stamp',
      sizeShift: 'Shrink dimensions from IMAX scale down to a matchbox',
      soundShift: 'Replace aggressive or sharp voices with a slow-motion helium cartoon voice',
      speedShift: 'Slow frame rate down to 1 frame every 10 seconds, then freeze completely'
    },
    steps: [
      {
        phaseNumber: 1,
        phaseTitle: 'Locating the Submodality Control Board',
        durationSec: 100,
        scriptNarration: 'Deep in your hypnotic control center, visualize a high-tech console with glowing dials: Brightness, Distance, Size, Color Saturation, Volume, and Location. Look at the image of the troubling memory sitting on your inner display.',
        subconsciousAction: 'Externalizes internal representation for cognitive manipulation.',
        visualAnimationState: 'lightning_focus',
        lightningArcTargets: ['dlpfc', 'acc']
      },
      {
        phaseNumber: 2,
        phaseTitle: 'Grayscale & Distance Lightning Push',
        durationSec: 140,
        scriptNarration: 'Reach out to the Brightness and Color dials. Turn them all the way down to zero. Watch all the vivid color drain out like dirty water from a sink, leaving only faded, pale gray dust. Now grab the Distance lever and PUSH it—10 meters... 50 meters... 100 meters away until it is the size of a coin.',
        subconsciousAction: 'Reduces neural gain in primary sensory cortices.',
        visualAnimationState: 'gray_fade',
        lightningArcTargets: ['temporal_cortex', 'acc']
      },
      {
        phaseNumber: 3,
        phaseTitle: 'Comic Audio Scramble & Deflation',
        durationSec: 120,
        scriptNarration: 'Hear any harsh voices or noises in that memory shrink into a squeaky cartoon helium pitch. Turn the master volume knob down until it is completely silent. Now, watch a blast of cool electric violet plasma incinerate the tiny gray postage stamp into fine stardust that blows away in the wind.',
        subconsciousAction: 'Extinguishes emotional valence and auditory trauma loop.',
        visualAnimationState: 'plasma_shield',
        lightningArcTargets: ['amygdala', 'temporal_cortex']
      }
    ],
    postHypnoticSuggestion: 'That old memory is now tiny, silent, gray, and distant. It has no more emotional power than a speck of dust on the horizon.'
  },
  {
    id: 'plasma_amnesia_eraser',
    title: 'Hypnotic Directed Amnesia & The Plasma Eraser',
    sanskritTitle: 'सम्मोहन विस्मृति एवं चित्त शुद्धि (Chitta Shuddhi)',
    category: 'directed_amnesia',
    targetBrainArea: ['Dorsolateral PFC', 'Hippocampus', 'Reticular Activating System'],
    targetBrainwave: 'delta',
    binauralHz: 3.5,
    isochronicHz: 4.0,
    durationMinutes: 14,
    inductionType: 'fractionation',
    summary: 'Clinical hypnotic amnesia protocol inspired by Dave Elman and Milton Erickson. Trains the subconscious mind to allow trivial, distressing, or rumination-inducing details to fade into benign amnesia—just as the numbers 100 to 1 fade away in deep trance.',
    neurobiologicalMechanism: 'Induces active inhibitory control over hippocampal retrieval through top-down signaling from the right dorsolateral prefrontal cortex (rDLPFC), mimicking the brain’s natural directed forgetting mechanism.',
    scientificReferences: [
      'Anderson, M. C. & Green, C. (Nature 2001) - Suppressing unwanted memories by executive control.',
      'Mendelsohn, A. et al. (Neuron 2008) - Creating false amnesia via posthypnotic suggestion: an fMRI study.'
    ],
    steps: [
      {
        phaseNumber: 1,
        phaseTitle: 'Somnambulistic Trance Fractionation',
        durationSec: 150,
        scriptNarration: 'Open your eyes, look at the electric node, close your eyes and drop ten times deeper. Each time you open and close, your mind releases all need to remember what doesn’t serve you. Like numbers written on a chalkboard on a windy beach, the waves are coming to wash them away.',
        subconsciousAction: 'Achieves deep somnambulism and suggests benign forgetting.',
        visualAnimationState: 'lightning_focus',
        lightningArcTargets: ['dlpfc', 'hippocampus']
      },
      {
        phaseNumber: 2,
        phaseTitle: 'The Plasma Chalkboard Eraser',
        durationSec: 180,
        scriptNarration: 'See all the tedious, painful, repetitive thoughts written in chalk on an old blackboard. Take the hypnotic plasma eraser in your hand. Wipe it across the board: 100... gone... 99... fading... 98... completely dissolved. Let the memory of that unpleasant detail vanish as easily as yesterday’s morning breath. You don’t need to remember it, and you can comfortably forget to remember.',
        subconsciousAction: 'Engages rDLPFC-mediated active inhibition of hippocampal memory traces.',
        visualAnimationState: 'plasma_shield',
        lightningArcTargets: ['hippocampus', 'hippocampus_left']
      },
      {
        phaseNumber: 3,
        phaseTitle: 'Sealing the Blank Slate with Serenity',
        durationSec: 120,
        scriptNarration: 'Where that useless memory once stood, there is now only fresh, clear, pristine space. A blank canvas ready for joy, success, and razor-sharp intellect.',
        subconsciousAction: 'Solidifies directed forgetting and releases cognitive bandwidth.',
        visualAnimationState: 'golden_consolidation',
        lightningArcTargets: ['dlpfc', 'vmPFC']
      }
    ],
    postHypnoticSuggestion: 'It is so easy to forget what you no longer need. The detail is gone, leaving only peaceful clarity in your mind.'
  },
  {
    id: 'hypnotic_hypermnesia',
    title: 'Hypnotic Hypermnesia (Deep Somnambulistic Recall)',
    sanskritTitle: 'महास्मृति जागरण एवं प्रज्ञा विकास (Maha Smriti Jagaran)',
    category: 'cognitive_hypermnesia',
    targetBrainArea: ['Hippocampus (Dentate Gyrus)', 'Temporal Lobes', 'Prefrontal Cortex'],
    targetBrainwave: 'theta',
    binauralHz: 4.8,
    isochronicHz: 8.0,
    durationMinutes: 15,
    inductionType: 'elman_lightning',
    summary: 'Hypnotic Hypermnesia unlocks heightened retrieval and photographic sensory recollection by accessing the deep Theta state (4-8 Hz), which mirrors the brainwave rhythm used by the hippocampus during original memory consolidation.',
    neurobiologicalMechanism: 'Theta-gamma phase-amplitude coupling between the hippocampus and neocortex is maximized, allowing access to subliminal sensory data encoded below conscious threshold.',
    scientificReferences: [
      'Staresina, B. P. et al. (Nature Neuroscience 2015) - Hierarchical nesting of slow oscillations, spindles and ripples in human memory consolidation.',
      'Erickson, M. H. (American Journal of Clinical Hypnosis 1965) - Deep hypnotic states and cognitive retrieval.'
    ],
    steps: [
      {
        phaseNumber: 1,
        phaseTitle: 'The Theta Frequency Brainwave Lock',
        durationSec: 130,
        scriptNarration: 'Allow your brainwaves to synchronize with the pulsing electric rhythm at 4.8 cycles per second. This is the exact frequency of theta—the language of the subconscious archive where every book you ever read, every word you ever heard, and every face you ever saw is recorded in perfect fidelity.',
        subconsciousAction: 'Synchronizes hippocampal theta oscillations for enhanced recall.',
        visualAnimationState: 'lightning_focus',
        lightningArcTargets: ['hippocampus', 'temporal_cortex']
      },
      {
        phaseNumber: 2,
        phaseTitle: 'The Crystal Neural Search Engine',
        durationSec: 160,
        scriptNarration: 'Visualize your mind as a hyper-advanced quantum library. Step up to the crystal terminal. Type in the concept, fact, study material, or memory you wish to retrieve. Watch electric lightning arcs illuminate the exact neural pathway across the temporal lobe. The information bubbles up effortlessly into your conscious mind with crystalline clarity.',
        subconsciousAction: 'Lowers retrieval threshold and activates associative semantic networks.',
        visualAnimationState: 'golden_consolidation',
        lightningArcTargets: ['temporal_cortex', 'dlpfc']
      },
      {
        phaseNumber: 3,
        phaseTitle: 'Locking the Instant Recall Anchor',
        durationSec: 110,
        scriptNarration: 'Touch the tip of your thumb to your index finger (Jnana Mudra). As you press them together, feel this surge of razor-sharp mental focus lock into your nervous system. Whenever you need to recall anything in an exam, meeting, or daily life, simply touch thumb and index finger together and take one deep breath: the answer flashes instantly into your mind.',
        subconsciousAction: 'Establishes a kinesthetic post-hypnotic anchor for immediate retrieval.',
        visualAnimationState: 'golden_consolidation',
        lightningArcTargets: ['dlpfc', 'hippocampus']
      }
    ],
    postHypnoticSuggestion: 'Your memory is vast, limitless, and instantly accessible. When you need a fact, it surfaces smoothly without effort or strain.'
  },
  {
    id: 'roman_memory_palace',
    title: 'The 3D Roman Memory Palace (Method of Loci)',
    sanskritTitle: 'स्थान स्मृति प्रासाद (Sthana Smriti Prasada)',
    category: 'memory_palace_loci',
    targetBrainArea: ['Hippocampus (Place Cells / Grid Cells)', 'Parietal Lobe', 'Visual Cortex'],
    targetBrainwave: 'alpha',
    binauralHz: 8.5,
    isochronicHz: 10.0,
    durationMinutes: 12,
    inductionType: 'progressive_soma',
    summary: 'The ancient Method of Loci used by Roman orators and modern World Memory Champions, amplified 10x through hypnotic visualization. Encodes abstract facts, numbers, languages, and study topics onto vivid spatial landmarks in an internal 3D architecture.',
    neurobiologicalMechanism: 'Harnesses place cells in the hippocampus and grid cells in the entorhinal cortex, converting dry semantic data into rich evolutionary spatial memories that never decay.',
    scientificReferences: [
      'Dresler, M. et al. (Neuron 2017) - Mnemonic training reshapes brain networks to support superior memory.',
      'Maguire, E. A. et al. (Nature Neuroscience 2003) - Routes to remembering: the brains behind superior memory.'
    ],
    steps: [
      {
        phaseNumber: 1,
        phaseTitle: 'Constructing the Crystal Palace Hallway',
        durationSec: 120,
        scriptNarration: 'Step through the grand marble archway into your private Roman Memory Palace. Notice the 5 distinct rooms along the illuminated corridor: Room 1 (The Golden Library), Room 2 (The Crystal Chamber), Room 3 (The Astronomy Tower), Room 4 (The Botanical Sanctuary), and Room 5 (The Grand Vault). Each room has pristine pedestals waiting to anchor your knowledge.',
        subconsciousAction: 'Constructs a high-dimensional spatial grid in the entorhinal cortex.',
        visualAnimationState: 'lightning_focus',
        lightningArcTargets: ['hippocampus', 'temporal_cortex']
      },
      {
        phaseNumber: 2,
        phaseTitle: 'Anchoring Vivid Mnemonic Lightning Glyphs',
        durationSec: 150,
        scriptNarration: 'Place your target concepts onto the pedestals as absurd, highly animated, vibrant objects radiating electric lightning. The stranger and more vivid the image, the more indelible it becomes. Walk past each pedestal, feeling the texture and hearing the sound of the anchor.',
        subconsciousAction: 'Pairs semantic items with episodic spatial and sensory anchors.',
        visualAnimationState: 'golden_consolidation',
        lightningArcTargets: ['temporal_cortex', 'dlpfc']
      },
      {
        phaseNumber: 3,
        phaseTitle: 'Bidirectional Navigation Drill',
        durationSec: 120,
        scriptNarration: 'Walk forward from Room 1 to 5—notice how instantly every memory triggers. Now walk backward from Room 5 to 1. The path is burned into your mind with electric certainty. This palace is permanently yours.',
        subconsciousAction: 'Tests bidirectional associative retrieval across hippocampal place fields.',
        visualAnimationState: 'golden_consolidation',
        lightningArcTargets: ['hippocampus', 'hippocampus_left']
      }
    ],
    postHypnoticSuggestion: 'Whenever you want to learn something new, you simply walk into your memory palace and place it on a pedestal. It stays there permanently.'
  },
  {
    id: 'ltp_synaptic_boost',
    title: 'Long-Term Potentiation (LTP) & BDNF Lightning Synthesis',
    sanskritTitle: 'दीर्घकालीन चेतना वृद्धि एवं मेधा शक्ति (Medha Shakti)',
    category: 'synaptic_ltp_boost',
    targetBrainArea: ['Dendritic Spines', 'CA3-CA1 Schaffer Collaterals', 'Prefrontal Cortex'],
    targetBrainwave: 'gamma',
    binauralHz: 40.0,
    isochronicHz: 40.0,
    durationMinutes: 10,
    inductionType: 'elman_lightning',
    summary: 'Stimulates neuroplasticity, Brain-Derived Neurotrophic Factor (BDNF), and Long-Term Potentiation (LTP) at the synaptic level using high-frequency 40Hz Gamma entrainment combined with hypnotic suggestions of cognitive agility.',
    neurobiologicalMechanism: '40Hz gamma entrainment facilitates synchronized microglial clearance of amyloid plaques, enhances acetylcholine synthesis, and increases dendritic spine density in neocortical layers.',
    scientificReferences: [
      'Iaccarino, H. F. et al. (Nature 2016) - Gamma frequency entrainment attenuates amyloid load and modifies microglia.',
      'Bliss, T. V. & Lomo, T. (J Physiol 1973) - Long-lasting potentiation of synaptic transmission.'
    ],
    steps: [
      {
        phaseNumber: 1,
        phaseTitle: '40 Hz Gamma Lightning Ignition',
        durationSec: 100,
        scriptNarration: 'Feel a high-speed, razor-clean pulse of 40Hz gamma energy sweeping through every neural network. This is the frequency of genius, peak problem-solving, and instant comprehension.',
        subconsciousAction: 'Drives neocortical gamma oscillations for rapid binding.',
        visualAnimationState: 'lightning_focus',
        lightningArcTargets: ['dlpfc', 'temporal_cortex']
      },
      {
        phaseNumber: 2,
        phaseTitle: 'Sprouting Dendritic Spines',
        durationSec: 140,
        scriptNarration: 'Visualize billions of microscopic neurons sending out fresh, vibrant dendritic branches. Every idea you absorb connects instantly to ten other ideas. Your brain becomes a lightning-fast superhighway of insight, synthesis, and retention.',
        subconsciousAction: 'Hypnotic priming of neuroplastic growth mindset and BDNF expression.',
        visualAnimationState: 'golden_consolidation',
        lightningArcTargets: ['hippocampus', 'dlpfc']
      }
    ],
    postHypnoticSuggestion: 'You absorb complex concepts in minutes that once took hours. Your mind connects the dots effortlessly.'
  },
  {
    id: 'eidetic_anchor',
    title: 'Photographic Visual Imprint & Somatic Kinesthetic Anchor',
    sanskritTitle: 'चित्र स्मृति एवं धारणा मुद्रा (Dharana Mudra)',
    category: 'exam_eidetic_recall',
    targetBrainArea: ['Occipital Cortex (V1/V4)', 'Fusiform Gyrus', 'Dorsolateral PFC'],
    targetBrainwave: 'alpha',
    binauralHz: 10.0,
    isochronicHz: 10.0,
    durationMinutes: 11,
    inductionType: 'progressive_soma',
    summary: 'Specially engineered for students, competitive exams (UPSC, Medical, Law), and professionals. Instills a photographic mental snapshot mechanism, clearing test anxiety and freezing while triggering rapid eidetic page retrieval.',
    neurobiologicalMechanism: 'Down-regulates cortisol-mediated prefrontal shutdown during stress while enhancing fusiform gyrus visual text recognition.',
    scientificReferences: [
      'Arnsten, A. F. (Nature Reviews Neuroscience 2009) - Stress signalling pathways that impair prefrontal cortex structure and function.',
      'Gruzelier, J. (Neuroscience & Biobehavioral Reviews 2002) - A review of operative mechanisms in neurofeedback and hypnotic training.'
    ],
    steps: [
      {
        phaseNumber: 1,
        phaseTitle: 'The Mental Camera Shutter Drill',
        durationSec: 120,
        scriptNarration: 'Close your eyes. Imagine your inner gaze has a diamond lens camera. When you look at any page, diagram, or formula, hear a crisp shutter click: SNAP. The entire layout, the headers, the colors, and the exact bullet points are captured instantly on your internal photographic film.',
        subconsciousAction: 'Builds an intentional visual encoding schema in occipito-temporal networks.',
        visualAnimationState: 'lightning_focus',
        lightningArcTargets: ['temporal_cortex', 'dlpfc']
      },
      {
        phaseNumber: 2,
        phaseTitle: 'The Calm Under Exam Pressure Shield',
        durationSec: 150,
        scriptNarration: 'Notice how when you sit down for an exam or high-stakes presentation, a cool electric blue shield surrounds your nervous system. Your pulse remains slow and steady at 60 beats per minute. Cortisol cannot touch you. Your mind is like still mountain water reflecting the moonlight.',
        subconsciousAction: 'Conditions vagal brake against test anxiety and somatic panic.',
        visualAnimationState: 'plasma_shield',
        lightningArcTargets: ['amygdala', 'vmPFC']
      },
      {
        phaseNumber: 3,
        phaseTitle: 'Activating the Finger-Snap Recall Trigger',
        durationSec: 110,
        scriptNarration: 'Gently press your right thumb against your middle finger. Feel the mental snapshot of that page appear right before your eyes. You read the answer as clearly as if the book were lying open in front of you.',
        subconsciousAction: 'Installs an autonomic retrieval trigger for high-pressure situations.',
        visualAnimationState: 'golden_consolidation',
        lightningArcTargets: ['dlpfc', 'hippocampus']
      }
    ],
    postHypnoticSuggestion: 'Under pressure, your mind becomes clearer, calmer, and more photographic. Memory flows effortlessly.'
  }
];

export const INITIAL_MEMORY_PALACE_ROOMS: MemoryPalaceLociItem[] = [
  {
    id: 'locus_1',
    roomName: 'Grand Marble Foyer (Entrance)',
    anchorObject: 'Golden Lion Pedestal with Diamond Eyes',
    conceptTitle: 'First Core Principle / Law',
    memoryKey: 'E = mc² (Mass-Energy Equivalence)',
    vividImageryNote: 'The lion roars a beam of blinding electric lightning that incinerates a boulder into pure energy photons.',
    lightningActive: true,
    recallTested: true
  },
  {
    id: 'locus_2',
    roomName: 'The Crystal Library',
    anchorObject: 'Floating Sapphire Hourglass',
    conceptTitle: 'Historical Dates / Timeline Sequence',
    memoryKey: '1947 Indian Independence & Magna Carta 1215',
    vividImageryNote: 'The sapphire hourglass drips golden sand that spells out the dates in glowing neon flames.',
    lightningActive: true,
    recallTested: true
  },
  {
    id: 'locus_3',
    roomName: 'The Botanical Conservatory',
    anchorObject: 'Bioluminescent Giant Fern',
    conceptTitle: 'Biological Taxonomy & Cellular Anatomy',
    memoryKey: 'Mitochondria = Powerhouse & ATP Synthesis',
    vividImageryNote: 'Tiny electric lightning sparks jump between the fern leaves, producing glowing batteries marked ATP.',
    lightningActive: false,
    recallTested: false
  },
  {
    id: 'locus_4',
    roomName: 'The Astronomy Observatory',
    anchorObject: 'Rotating Brass Armillary Sphere',
    conceptTitle: 'Planetary Cycles & Kepler Laws',
    memoryKey: 'Equal Areas in Equal Times & Elliptical Orbits',
    vividImageryNote: 'Planets of spun glass orbit the sphere with laser trails carving out perfect golden ellipses.',
    lightningActive: false,
    recallTested: false
  },
  {
    id: 'locus_5',
    roomName: 'The Vault of Wisdom',
    anchorObject: 'Solid Obsidian Chest with Emerald Lock',
    conceptTitle: 'Complex Equations & Sanskrit Sutras',
    memoryKey: 'Gayatri Mantra & Quantum Wavefunction (Ψ)',
    vividImageryNote: 'When the chest opens, a golden wave of sound and mathematical symbols radiates out in 3D harmony.',
    lightningActive: false,
    recallTested: false
  }
];

export const HYPNOSIS_NEUROSCIENCE_INSIGHTS = [
  {
    title: 'Memory Reconsolidation (Memory Is Not a Hard Drive)',
    sanskrit: 'स्मृति परिणाम एवं संस्कार शोधन',
    desc: 'Contrary to old belief, memory is not a fixed video recording. Every time you recall a memory, the neural engram becomes unstable ("labile") for 4-6 hours. In this window, hypnotic suggestions, submodality shifts, and emotional decoupling permanently rewrite how the memory is re-stored.',
    icon: 'Brain'
  },
  {
    title: 'The Prefrontal "Critical Factor" Bypass',
    sanskrit: 'विवेक संकोच एवं अवचेतन संधान',
    desc: 'In ordinary waking beta state, the Left Dorsolateral Prefrontal Cortex filters out suggestions with doubt and analysis. Hypnotic induction dials down DLPFC analytical hyperactivity, opening direct bilateral synaptic pathways to the subconscious mind where deep transformation occurs.',
    icon: 'Zap'
  },
  {
    title: 'Amygdala Depolarization via Theta Waves',
    sanskrit: 'भय ग्रंथि शमन एवं नाड़ी शुद्धि',
    desc: 'Traumatic memories stay painful because the Basolateral Amygdala fires continuous alarm signals. Hypnotic Theta entrainment (4-8 Hz) sends inhibitory GABAergic signals, permanently disconnecting the panic response from the narrative facts.',
    icon: 'Shield'
  },
  {
    title: 'Hypermnesia & Long-Term Potentiation (LTP)',
    sanskrit: 'मेधा जागरण एवं चेतना विस्तार',
    desc: 'Hypnotic trance amplifies acetylcholine release and strengthens synaptic transmission (LTP) in the hippocampus, unlocking photographic recall, spatial memory palace anchoring, and effortless exam retention.',
    icon: 'Sparkles'
  }
];
