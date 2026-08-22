import React, { useRef, useState } from 'react';
import { DestinyProfileData, ThemeMode } from '../../types';
import { SRI_YANTRA_LOGO } from '../../data/mockData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { 
  Download, 
  Sparkles, 
  Sun, 
  Moon, 
  Star, 
  Compass, 
  HeartHandshake, 
  Printer, 
  Share2, 
  Award,
  Crown,
  FileText,
  CheckCircle2,
  HelpCircle,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DestinyReportScreenProps {
  theme: ThemeMode;
  profile: DestinyProfileData;
  onRecalculate: () => void;
}

export const DestinyReportScreen: React.FC<DestinyReportScreenProps> = ({
  theme,
  profile,
  onRecalculate,
}) => {
  const isDark = theme === 'dark';
  const reportRef = useRef<HTMLDivElement>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null);

  // Trigger Native Print / Save as PDF Dialog
  const handlePrintPDF = () => {
    try {
      cosmicAudio.playFrequency(528);
    } catch {}

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#fdf2d1', '#5c0011', '#c5a059', '#ffd700'],
      });
    } catch {}

    setShowSuccessToast("Opening Print / Save as PDF dialog. Select 'Save as PDF' as your destination.");
    setTimeout(() => {
      window.print();
    }, 250);

    setTimeout(() => setShowSuccessToast(null), 6000);
  };

  // Standalone HTML Offline Document Export
  const handleDownloadHTML = () => {
    try {
      cosmicAudio.playFrequency(432);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#c5a059', '#10b981'],
      });
    } catch {}

    const cleanUserName = profile.userName || 'Seeker';
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vedic Destiny Report - ${cleanUserName}</title>
  <style>
    body {
      font-family: 'Cinzel', Georgia, serif;
      background: #faf8f2;
      color: #2d2105;
      margin: 0;
      padding: 32px 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 2px solid #c5a059;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(180,140,50,0.15);
    }
    .header { text-align: center; border-bottom: 1px solid #e5d7b5; padding-bottom: 24px; margin-bottom: 24px; }
    h1 { color: #5c0011; margin: 6px 0; font-size: 28px; }
    h2 { color: #8a6514; margin: 4px 0; font-size: 18px; text-transform: uppercase; }
    .badge-bar { display: flex; justify-content: center; gap: 16px; margin-top: 12px; }
    .badge { background: #fdfaf3; border: 1px solid #c5a059; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: bold; }
    .section { margin-bottom: 28px; padding-bottom: 18px; border-bottom: 1px dashed #e2d1a8; }
    .section h3 { color: #3b2b0a; font-size: 16px; text-transform: uppercase; margin-bottom: 12px; }
    .vocation-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .vocation-card { background: #faf6ec; border: 1px solid #d4af37; padding: 12px 16px; border-radius: 8px; }
    .vocation-card strong { color: #5c0011; display: block; margin-bottom: 4px; }
    .timeline-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    .timeline-node { background: #faf8f2; border: 1px solid #c5a059; padding: 10px; border-radius: 6px; text-align: center; }
    .quarter { font-weight: bold; color: #8a6514; font-size: 12px; }
    .karma-box { background: #fff8eb; border-left: 4px solid #c5a059; padding: 16px; font-style: italic; margin-top: 10px; }
    .footer { text-align: center; font-size: 11px; color: #8a6514; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Professional Destiny Profile</h2>
      <h1>${cleanUserName}</h1>
      <p style="margin:0; color:#8a6514; font-size:14px;">All India Institute of Occult Science</p>
      <div class="badge-bar">
        <div class="badge">Life Path Number: ${profile.lifePathNumber}</div>
        <div class="badge">Destiny Number: ${profile.destinyNumber}</div>
      </div>
    </div>

    <div class="section">
      <h3>1. Quantum Career Resonance Metrics</h3>
      <p>Leadership: <strong>${profile.metrics.leadership}/20</strong> | Creativity: <strong>${profile.metrics.creativity}/20</strong> | Stability: <strong>${profile.metrics.stability}/20</strong></p>
    </div>

    <div class="section">
      <h3>2. Vibrational Vocations</h3>
      <div class="vocation-grid">
        ${profile.vocations.map(v => `
          <div class="vocation-card">
            <strong>${v.title}</strong>
            <p style="margin:0; font-size:12px; color:#4a370b;">${v.description}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <h3>3. Success Timeline</h3>
      <div class="timeline-grid">
        ${profile.timeline.map(t => `
          <div class="timeline-node">
            <div class="quarter">${t.quarter}</div>
            <strong style="font-size:12px; display:block; margin:2px 0;">${t.title}</strong>
            <p style="margin:0; font-size:10px; color:#5a4313;">${t.description}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <h3>4. Spiritual Advice & Karma Guidance</h3>
      <div class="karma-box">
        "${profile.karmaGuidance}"
      </div>
    </div>

    <div class="footer">
      © 2026 All India Institute of Occult Science • Generated on ${new Date().toLocaleDateString()}
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cleanUserName.replace(/\s+/g, '_')}_Destiny_Report.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setShowSuccessToast(`Downloaded standalone report: ${cleanUserName.replace(/\s+/g, '_')}_Destiny_Report.html`);
    setTimeout(() => setShowSuccessToast(null), 5000);
  };

  // Standalone Text Summary Export
  const handleDownloadText = () => {
    try {
      cosmicAudio.playFrequency(432);
    } catch {}

    const cleanUserName = profile.userName || 'Seeker';
    const textContent = `=======================================================
   ALL INDIA INSTITUTE OF OCCULT SCIENCE
   COSMIC DESTINY & CAREER RESONANCE REPORT
=======================================================

Name: ${cleanUserName}
Life Path Number: ${profile.lifePathNumber}
Destiny Number: ${profile.destinyNumber}
Report Generated: ${new Date().toLocaleDateString()}

-------------------------------------------------------
1. QUANTUM CAREER RESONANCE METRICS
-------------------------------------------------------
• Leadership: ${profile.metrics.leadership} / 20
• Creativity: ${profile.metrics.creativity} / 20
• Stability:  ${profile.metrics.stability} / 20

-------------------------------------------------------
2. VIBRATIONAL VOCATIONS
-------------------------------------------------------
${profile.vocations.map(v => `• ${v.title.toUpperCase()}\n  ${v.description}\n`).join('\n')}
-------------------------------------------------------
3. SUCCESS TIMELINE
-------------------------------------------------------
${profile.timeline.map(t => `[${t.quarter}] ${t.title}: ${t.description}`).join('\n')}

-------------------------------------------------------
4. SPIRITUAL ADVICE & KARMA GUIDANCE
-------------------------------------------------------
"${profile.karmaGuidance}"

=======================================================
© 2026 All India Institute of Occult Science
=======================================================
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cleanUserName.replace(/\s+/g, '_')}_Destiny_Summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setShowSuccessToast(`Downloaded text summary: ${cleanUserName.replace(/\s+/g, '_')}_Destiny_Summary.txt`);
    setTimeout(() => setShowSuccessToast(null), 5000);
  };

  // SVG Sacred Triangle Geometry math for "Quantum Career Resonance"
  // Triangle vertices:
  // Center is (120, 115)
  // Vertex Top (Leadership): (120, 25)
  // Vertex Bottom-Left (Creativity): (35, 175)
  // Vertex Bottom-Right (Stability): (205, 175)
  const lNorm = (profile.metrics.leadership || 20) / 20; // 0 to 1
  const cNorm = (profile.metrics.creativity || 16) / 20;
  const sNorm = (profile.metrics.stability || 14) / 20;

  const cx = 120;
  const cy = 115;

  const topX = cx;
  const topY = cy - (cy - 25) * lNorm;

  const blX = cx - (cx - 35) * cNorm;
  const blY = cy + (175 - cy) * cNorm;

  const brX = cx + (205 - cx) * sNorm;
  const brY = cy + (175 - cy) * sNorm;

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-6 md:py-10">
      
      {/* Top Notification Toast for PDF / File Downloads */}
      {showSuccessToast && (
        <div className={`no-print mb-4 p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-serif shadow-lg animate-fade-in ${
          isDark 
            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' 
            : 'bg-emerald-50 border-emerald-300 text-emerald-900'
        }`}>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{showSuccessToast}</span>
          </div>
          <button 
            onClick={() => setShowSuccessToast(null)} 
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Utility Action Bar (no-print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-6 p-4 rounded-xl border transition-all"
        style={{
          backgroundColor: isDark ? 'rgba(18, 18, 28, 0.75)' : 'rgba(255, 252, 245, 0.88)',
          borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
        }}
      >
        <div className="flex items-center gap-2 text-xs font-cinzel">
          <Award className="w-4 h-4 text-[#d4af37]" />
          <span className={isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'}>
            Destiny Profile Validated • Life Path {profile.lifePathNumber} • Destiny {profile.destinyNumber}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="report-recalculate-btn"
            onClick={onRecalculate}
            className={`px-3 py-1.5 rounded-lg border text-xs font-cinzel transition-all cursor-pointer ${
              isDark ? 'border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10' : 'border-[#c5a059] text-[#8a6514] hover:bg-amber-100'
            }`}
          >
            Recalculate Details
          </button>

          {/* Quick Offline HTML Export */}
          <button
            id="report-download-html-btn"
            onClick={handleDownloadHTML}
            title="Download standalone offline HTML file"
            className={`px-3 py-1.5 rounded-lg border text-xs font-cinzel transition-all flex items-center gap-1.5 cursor-pointer ${
              isDark ? 'border-[#d4af37]/40 text-amber-200 hover:bg-[#d4af37]/15' : 'border-[#c5a059] text-[#5a4313] hover:bg-amber-100'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Save HTML</span>
          </button>
          
          {/* Primary Print / Save PDF Button */}
          <button
            id="report-print-top-btn"
            onClick={handlePrintPDF}
            className="px-4 py-1.5 rounded-lg bg-maroon-gradient border border-[#d4af37] text-[#fdf2d1] font-cinzel text-xs font-bold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <Printer className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>Print / Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Printable Document Canvas */}
      <div 
        ref={reportRef}
        id="destiny-profile-document"
        className={`print-sheet relative rounded-2xl p-6 sm:p-10 md:p-14 border transition-all duration-300 overflow-hidden shadow-2xl ${
          isDark 
            ? 'bg-[#0f0f18]/95 border-[#d4af37]/50 shadow-[0_0_50px_rgba(212,175,55,0.2)] text-gray-200' 
            : 'bg-[#faf8f2] border-[#c5a059]/70 shadow-[0_15px_50px_rgba(180,140,50,0.15)] text-[#2d2105]'
        }`}
      >
        {/* Subtle Watermark Mandala */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <img
            src={SRI_YANTRA_LOGO}
            alt="Watermark Mandala"
            className="w-[650px] h-[650px] object-contain animate-spin-slow"
          />
        </div>

        {/* Ornate Corner Framing Accents */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37] rounded-tl-sm pointer-events-none opacity-80" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37] rounded-tr-sm pointer-events-none opacity-80" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37] rounded-bl-sm pointer-events-none opacity-80" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37] rounded-br-sm pointer-events-none opacity-80" />

        {/* 1. Header: Professional Destiny Profile */}
        <div className="text-center relative z-10 mb-10 print-avoid-break">
          <div className="w-14 h-14 mx-auto mb-3">
            <img
              src={SRI_YANTRA_LOGO}
              alt="Occult Science Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]"
            />
          </div>
          
          <h3 className={`text-base sm:text-lg font-cinzel tracking-widest uppercase ${
            isDark ? 'text-[#d4af37] text-glow-gold' : 'text-[#8a6514]'
          }`}>
            Professional Destiny Profile
          </h3>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-wide mt-1 mb-1 ${
            isDark ? 'text-gold-gradient text-3d-gold' : 'text-[#3b2b0a] text-3d-celestial'
          }`}>
            [{profile.userName}]
          </h1>

          <div className="flex flex-col items-center gap-0.5">
            <p className="text-sm font-cinzel font-semibold text-[#c5a059] tracking-wider">
              Cosmic Career Path Report
            </p>
            <p className={`text-xs font-serif tracking-widest uppercase opacity-80 ${isDark ? 'text-gray-400' : 'text-[#5a4313]'}`}>
              All India Institute of Occult Science
            </p>
          </div>
        </div>

        {/* 2. Top Split: 1. Quantum Career Resonance & 2. Vibrational Vocation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 mb-12 print-avoid-break">
          
          {/* Section 1: Quantum Career Resonance (Triangle Radar) */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <h4 className={`text-sm sm:text-base font-cinzel font-bold mb-4 tracking-wide ${
              isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
            }`}>
              1. Quantum Career Resonance
            </h4>

            {/* Sacred Triangle Radar SVG Chart */}
            <div className="relative w-64 h-56 flex items-center justify-center">
              <svg viewBox="0 0 240 210" className="w-full h-full overflow-visible">
                {/* Background concentric reference triangles */}
                {/* Outer Triangle */}
                <polygon
                  points="120,25 35,175 205,175"
                  fill="none"
                  stroke={isDark ? 'rgba(212,175,55,0.3)' : 'rgba(197,160,89,0.4)'}
                  strokeWidth="1"
                />
                {/* Inner Level 2 */}
                <polygon
                  points="120,55 60,155 180,155"
                  fill="none"
                  stroke={isDark ? 'rgba(212,175,55,0.2)' : 'rgba(197,160,89,0.25)'}
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />
                {/* Inner Level 3 */}
                <polygon
                  points="120,85 85,135 155,135"
                  fill="none"
                  stroke={isDark ? 'rgba(212,175,55,0.15)' : 'rgba(197,160,89,0.2)'}
                  strokeWidth="0.8"
                />

                {/* Grid axis lines from center to vertices */}
                <line x1="120" y1="115" x2="120" y2="25" stroke={isDark ? 'rgba(212,175,55,0.25)' : 'rgba(197,160,89,0.3)'} strokeWidth="0.8" />
                <line x1="120" y1="115" x2="35" y2="175" stroke={isDark ? 'rgba(212,175,55,0.25)' : 'rgba(197,160,89,0.3)'} strokeWidth="0.8" />
                <line x1="120" y1="115" x2="205" y2="175" stroke={isDark ? 'rgba(212,175,55,0.25)' : 'rgba(197,160,89,0.3)'} strokeWidth="0.8" />

                {/* Dynamic Calculated Resonance Triangle */}
                <polygon
                  points={`${topX},${topY} ${blX},${blY} ${brX},${brY}`}
                  fill={isDark ? 'rgba(212,175,55,0.35)' : 'rgba(197,160,89,0.38)'}
                  stroke="#d4af37"
                  strokeWidth="2"
                  className="filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-700"
                />

                {/* Vertex metric indicators */}
                <circle cx={topX} cy={topY} r="4" fill="#fdf2d1" stroke="#d4af37" strokeWidth="2" />
                <circle cx={blX} cy={blY} r="4" fill="#fdf2d1" stroke="#d4af37" strokeWidth="2" />
                <circle cx={brX} cy={brY} r="4" fill="#fdf2d1" stroke="#d4af37" strokeWidth="2" />

                {/* Axis Labels & Values */}
                {/* Top: Leadership */}
                <text x="120" y="14" textAnchor="middle" fill={isDark ? '#fdf2d1' : '#3b2b0a'} className="text-[10px] font-cinzel font-semibold">
                  Leadership
                </text>
                <text x="128" y="38" fill="#d4af37" className="text-[9px] font-mono font-bold">
                  {profile.metrics.leadership}
                </text>

                {/* Bottom Left: Creativity */}
                <text x="25" y="194" textAnchor="middle" fill={isDark ? '#fdf2d1' : '#3b2b0a'} className="text-[10px] font-cinzel font-semibold">
                  Creativity
                </text>
                <text x="48" y="165" fill="#d4af37" className="text-[9px] font-mono font-bold">
                  {profile.metrics.creativity}
                </text>

                {/* Bottom Right: Stability */}
                <text x="215" y="194" textAnchor="middle" fill={isDark ? '#fdf2d1' : '#3b2b0a'} className="text-[10px] font-cinzel font-semibold">
                  Stability
                </text>
                <text x="180" y="165" fill="#d4af37" className="text-[9px] font-mono font-bold">
                  {profile.metrics.stability}
                </text>
              </svg>
            </div>
          </div>

          {/* Section 2: Vibrational Vocation */}
          <div className="lg:col-span-7">
            <h4 className={`text-sm sm:text-base font-cinzel font-bold mb-4 tracking-wide text-left ${
              isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
            }`}>
              2. Vibrational Vocation
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {profile.vocations.map((voc) => (
                <div
                  key={voc.id}
                  id={`vocation-card-${voc.id}`}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                    isDark
                      ? 'bg-black/40 border-[#d4af37]/35 shadow-[0_0_12px_rgba(212,175,55,0.1)]'
                      : 'bg-white/90 border-[#c5a059]/50 shadow-sm'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] flex-shrink-0 mt-0.5">
                    {voc.icon === 'Caduceus' && <Sparkles className="w-4 h-4" />}
                    {voc.icon === 'Zodiac' && <Sun className="w-4 h-4" />}
                    {voc.icon === 'Compass' && <Compass className="w-4 h-4" />}
                    {voc.icon === 'Lion' && <Crown className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <h5 className={`text-xs sm:text-sm font-cinzel font-bold ${
                        isDark ? 'text-gray-100' : 'text-[#3b2b0a]'
                      }`}>
                        {voc.title}
                      </h5>
                    </div>
                    <p className={`text-[0.72rem] leading-relaxed mt-1 font-serif ${
                      isDark ? 'text-gray-300' : 'text-[#5a4313]'
                    }`}>
                      {voc.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 3. Section 3: Success Timeline */}
        <div className="relative z-10 mb-12 print-avoid-break">
          <h4 className={`text-sm sm:text-base font-cinzel font-bold mb-6 text-center tracking-wide ${
            isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
          }`}>
            3. Success Timeline
          </h4>

          {/* Celestial Golden Milestone Line */}
          <div className="relative">
            {/* Horizontal connection line */}
            <div className="hidden md:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37] to-[#d4af37]/20" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {profile.timeline.map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                    isDark
                      ? 'bg-black/50 border-[#d4af37]/30 shadow-[0_0_10px_rgba(212,175,55,0.1)]'
                      : 'bg-white/80 border-[#c5a059]/40 shadow-sm'
                  }`}
                >
                  {/* Celestial Icon Node */}
                  <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mb-2 shadow-sm">
                    {item.highlightIcon === 'Sparkles' && <Sparkles className="w-3.5 h-3.5" />}
                    {item.highlightIcon === 'Sun' && <Sun className="w-3.5 h-3.5" />}
                    {item.highlightIcon === 'Moon' && <Moon className="w-3.5 h-3.5" />}
                    {item.highlightIcon === 'Star' && <Star className="w-3.5 h-3.5" />}
                  </div>

                  <span className="text-xs font-cinzel font-bold text-[#d4af37] block">
                    {item.quarter}
                  </span>
                  
                  <span className={`text-xs font-cinzel font-semibold block mb-1 ${
                    isDark ? 'text-gray-100' : 'text-[#3b2b0a]'
                  }`}>
                    {item.title}
                  </span>

                  <p className={`text-[0.68rem] leading-tight font-serif ${
                    isDark ? 'text-gray-300' : 'text-[#5a4313]'
                  }`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Section 4: Spiritual Advice & Download Button */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10 pt-4 border-t border-amber-500/20 print-avoid-break">
          
          <div className="md:col-span-7 text-left">
            <h4 className={`text-xs sm:text-sm font-cinzel font-bold tracking-widest uppercase mb-1 ${
              isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
            }`}>
              4. Spiritual Advice
            </h4>
            
            <h5 className="text-sm font-cinzel font-semibold text-[#d4af37] mb-2">
              Karma Guidance
            </h5>

            <p className={`text-xs sm:text-sm font-serif leading-relaxed italic ${
              isDark ? 'text-gray-300' : 'text-[#4d3809]'
            }`}>
              "{profile.karmaGuidance}"
            </p>
          </div>

          {/* Download Button Action Card */}
          <div className="md:col-span-5 flex flex-col items-center md:items-end gap-2">
            <button
              id="report-download-profile-btn"
              onClick={handlePrintPDF}
              className="no-print w-full sm:w-auto group p-3.5 sm:p-4 rounded-2xl border flex items-center gap-3.5 transition-all duration-300 cursor-pointer text-left shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(92,0,17,0.85) 0%, rgba(20,20,30,0.95) 100%)'
                  : 'linear-gradient(135deg, #fdfaf3 0%, #f4ebd6 100%)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.7)' : 'rgba(197, 160, 89, 0.8)',
              }}
            >
              {/* Circular Download Emblem with glowing ring */}
              <div className="w-11 h-11 rounded-full border-2 border-[#d4af37] bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)] flex-shrink-0">
                <Download className="w-5 h-5" />
              </div>

              <div>
                <span className={`text-xs sm:text-sm font-cinzel font-bold block leading-snug ${
                  isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'
                }`}>
                  Print / Download PDF
                </span>
                <span className={`text-[0.65rem] sm:text-xs font-cinzel font-medium block ${
                  isDark ? 'text-[#d4af37]' : 'text-[#8a6514]'
                }`}>
                  Save Local Janampatri Document
                </span>
              </div>
            </button>

            {/* Quick Export Text/HTML Secondary Links */}
            <div className="no-print flex items-center gap-2 text-[0.65rem] font-cinzel text-[#d4af37]">
              <button 
                onClick={handleDownloadHTML} 
                className="hover:underline flex items-center gap-1 opacity-85 hover:opacity-100 cursor-pointer"
              >
                <FileText className="w-3 h-3" /> Save Offline .HTML
              </button>
              <span>•</span>
              <button 
                onClick={handleDownloadText} 
                className="hover:underline flex items-center gap-1 opacity-85 hover:opacity-100 cursor-pointer"
              >
                Save Plain .TXT
              </button>
            </div>
          </div>

        </div>

        {/* Document Footer */}
        <div className="mt-10 pt-4 border-t border-amber-500/20 text-center relative z-10 text-[0.65rem] font-serif print-avoid-break">
          <div className="flex items-center justify-center gap-1.5 text-[#d4af37] font-cinzel font-semibold mb-1">
            <Sparkles className="w-3 h-3" />
            <span>All India Institute of Occult Science</span>
            <Sparkles className="w-3 h-3" />
          </div>
          <p className={isDark ? 'text-gray-400' : 'text-[#6b5118]'}>
            © 2026 All India Institute of Occult Science. All Rights Reserved. | Celestial Balance Theme | Validated Cosmic Profile
          </p>
        </div>

      </div>

    </div>
  );
};

