import { motion } from 'framer-motion';

const FormCTA = ({ onBooking }: { onBooking: () => void }) => {
    return (
        <section className="bg-brand-900 py-32 px-4 relative overflow-hidden border-t border-brand-700/50">

            {/* Background atmospheric image */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=80&auto=format&fit=crop"
                    alt="Barbershop atmosphere"
                    className="w-full h-full object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-brand-900/80"></div>
            </div>

            {/* Gold ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="bg-brand-800 border border-accent/20 p-8 md:p-16 text-center lg:text-left relative gold-glow">

                    {/* Gold corner decorations */}
                    <div className="absolute top-0 left-0 w-12 h-[1px] bg-accent"></div>
                    <div className="absolute top-0 left-0 h-12 w-[1px] bg-accent"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-accent"></div>
                    <div className="absolute bottom-0 right-0 h-12 w-[1px] bg-accent"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        <div>
                            <div className="inline-block px-3 py-1 bg-accent text-brand-950 text-[10px] uppercase tracking-widest font-bold mb-6">
                                Финальный призыв
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-brand-50 uppercase tracking-tight leading-[1.1]">
                                Запишитесь сейчас —<br />цена на кассе не изменится.
                            </h2>
                            <p className="mt-6 text-brand-300 font-medium text-lg leading-relaxed">
                                Выберите удобное время и мастера за 30 секунд. Мы зафиксируем стоимость услуги, чтобы исключить любые доплаты за использование ножниц или мытье головы.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 mt-6 lg:mt-0">
                            <motion.button
                                onClick={onBooking}
                                whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(200,164,90,0.3)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-accent hover:bg-accent-hover text-brand-950 font-bold uppercase tracking-widest py-6 px-6 border border-accent transition-all duration-300 shadow-[0_10px_40px_rgba(200,164,90,0.2)]"
                            >
                                Выбрать Мастера
                            </motion.button>

                            <p className="text-center text-xs text-brand-300 font-medium uppercase tracking-wider mt-4">
                                *Отмена бесплатно за 2 часа
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormCTA;
