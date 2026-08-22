import React, { useState } from 'react';
import { Consultation, ThemeMode } from '../../types';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  UserCheck, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Star 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConsultationsScreenProps {
  theme: ThemeMode;
  consultations: Consultation[];
  onBookSuccess: (consultation: Consultation) => void;
}

export const ConsultationsScreen: React.FC<ConsultationsScreenProps> = ({
  theme,
  consultations,
  onBookSuccess,
}) => {
  const [bookingConsultation, setBookingConsultation] = useState<Consultation | null>(null);
  const [selectedDate, setSelectedDate] = useState('2026-11-10');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const isDark = theme === 'dark';

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingConsultation) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#fdf2d1', '#5c0011'],
      });
    } catch {}

    setIsSuccess(true);
    setTimeout(() => {
      onBookSuccess({
        ...bookingConsultation,
        date: selectedDate,
        time: selectedTime,
        status: 'upcoming',
      });
      setIsSuccess(false);
      setBookingConsultation(null);
    }, 1200);
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-widest uppercase text-[#d4af37]"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(245, 238, 218, 0.8)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.5)',
          }}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Private Occult Consultations</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl font-cinzel font-bold tracking-wide uppercase ${
          isDark ? 'text-gold-gradient' : 'text-[#3b2b0a]'
        }`}>
          Vedic & Quantum Masters
        </h1>

        <p className={`text-sm font-serif max-w-2xl mx-auto mt-2 ${
          isDark ? 'text-gray-300' : 'text-[#5a4313]'
        }`}>
          Book one-on-one confidential transmissions with senior astrologers, numerologists, and aura energy architects.
        </p>
      </div>

      {/* Practitioners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {consultations.map((c) => (
          <div
            key={c.id}
            id={`consultation-card-${c.id}`}
            className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
              isDark ? 'glassmorphism-dark text-gray-200' : 'glassmorphism-light text-[#3b2b0a]'
            }`}
          >
            <div>
              {/* Avatar & Title */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={c.avatarUrl}
                    alt={c.practitionerName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#d4af37] shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border border-black" />
                </div>
                <div>
                  <h3 className={`text-base font-cinzel font-bold ${
                    isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'
                  }`}>
                    {c.practitionerName}
                  </h3>
                  <p className={`text-xs font-serif ${isDark ? 'text-[#d4af37]' : 'text-[#8a6514]'}`}>
                    {c.specialty}
                  </p>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border mb-4 text-xs font-serif space-y-1.5 ${
                isDark ? 'bg-black/40 border-[#d4af37]/20 text-gray-300' : 'bg-white/80 border-[#c5a059]/30 text-[#4d3809]'
              }`}>
                <h4 className="font-cinzel font-semibold text-[#d4af37] text-xs">
                  {c.title}
                </h4>
                <div className="flex items-center justify-between pt-1">
                  <span>Energy Exchange:</span>
                  <span className="font-mono font-bold text-sm text-[#d4af37]">₹{c.fee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Next Opening:</span>
                  <span className="font-mono">{c.date}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setBookingConsultation(c)}
              className="w-full py-2.5 px-4 rounded-xl bg-gold-gradient-btn text-black font-cinzel font-bold text-xs shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Session</span>
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className={`relative w-full max-w-md rounded-2xl p-6 sm:p-8 border shadow-2xl ${
            isDark ? 'bg-[#10101a] border-[#d4af37]/40 text-gray-200' : 'bg-[#fdfbf6] border-[#c5a059]/60 text-[#3b2b0a]'
          }`}>
            <h3 className="text-xl font-cinzel font-bold text-gold-gradient mb-1">
              Confirm Private Transmission
            </h3>
            <p className="text-xs font-serif opacity-80 mb-4">
              With {bookingConsultation.practitionerName} ({bookingConsultation.specialty})
            </p>

            <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs font-serif">
              <div>
                <label className="block font-cinzel font-semibold mb-1">Select Consultation Date</label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-black/30 text-sm"
                />
              </div>

              <div>
                <label className="block font-cinzel font-semibold mb-1">Preferred Time Slot (IST)</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-black/30 text-sm"
                >
                  <option value="10:00 AM">10:00 AM - 10:45 AM IST</option>
                  <option value="02:30 PM">02:30 PM - 03:15 PM IST</option>
                  <option value="06:00 PM">06:00 PM - 06:45 PM IST</option>
                  <option value="08:30 PM">08:30 PM - 09:15 PM IST</option>
                </select>
              </div>

              <div>
                <label className="block font-cinzel font-semibold mb-1">Specific Questions or Focus Area</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Career transit in Saturn dasha, relationship synastry, or home Vastu..."
                  className="w-full px-3 py-2 rounded-lg border bg-black/30 text-sm"
                />
              </div>

              <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/10 flex items-center justify-between">
                <span>Fee Exchange</span>
                <span className="font-mono font-bold text-sm text-[#d4af37]">₹{bookingConsultation.fee}</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setBookingConsultation(null)}
                  className="flex-1 py-2.5 rounded-lg border text-xs font-cinzel cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSuccess}
                  className="flex-1 py-2.5 rounded-lg bg-maroon-gradient border border-[#d4af37] text-[#fdf2d1] font-cinzel font-bold text-xs shadow-lg cursor-pointer"
                >
                  {isSuccess ? 'Confirmed!' : 'Confirm & Reserve'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
