import jsPDF from 'jspdf';
import { MatchMakingResult } from './astrologyEngine';

export function generateKundliMatchingPDF(
  matchResult: MatchMakingResult,
  aiCommentary?: string,
  recommendations?: string[]
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  let y = 14;

  // --- Background Decorative Border ---
  doc.setDrawColor(212, 175, 55); // #d4af37 (Gold)
  doc.setLineWidth(0.8);
  doc.rect(margin - 4, margin - 4, pageWidth - (margin - 4) * 2, 280);
  doc.setLineWidth(0.3);
  doc.setDrawColor(180, 140, 40);
  doc.rect(margin - 2.5, margin - 2.5, pageWidth - (margin - 2.5) * 2, 277);

  // --- Header Banner ---
  doc.setFillColor(253, 248, 235); // Soft cream
  doc.roundedRect(margin, y, pageWidth - margin * 2, 24, 2, 2, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(160, 110, 20);
  doc.setFontSize(16);
  doc.text('KALACHAKRA VEDIC JYOTISH MAHAVIDYALAYA', pageWidth / 2, y + 8, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(80, 50, 10);
  doc.text('Ashta-Kuta 36 Guna Milan & Vivaha Synastry Patrika', pageWidth / 2, y + 14, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 100, 70);
  const reportDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Certified Report ID: KC-MILAN-${Math.floor(100000 + Math.random() * 900000)} | Date: ${reportDate}`, pageWidth / 2, y + 20, { align: 'center' });

  y += 29;

  // --- Two Column Profiles: Groom & Bride ---
  const colWidth = (pageWidth - margin * 2 - 6) / 2;
  const col1X = margin;
  const col2X = margin + colWidth + 6;
  const profileCardHeight = 44;

  // Groom Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(200, 170, 80);
  doc.roundedRect(col1X, y, colWidth, profileCardHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(180, 120, 20);
  doc.text('PARTNER 1 (GROOM / VARA)', col1X + 4, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text(matchResult.person1.name || 'Partner 1', col1X + 4, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(70, 80, 95);
  doc.text(`DOB: ${matchResult.person1.birthDate || 'N/A'}`, col1X + 4, y + 18);
  doc.text(`Birth Time: ${matchResult.person1.birthTime || '08:45 AM'}`, col1X + 4, y + 23);
  doc.text(`Birth Place: ${matchResult.person1.birthPlace || 'Mandi, Himachal Pradesh'}`, col1X + 4, y + 28);
  doc.text(`Moon Sign (Rashi): ${matchResult.person1.rashi}`, col1X + 4, y + 33);
  doc.text(`Nakshatra: ${matchResult.person1.nakshatra} (Pada ${matchResult.person1.pada})`, col1X + 4, y + 38);
  doc.text(`Manglik: ${matchResult.person1.isManglik ? 'Yes (Kuja Active)' : 'No (Shanta)'}`, col1X + 4, y + 43);

  // Bride Box
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(230, 140, 150);
  doc.roundedRect(col2X, y, colWidth, profileCardHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(190, 24, 93);
  doc.text('PARTNER 2 (BRIDE / KANYA)', col2X + 4, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text(matchResult.person2.name || 'Partner 2', col2X + 4, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(70, 80, 95);
  doc.text(`DOB: ${matchResult.person2.birthDate || 'N/A'}`, col2X + 4, y + 18);
  doc.text(`Birth Time: ${matchResult.person2.birthTime || '02:30 PM'}`, col2X + 4, y + 23);
  doc.text(`Birth Place: ${matchResult.person2.birthPlace || 'Shimla, Himachal Pradesh'}`, col2X + 4, y + 28);
  doc.text(`Moon Sign (Rashi): ${matchResult.person2.rashi}`, col2X + 4, y + 33);
  doc.text(`Nakshatra: ${matchResult.person2.nakshatra} (Pada ${matchResult.person2.pada})`, col2X + 4, y + 38);
  doc.text(`Manglik: ${matchResult.person2.isManglik ? 'Yes (Kuja Active)' : 'No (Shanta)'}`, col2X + 4, y + 43);

  y += profileCardHeight + 5;

  // --- Total Score Highlight Box ---
  const isHigh = matchResult.totalGuna >= 24;
  const isAvg = matchResult.totalGuna >= 18;

  doc.setFillColor(isHigh ? 236 : isAvg ? 254 : 255, isHigh ? 253 : isAvg ? 249 : 241, isHigh ? 245 : isAvg ? 235 : 242);
  doc.setDrawColor(isHigh ? 16 : isAvg ? 217 : 225, isHigh ? 185 : isAvg ? 119 : 29, isHigh ? 129 : isAvg ? 6 : 72);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 16, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(20, 30, 45);
  doc.text(`Total Guna Score: ${matchResult.totalGuna} / 36 Gunas`, margin + 6, y + 7);

  doc.setFontSize(10);
  doc.setTextColor(isHigh ? 16 : isAvg ? 180 : 225, isHigh ? 140 : isAvg ? 90 : 29, isHigh ? 80 : isAvg ? 10 : 72);
  doc.text(`Verdict: ${matchResult.verdict} (${matchResult.psychologicalResonance}% Alignment)`, margin + 6, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(70, 80, 90);
  doc.text(`Elemental Resonance: ${matchResult.elementalHarmony}`, pageWidth - margin - 6, y + 9, { align: 'right' });

  y += 20;

  // --- Ashta-Kuta 8-Fold Table ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(140, 95, 15);
  doc.text('ASHTAKOOTA 8-FOLD DETAILED SCORING TABLE', margin, y);
  y += 3;

  // Table Header
  const headers = [
    { label: 'Kuta (Vedic Dimension)', x: margin, w: 46 },
    { label: 'Max', x: margin + 46, w: 14, align: 'center' },
    { label: 'Score', x: margin + 60, w: 16, align: 'center' },
    { label: 'Status', x: margin + 76, w: 26 },
    { label: 'Vedic Domain & Signification', x: margin + 102, w: 80 },
  ];

  doc.setFillColor(235, 220, 180);
  doc.rect(margin, y, pageWidth - margin * 2, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(70, 45, 5);

  headers.forEach((h) => {
    if (h.align === 'center') {
      doc.text(h.label, h.x + h.w / 2, y + 4.2, { align: 'center' });
    } else {
      doc.text(h.label, h.x + 2, y + 4.2);
    }
  });

  y += 6;

  // Table Rows
  doc.setFont('helvetica', 'normal');
  matchResult.kutas.forEach((k, idx) => {
    const rowY = y + idx * 6.5;
    const isEven = idx % 2 === 0;

    if (isEven) {
      doc.setFillColor(252, 250, 245);
      doc.rect(margin, rowY, pageWidth - margin * 2, 6.5, 'F');
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 40, 50);
    doc.text(`${k.kuta} (${k.sanskritName})`, margin + 2, rowY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 70);
    doc.text(String(k.maxScore), margin + 46 + 7, rowY + 4.5, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(k.obtainedScore > 0 ? 16 : 190, k.obtainedScore > 0 ? 120 : 20, k.obtainedScore > 0 ? 50 : 20);
    doc.text(String(k.obtainedScore), margin + 60 + 8, rowY + 4.5, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(k.status === 'Full Match' ? 16 : k.status === 'Partial Match' ? 170 : 190, k.status === 'Full Match' ? 130 : k.status === 'Partial Match' ? 100 : 20, k.status === 'Full Match' ? 60 : k.status === 'Partial Match' ? 20 : 20);
    doc.text(k.status, margin + 76 + 2, rowY + 4.5);

    doc.setFontSize(6.8);
    doc.setTextColor(90, 95, 105);
    const trimmedDesc = k.significance.length > 55 ? k.significance.slice(0, 52) + '...' : k.significance;
    doc.text(trimmedDesc, margin + 102 + 2, rowY + 4.5);
  });

  y += matchResult.kutas.length * 6.5 + 4;

  // --- Manglik Assessment Section ---
  doc.setFillColor(248, 248, 252);
  doc.setDrawColor(210, 200, 230);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 15, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 60, 160);
  doc.text('MANGLIK (KUJA) DOSHA & MUTUAL MARS DYNAMICS', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 65);
  const manglikLines = doc.splitTextToSize(matchResult.manglikStatus.reason, pageWidth - margin * 2 - 8);
  doc.text(manglikLines, margin + 4, y + 10);

  y += 18;

  // --- Acharya Commentary & Remedies ---
  doc.setFillColor(254, 252, 245);
  doc.setDrawColor(220, 190, 100);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(160, 110, 20);
  doc.text('ACHARYA VIDYADHAR VEDIC SYNASTRY COMMENTARY & VIVAHA REMEDIES', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(45, 55, 72);
  const commentaryText = aiCommentary || `The sacred celestial charts of ${matchResult.person1.name} and ${matchResult.person2.name} demonstrate strong psychological resonance and spiritual synergy. With ${matchResult.totalGuna} out of 36 Gunas aligned, this union fosters mutual prosperity, dharmic righteousness, and family peace.`;
  const splitCommentary = doc.splitTextToSize(commentaryText, pageWidth - margin * 2 - 8);
  doc.text(splitCommentary.slice(0, 3), margin + 4, y + 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(140, 80, 10);
  doc.text('Auspicious Harmonization Practices:', margin + 4, y + 25);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(60, 70, 85);
  const recs = recommendations && recommendations.length > 0 ? recommendations : [
    'Perform joint Gauri-Shankar Mahadev Abhishek on Shukla Paksha Mondays.',
    'Keep a purified brass or Sphatik Sri Yantra in the North-East Ishanya corner.',
    'Recite Maha Mrityunjaya Mantra 11 times together at sunrise for health and longevity.'
  ];
  recs.slice(0, 2).forEach((r, rIdx) => {
    doc.text(`* ${r}`, margin + 6, y + 29 + rIdx * 4);
  });

  y += 42;

  // --- Footer Seal & Vedic Blessing ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(160, 110, 20);
  doc.text('|| ॐ सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥', pageWidth / 2, y + 2, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(130, 135, 145);
  doc.text('Kalachakra Vedic Astrology Research Institute | Computed via Lahiri Chitrapaksha Ephemeris | www.kalachakra.app', pageWidth / 2, y + 7, { align: 'center' });

  // Clean filename
  const p1Sanitized = (matchResult.person1.name || 'Groom').replace(/[^a-zA-Z0-9]/g, '_');
  const p2Sanitized = (matchResult.person2.name || 'Bride').replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `Kundli_Milan_${p1Sanitized}_and_${p2Sanitized}_36Guna.pdf`;

  doc.save(fileName);
}
