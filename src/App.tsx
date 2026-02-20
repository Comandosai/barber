
import { useState } from 'react';
import Hero from './components/Hero';
import BentoServices from './components/BentoServices';
import Masters from './components/Masters';
import Reviews from './components/Reviews';
import FormCTA from './components/FormCTA';
import BookingModal from './components/BookingModal';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="min-h-screen bg-brand-950 text-brand-50 font-sans selection:bg-accent/20">

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />

      {/* Dark Premium Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-brand-950/80 backdrop-blur-xl border-b border-brand-700/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-accent/60 flex items-center justify-center rotate-45">
              <div className="w-2 h-2 bg-accent -rotate-45"></div>
            </div>
            <span className="font-serif font-extrabold text-xl tracking-tighter uppercase">Barber<span className="text-accent">Space</span></span>
          </div>
          <button
            onClick={openBooking}
            className="text-xs font-bold uppercase tracking-widest text-brand-200 hover:text-accent transition-colors duration-300"
          >
            Записаться
          </button>
        </div>
      </nav>

      <main>
        <Hero onBooking={openBooking} />
        <BentoServices />
        <Masters />
        <Reviews />
        <FormCTA onBooking={openBooking} />
      </main>

      <footer className="bg-brand-950 text-brand-50 py-12 px-4 md:px-12 border-t border-brand-700/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-accent/60 flex items-center justify-center rotate-45">
              <div className="w-2 h-2 bg-accent -rotate-45"></div>
            </div>
            <span className="font-serif font-bold tracking-tight uppercase">Barber<span className="text-accent">Space</span></span>
          </div>
          <div className="text-sm font-medium text-brand-300 uppercase tracking-widest">
            © {new Date().getFullYear()} Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
