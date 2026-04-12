import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createArenaBooking } from '../services/arenaService'; 
import { SportType } from '../types/arena';
import { NavLink } from 'react-router-dom';

const sports: SportType[] = ['Padel', 'Squash', 'Table Tennis'];
const morningSlots = ['08:00', '09:00', '10:00', '11:00'];
const afternoonSlots = ['14:00', '15:00', '16:00', '17:00'];

const ArenaBooking:React.FC = () => {
  const { user, userData, loading: authLoading } = useContext(AuthContext);
  
  const [selectedSport, setSelectedSport] = useState<SportType>('Padel');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleConfirm = async () => {
    if (!user) return alert("Please log in to book a court.");
    
    // Check membership status from your AuthContext
    if (userData?.membershipStatus !== 'active') {
      return alert("This is a members-only feature. Please activate your plan.");
    }

    if (!selectedSlot) return alert("Select a time first.");

    setBookingLoading(true);

    const bookingData = {
      memberId: user.uid,
      memberName: userData?.fullName || "Valued Member",
      resourceId: `${selectedSport.toLowerCase()}-court-1`,
      sport: selectedSport,
      date: new Date().toISOString().split('T')[0],
      startTime: selectedSlot,
      endTime: `${parseInt(selectedSlot) + 1}:00`,
      timeSlot: selectedSlot,
      status: 'confirmed' as const,
    };

    const result = await createArenaBooking(bookingData);

    setBookingLoading(false);

    if (result.success) {
      alert(`Successfully booked ${selectedSport} for ${selectedSlot}`);
      setSelectedSlot('');
    } else {
      alert(result.error);
    }
  };

  if (authLoading) return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-sm border border-gray-50">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-black mb-2 uppercase">The Arena</h1>
        <p className="text-gray-400 font-medium">Reserved for the elite. Book your court.</p>
      </header>

      {/* Sport Selector */}
      <section className="mb-10">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Discipline</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                selectedSport === sport 
                  ? 'bg-black text-white shadow-xl scale-105' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </section>

      {/* Time Slots */}
      <section className="mb-12">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Availability</h3>
        <div className="grid grid-cols-4 gap-3">
          {[...morningSlots, ...afternoonSlots].map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`py-4 rounded-2xl border-2 font-black transition-all ${
                selectedSlot === slot 
                  ? 'border-black bg-black text-white' 
                  : 'border-gray-50 bg-gray-50 text-gray-800 hover:border-gray-200'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </section>

      {/* Footer Action */}
      <footer className="space-y-4">
        <button
          onClick={handleConfirm}
          disabled={bookingLoading}
          className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:bg-gray-200"
        >
          {bookingLoading ? "SECURELY BOOKING..." : `CONFIRM ${selectedSport.toUpperCase()}`}
        </button>
        <p className="text-center text-[10px] text-gray-300 uppercase tracking-tighter">
          Members only. Subject to club terms and conditions.
        </p>
      </footer>
         <NavLink to="/classes" className="block mt-10 text-center text-green-800 font-bold hover:underline">
        Back to Classes Overview
      </NavLink>
    </div>
  );
};

export default ArenaBooking;