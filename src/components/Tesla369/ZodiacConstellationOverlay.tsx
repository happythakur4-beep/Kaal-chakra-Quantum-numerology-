import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ZodiacConstellation {
  id: string;
  name: string;
  sanskrit: string;
  symbol: string;
  associatedPlanetId: string;
  associatedPlanetName: string;
  color: string;
  centerPos: { x: number; y: number }; // Percentage 0-100
  labelPos: { x: number; y: number };
  stars: { x: number; y: number; size: number; brightness?: number }[];
  connections: [number, number][]; // Index pairs in stars array
}

interface ZodiacConstellationOverlayProps {
  selectedPlanetId?: string | null;
  hoveredPlanetId?: string | null;
  opacity?: number;
  showLabels?: boolean;
}

export const ZODIAC_CONSTELLATIONS: ZodiacConstellation[] = [
  // 1. MERCURY -> GEMINI (Mithuna) & VIRGO (Kanya)
  {
    id: 'gemini',
    name: 'Gemini',
    sanskrit: 'मिथुन (Mithuna)',
    symbol: '♊',
    associatedPlanetId: 'mercury',
    associatedPlanetName: 'Mercury',
    color: '#38bdf8',
    centerPos: { x: 26, y: 8.5 },
    labelPos: { x: 20, y: 7.5 },
    stars: [
      { x: 18, y: 6.5, size: 2.5 }, // Castor
      { x: 22, y: 6.2, size: 3.0 }, // Pollux
      { x: 20, y: 8.0, size: 1.8 },
      { x: 24, y: 8.2, size: 2.0 },
      { x: 26, y: 10.0, size: 2.0 },
      { x: 30, y: 9.5, size: 1.8 },
      { x: 34, y: 11.0, size: 2.2 },
      { x: 28, y: 11.5, size: 1.6 },
    ],
    connections: [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 7], [5, 6]
    ]
  },
  {
    id: 'virgo',
    name: 'Virgo',
    sanskrit: 'कन्या (Kanya)',
    symbol: '♍',
    associatedPlanetId: 'mercury',
    associatedPlanetName: 'Mercury',
    color: '#38bdf8',
    centerPos: { x: 74, y: 9.0 },
    labelPos: { x: 78, y: 8.0 },
    stars: [
      { x: 68, y: 6.5, size: 2.0 },
      { x: 72, y: 7.8, size: 2.2 },
      { x: 78, y: 8.5, size: 3.2 }, // Spica
      { x: 82, y: 7.0, size: 2.0 },
      { x: 80, y: 10.5, size: 2.0 },
      { x: 75, y: 11.5, size: 1.8 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [1, 5]
    ]
  },

  // 2. VENUS -> TAURUS (Vrishabha) & LIBRA (Tula)
  {
    id: 'taurus',
    name: 'Taurus',
    sanskrit: 'वृषभ (Vrishabha)',
    symbol: '♉',
    associatedPlanetId: 'venus',
    associatedPlanetName: 'Venus',
    color: '#fbbf24',
    centerPos: { x: 24, y: 16.5 },
    labelPos: { x: 18, y: 15.5 },
    stars: [
      { x: 16, y: 14.5, size: 2.0 }, // Pleiades
      { x: 22, y: 16.0, size: 3.4 }, // Aldebaran
      { x: 26, y: 15.0, size: 2.2 }, // Elnath
      { x: 28, y: 17.5, size: 2.0 }, // Tianguan
      { x: 20, y: 18.0, size: 1.8 },
      { x: 15, y: 17.0, size: 1.6 },
    ],
    connections: [
      [0, 1], [1, 2], [1, 4], [4, 3], [4, 5], [2, 3]
    ]
  },
  {
    id: 'libra',
    name: 'Libra',
    sanskrit: 'तुला (Tula)',
    symbol: '♎',
    associatedPlanetId: 'venus',
    associatedPlanetName: 'Venus',
    color: '#fbbf24',
    centerPos: { x: 76, y: 17.0 },
    labelPos: { x: 80, y: 16.0 },
    stars: [
      { x: 72, y: 15.0, size: 2.4 }, // Zubeneschamali
      { x: 80, y: 15.5, size: 2.6 }, // Zubenelgenubi
      { x: 75, y: 18.0, size: 2.0 }, // Zubenelhakrabi
      { x: 83, y: 18.5, size: 2.0 }, // Brachium
      { x: 77, y: 20.0, size: 1.8 },
    ],
    connections: [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [1, 2]
    ]
  },

  // 3. EARTH -> CANCER (Karka) & LEO (Simha) Solar-Gaia Lattice
  {
    id: 'cancer',
    name: 'Cancer',
    sanskrit: 'कर्क (Karka)',
    symbol: '♋',
    associatedPlanetId: 'earth',
    associatedPlanetName: 'Earth',
    color: '#34d399',
    centerPos: { x: 23, y: 25.0 },
    labelPos: { x: 17, y: 24.0 },
    stars: [
      { x: 18, y: 23.5, size: 2.0 },
      { x: 22, y: 24.5, size: 2.4 }, // Asellus Australis
      { x: 25, y: 26.0, size: 2.0 },
      { x: 21, y: 27.5, size: 2.2 }, // Acubens
      { x: 28, y: 25.5, size: 1.8 },
    ],
    connections: [
      [0, 1], [1, 2], [1, 3], [2, 4]
    ]
  },
  {
    id: 'leo',
    name: 'Leo',
    sanskrit: 'सिंह (Simha)',
    symbol: '♌',
    associatedPlanetId: 'earth',
    associatedPlanetName: 'Earth',
    color: '#34d399',
    centerPos: { x: 78, y: 25.5 },
    labelPos: { x: 82, y: 24.5 },
    stars: [
      { x: 72, y: 23.0, size: 3.2 }, // Regulus
      { x: 76, y: 23.8, size: 2.4 }, // Algieba
      { x: 81, y: 22.8, size: 2.0 }, // Adhafera
      { x: 84, y: 24.5, size: 2.2 }, // Zosma
      { x: 88, y: 26.0, size: 2.8 }, // Denebola
      { x: 78, y: 27.0, size: 2.0 }, // Chertan
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 5]
    ]
  },

  // 4. MARS -> ARIES (Mesha) & SCORPIO (Vrishchika)
  {
    id: 'aries',
    name: 'Aries',
    sanskrit: 'मेष (Mesha)',
    symbol: '♈',
    associatedPlanetId: 'mars',
    associatedPlanetName: 'Mars',
    color: '#f87171',
    centerPos: { x: 25, y: 34.0 },
    labelPos: { x: 18, y: 33.0 },
    stars: [
      { x: 18, y: 32.5, size: 3.0 }, // Hamal
      { x: 23, y: 33.5, size: 2.4 }, // Sheratan
      { x: 27, y: 35.0, size: 2.0 }, // Mesarthim
      { x: 30, y: 36.2, size: 1.8 }, // 41 Arietis
    ],
    connections: [
      [0, 1], [1, 2], [2, 3]
    ]
  },
  {
    id: 'scorpio-mars',
    name: 'Scorpio',
    sanskrit: 'वृश्चिक (Vrishchika)',
    symbol: '♏',
    associatedPlanetId: 'mars',
    associatedPlanetName: 'Mars',
    color: '#f87171',
    centerPos: { x: 77, y: 34.5 },
    labelPos: { x: 82, y: 33.5 },
    stars: [
      { x: 72, y: 32.5, size: 2.4 }, // Graffias
      { x: 75, y: 34.0, size: 3.5 }, // Antares
      { x: 79, y: 35.5, size: 2.2 },
      { x: 83, y: 37.0, size: 2.2 }, // Shaula
      { x: 86, y: 36.0, size: 2.0 }, // Lesath
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4]
    ]
  },

  // 5. JUPITER -> SAGITTARIUS (Dhanu) & PISCES (Meena)
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    sanskrit: 'धनु (Dhanu)',
    symbol: '♐',
    associatedPlanetId: 'jupiter',
    associatedPlanetName: 'Jupiter',
    color: '#f59e0b',
    centerPos: { x: 23, y: 48.0 },
    labelPos: { x: 16, y: 47.0 },
    stars: [
      { x: 15, y: 46.0, size: 2.4 }, // Kaus Borealis
      { x: 19, y: 47.5, size: 2.8 }, // Kaus Media
      { x: 16, y: 49.5, size: 3.0 }, // Kaus Australis
      { x: 22, y: 48.5, size: 2.6 }, // Nunki
      { x: 25, y: 47.0, size: 2.2 }, // Ascella
      { x: 27, y: 50.0, size: 2.0 },
      { x: 21, y: 51.0, size: 2.2 }, // Alnasl
    ],
    connections: [
      [0, 1], [1, 2], [2, 6], [1, 3], [3, 4], [4, 5], [2, 3]
    ]
  },
  {
    id: 'pisces-jup',
    name: 'Pisces',
    sanskrit: 'मीन (Meena)',
    symbol: '♓',
    associatedPlanetId: 'jupiter',
    associatedPlanetName: 'Jupiter',
    color: '#f59e0b',
    centerPos: { x: 79, y: 48.5 },
    labelPos: { x: 83, y: 47.5 },
    stars: [
      { x: 72, y: 46.5, size: 2.2 },
      { x: 76, y: 47.5, size: 2.0 },
      { x: 81, y: 49.0, size: 2.6 }, // Alrescha
      { x: 85, y: 48.0, size: 2.2 },
      { x: 88, y: 46.5, size: 2.4 },
      { x: 84, y: 51.0, size: 2.0 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [2, 5]
    ]
  },

  // 6. SATURN -> CAPRICORN (Makara) & AQUARIUS (Kumbha)
  {
    id: 'capricorn',
    name: 'Capricorn',
    sanskrit: 'मकर (Makara)',
    symbol: '♑',
    associatedPlanetId: 'saturn',
    associatedPlanetName: 'Saturn',
    color: '#eab308',
    centerPos: { x: 22, y: 62.0 },
    labelPos: { x: 15, y: 61.0 },
    stars: [
      { x: 14, y: 59.5, size: 2.6 }, // Algedi
      { x: 17, y: 61.0, size: 2.4 }, // Dabih
      { x: 22, y: 63.5, size: 2.2 },
      { x: 28, y: 64.0, size: 2.8 }, // Deneb Algedi
      { x: 25, y: 62.0, size: 2.2 }, // Nashira
      { x: 20, y: 60.5, size: 1.8 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]
    ]
  },
  {
    id: 'aquarius-sat',
    name: 'Aquarius',
    sanskrit: 'कुम्भ (Kumbha)',
    symbol: '♒',
    associatedPlanetId: 'saturn',
    associatedPlanetName: 'Saturn',
    color: '#eab308',
    centerPos: { x: 79, y: 62.5 },
    labelPos: { x: 83, y: 61.5 },
    stars: [
      { x: 73, y: 60.5, size: 2.6 }, // Sadalsuud
      { x: 78, y: 61.8, size: 2.8 }, // Sadalmelik
      { x: 83, y: 62.5, size: 2.2 },
      { x: 87, y: 64.0, size: 2.4 }, // Skat
      { x: 81, y: 65.0, size: 2.0 },
      { x: 75, y: 64.2, size: 1.8 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]
    ]
  },

  // 7. URANUS -> AQUARIUS (Cosmic Electrical Kumbha)
  {
    id: 'uranus-const',
    name: 'Aquarius Vortex',
    sanskrit: 'वरुण कुम्भ (Varuna)',
    symbol: '♒',
    associatedPlanetId: 'uranus',
    associatedPlanetName: 'Uranus',
    color: '#22d3ee',
    centerPos: { x: 25, y: 74.5 },
    labelPos: { x: 18, y: 73.5 },
    stars: [
      { x: 17, y: 73.0, size: 2.4 },
      { x: 22, y: 74.0, size: 2.8 },
      { x: 27, y: 75.5, size: 2.2 },
      { x: 32, y: 76.5, size: 2.4 },
      { x: 26, y: 77.5, size: 2.0 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [2, 4]
    ]
  },

  // 8. NEPTUNE -> PISCES (Soma Ocean Mystical Waters)
  {
    id: 'neptune-const',
    name: 'Pisces Cosmic Ocean',
    sanskrit: 'समुद्र मीन (Soma)',
    symbol: '♓',
    associatedPlanetId: 'neptune',
    associatedPlanetName: 'Neptune',
    color: '#60a5fa',
    centerPos: { x: 76, y: 85.0 },
    labelPos: { x: 81, y: 84.0 },
    stars: [
      { x: 71, y: 83.5, size: 2.4 },
      { x: 75, y: 84.8, size: 2.2 },
      { x: 80, y: 86.0, size: 2.8 },
      { x: 84, y: 85.2, size: 2.0 },
      { x: 87, y: 83.8, size: 2.4 },
      { x: 83, y: 87.5, size: 1.8 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [2, 5]
    ]
  },

  // 9. PLUTO -> SCORPIO / OPHIUCHUS (Transmutation Gateway)
  {
    id: 'pluto-const',
    name: 'Ophiuchus & Scorpio',
    sanskrit: 'यम वृश्चिक (Yama)',
    symbol: '⛎',
    associatedPlanetId: 'pluto',
    associatedPlanetName: 'Pluto',
    color: '#c084fc',
    centerPos: { x: 26, y: 93.5 },
    labelPos: { x: 19, y: 92.5 },
    stars: [
      { x: 19, y: 92.0, size: 2.6 }, // Rasalhague
      { x: 24, y: 93.2, size: 2.4 }, // Cebalrai
      { x: 28, y: 94.5, size: 2.2 }, // Yed Prior
      { x: 33, y: 95.5, size: 2.4 }, // Sabik
      { x: 27, y: 96.5, size: 2.0 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [2, 4]
    ]
  }
];

export const ZodiacConstellationOverlay: React.FC<ZodiacConstellationOverlayProps> = ({
  selectedPlanetId,
  hoveredPlanetId,
  opacity = 0.65,
  showLabels = true,
}) => {
  const activePlanet = (hoveredPlanetId || selectedPlanetId || 'earth').toLowerCase();

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
    >
      <defs>
        {/* Constellation Glow Filters */}
        <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="active-star-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Diagonal Background Inter-Constellation Resonance Lines */}
        <linearGradient id="interstellar-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* 1. FAINT INTERCONNECTING WEB OF CELESTIAL MERIDIANS (Across all constellations) */}
      <g stroke="url(#interstellar-line)" strokeWidth="0.08" strokeDasharray="0.3 0.6">
        <line x1="20" y1="8" x2="46.5" y2="8.5" />
        <line x1="80" y1="9" x2="46.5" y2="8.5" />
        <line x1="24" y1="16.5" x2="46.5" y2="16.5" />
        <line x1="76" y1="17" x2="46.5" y2="16.5" />
        <line x1="23" y1="25" x2="46.5" y2="25" />
        <line x1="78" y1="25.5" x2="46.5" y2="25" />
        <line x1="25" y1="34" x2="46.5" y2="33.5" />
        <line x1="77" y1="34.5" x2="46.5" y2="33.5" />
        <line x1="23" y1="48" x2="46.5" y2="47.5" />
        <line x1="79" y1="48.5" x2="46.5" y2="47.5" />
        <line x1="22" y1="62" x2="46.5" y2="61.5" />
        <line x1="79" y1="62.5" x2="46.5" y2="61.5" />
        <line x1="25" y1="74.5" x2="46.5" y2="74" />
        <line x1="76" y1="85" x2="46.5" y2="84.5" />
        <line x1="26" y1="93.5" x2="46.5" y2="93.5" />
        {/* Diagonal Cross Weave */}
        <line x1="20" y1="8" x2="76" y2="17" strokeOpacity="0.06" />
        <line x1="80" y1="9" x2="23" y2="25" strokeOpacity="0.06" />
        <line x1="24" y1="16.5" x2="77" y2="34.5" strokeOpacity="0.06" />
        <line x1="78" y1="25.5" x2="23" y2="48" strokeOpacity="0.06" />
        <line x1="25" y1="34" x2="79" y2="62.5" strokeOpacity="0.06" />
        <line x1="79" y1="48.5" x2="25" y2="74.5" strokeOpacity="0.06" />
        <line x1="22" y1="62" x2="76" y2="85" strokeOpacity="0.06" />
        <line x1="79" y1="62.5" x2="26" y2="93.5" strokeOpacity="0.06" />
      </g>

      {/* 2. ZODIAC CONSTELLATIONS */}
      {ZODIAC_CONSTELLATIONS.map((constellation) => {
        const isAssociated = constellation.associatedPlanetId.toLowerCase() === activePlanet;
        const constOpacity = isAssociated ? 0.95 : opacity;
        const strokeColor = isAssociated ? '#38bdf8' : 'rgba(148, 163, 184, 0.4)';
        const starFillColor = isAssociated ? '#ffffff' : 'rgba(226, 232, 240, 0.6)';
        const strokeWidth = isAssociated ? '0.22' : '0.12';

        return (
          <g key={constellation.id} className="transition-all duration-500">
            {/* Constellation Connection Lines */}
            {constellation.connections.map(([startIdx, endIdx], i) => {
              const start = constellation.stars[startIdx];
              const end = constellation.stars[endIdx];
              if (!start || !end) return null;

              return (
                <line
                  key={`${constellation.id}-line-${i}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeOpacity={constOpacity}
                  strokeDasharray={isAssociated ? 'none' : '0.4 0.4'}
                  filter={isAssociated ? 'url(#active-star-glow)' : 'url(#star-glow)'}
                />
              );
            })}

            {/* Constellation Stars (Vertices) */}
            {constellation.stars.map((star, idx) => {
              const isMainStar = idx === 0 || idx === 1;
              const radius = isAssociated ? star.size * 0.12 : star.size * 0.08;

              return (
                <g key={`${constellation.id}-star-${idx}`}>
                  {/* Subtle outer halo for highlighted planet stars */}
                  {isAssociated && (
                    <circle
                      cx={star.x}
                      y={star.y}
                      r={radius * 2.2}
                      fill={constellation.color}
                      fillOpacity="0.3"
                      className="animate-pulse"
                    />
                  )}
                  <circle
                    cx={star.x}
                    y={star.y}
                    r={radius}
                    fill={starFillColor}
                    filter={isAssociated ? 'url(#active-star-glow)' : 'url(#star-glow)'}
                  />
                </g>
              );
            })}

            {/* Zodiac Symbol & Name Label */}
            {showLabels && (
              <g 
                className="transition-opacity duration-300 font-sans select-none"
                style={{ opacity: isAssociated ? 1 : 0.45 }}
              >
                {/* Zodiac Glyph Symbol */}
                <text
                  x={constellation.labelPos.x}
                  y={constellation.labelPos.y}
                  fill={isAssociated ? '#38bdf8' : 'rgba(203, 213, 225, 0.7)'}
                  fontSize={isAssociated ? '1.8' : '1.3'}
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {constellation.symbol}
                </text>

                {/* Zodiac Sign English & Sanskrit Label */}
                <text
                  x={constellation.labelPos.x + (constellation.labelPos.x < 50 ? -2.2 : 2.2)}
                  y={constellation.labelPos.y}
                  fill={isAssociated ? '#f1f5f9' : 'rgba(148, 163, 184, 0.6)'}
                  fontSize="0.9"
                  fontFamily="monospace"
                  fontWeight={isAssociated ? 'bold' : 'normal'}
                  textAnchor={constellation.labelPos.x < 50 ? 'end' : 'start'}
                  dominantBaseline="central"
                >
                  {constellation.name}
                  {isAssociated && (
                    <tspan dx="0.5" fill="#38bdf8" fontSize="0.75">
                      [{constellation.sanskrit.split(' ')[0]}]
                    </tspan>
                  )}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};
