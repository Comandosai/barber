import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Reviews = () => {
    const reviews = [
        {
            name: "Владимир К.",
            text: "Лучшее место из тех, что посещал в Москве. Цена полностью оправдана результатом и отсутствием лишнего пафоса."
        },
        {
            name: "Игорь Г.",
            text: "28 лет жил в США, но такого качества работы не встречал. Всё ровно, симметрично и именно так, как я просил."
        },
        {
            name: "Андрей П.",
            text: "Пришел подобрать новый стиль. Остался доволен: мастер не просто подстриг, а объяснил, почему такая форма мне подходит."
        }
    ];

    return (
        <section className="py-24 bg-brand-950 relative px-4 md:px-12 overflow-hidden">
            {/* Gold ambient */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    <div className="lg:col-span-4">
                        <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-brand-50 mb-6 uppercase tracking-tight">Живые <br />Мнения</h2>
                        <p className="text-brand-300 font-medium mb-8">Без фильтров и наигранности. Отзывы клиентов.</p>
                        <div className="flex gap-2 mb-8">
                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                            <span className="w-2 h-2 rounded-full bg-brand-700"></span>
                            <span className="w-2 h-2 rounded-full bg-brand-700"></span>
                        </div>
                        {/* Trust badge */}
                        <div className="inline-flex items-center gap-4 border border-accent/30 bg-accent/5 p-4 gold-glow">
                            <div className="flex flex-col items-center">
                                <div className="text-4xl font-serif font-bold text-accent">4.9</div>
                                <div className="flex gap-0.5 mt-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                                    ))}
                                </div>
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-200">
                                Средняя оценка <br />из 500+ визитов
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                        <motion.div
                            animate={{ x: [0, -1000] }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 25,
                            }}
                            className="flex gap-6 w-max pl-[10%]"
                        >
                            {[...reviews, ...reviews, ...reviews].map((review, i) => (
                                <div
                                    key={i}
                                    className="w-[320px] shrink-0 bg-brand-900 border border-brand-700/50 p-8 flex flex-col justify-between hover:border-accent/30 transition-colors duration-300"
                                >
                                    <div className="flex gap-0.5 mb-4">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} className="w-3.5 h-3.5 fill-accent/60 text-accent/60" />
                                        ))}
                                    </div>
                                    <p className="text-brand-200 font-medium leading-relaxed mb-8">
                                        «{review.text}»
                                    </p>

                                    <div className="border-t border-brand-700/50 pt-6 flex justify-between items-center">
                                        <span className="font-serif font-bold text-brand-50 uppercase tracking-tight">{review.name}</span>
                                        <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Проверен</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Reviews;
