
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

      <footer className="bg-brand-950 relative overflow-hidden border-t border-brand-800 pt-24 pb-10">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-accent/5 rounded-[100%] blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          <div className="flex flex-col items-center text-center">

            {/* The Barbershop Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-8 h-8 border border-accent/60 flex items-center justify-center rotate-45">
                <div className="w-2 h-2 bg-accent -rotate-45"></div>
              </div>
              <span className="font-serif font-bold tracking-tight uppercase text-lg text-brand-50">Barber<span className="text-accent">Space</span></span>
            </div>

            {/* Separator */}
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-brand-700 to-transparent mb-12"></div>

            {/* Premium Author Block */}
            <div className="flex flex-col items-center max-w-2xl mx-auto">
              <span className="text-[10px] text-accent font-bold uppercase tracking-[0.3em] mb-4">Разработка и Стратегия</span>

              <h3 className="text-4xl md:text-5xl font-serif font-extrabold text-brand-50 mb-4 tracking-tight">Дмитрий Попов</h3>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-700"></div>
                <p className="text-brand-200 font-bold uppercase tracking-widest text-xs md:text-sm">
                  AI Бизнес-Стратег
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-700"></div>
              </div>

              <p className="text-brand-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10 font-light">
                <strong className="text-brand-200 font-medium">15+ лет</strong> практики в построении бизнеса. <br className="hidden md:block" />
                <strong className="text-brand-200 font-medium">2500+ часов</strong> работы с нейросетями.
                <br className="hidden md:block mt-4" />
                <span className="text-accent italic mt-4 block text-lg font-serif">«Хочешь так же? Создаю премиальные системы, которые продают и автоматизируют рутину.»</span>
              </p>

              <a
                href="https://t.me/ai_comandos"
                target="_blank"
                rel="noreferrer"
                className="group relative px-8 py-4 bg-brand-950 border border-accent/30 hover:border-accent text-brand-50 rounded flex items-center justify-center gap-3 transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,164,90,0.15)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500"></div>
                <span className="text-xs font-bold uppercase tracking-[0.15em] relative z-10 transition-transform duration-500 group-hover:-translate-x-1">Обсудить ваш проект в Telegram</span>
                <svg className="w-4 h-4 relative z-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9l20-7z" /></svg>
              </a>
            </div>

            {/* Copyright */}
            <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center pt-8 mt-20 border-t border-brand-800/50 text-[10px] text-brand-500 uppercase tracking-widest">
              <div>© {new Date().getFullYear()} Все права защищены.</div>
              <div className="mt-4 md:mt-0 flex items-center gap-2">
                <span>Сделано с использованием AI-технологий</span>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
