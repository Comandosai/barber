import { motion, type Variants } from 'framer-motion';
import { ShieldCheck, Activity, Layers, Crosshair, Award, Clock } from 'lucide-react';

const BentoServices = () => {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    return (
        <section className="py-24 px-4 md:px-12 bg-brand-950 relative">
            {/* Subtle ambient gold glow */}
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto">

                {/* Trust Section inside Bento Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    <motion.div variants={item} className="rounded border border-brand-700/50 bg-brand-900 p-8 flex flex-col justify-between group hover:border-accent/50 transition-colors duration-300">
                        <Award className="w-10 h-10 text-accent group-hover:text-accent-hover transition-colors mb-4" />
                        <div>
                            <h3 className="text-3xl font-serif font-bold text-brand-50 uppercase tracking-tight mb-2">7+ лет</h3>
                            <p className="text-brand-300 text-sm font-medium leading-relaxed">минимальный стаж наших мастеров, чтобы исключить риск «неделю ходить в шапке».</p>
                        </div>
                    </motion.div>
                    <motion.div variants={item} className="rounded border border-brand-700/50 bg-brand-900 p-8 flex flex-col justify-between group hover:border-accent/50 transition-colors duration-300">
                        <ShieldCheck className="w-10 h-10 text-accent group-hover:text-accent-hover transition-colors mb-4" />
                        <div>
                            <h3 className="text-3xl font-serif font-bold text-brand-50 uppercase tracking-tight mb-2">100% стерильность</h3>
                            <p className="text-brand-300 text-sm font-medium leading-relaxed">вскрываем крафт-пакеты с инструментами из сухожара прямо при вас.</p>
                        </div>
                    </motion.div>
                    <motion.div variants={item} className="rounded border border-brand-700/50 bg-brand-900 p-8 flex flex-col justify-between group hover:border-accent/50 transition-colors duration-300">
                        <Clock className="w-10 h-10 text-accent group-hover:text-accent-hover transition-colors mb-4" />
                        <div>
                            <h3 className="text-3xl font-serif font-bold text-brand-50 uppercase tracking-tight mb-2">28 дней</h3>
                            <p className="text-brand-300 text-sm font-medium leading-relaxed">столько стрижка сохраняет четкий контур за счет точного анатомического среза ножницами.</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Services Section inside Bento Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]"
                >
                    {/* Main Service block (Large) — with photo */}
                    <motion.div variants={item} className="md:col-span-8 row-span-2 rounded border border-brand-700/50 bg-brand-900 flex flex-col justify-between group hover:border-accent/30 transition-colors duration-300 relative overflow-hidden">
                        {/* Background image */}
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200&q=80&auto=format&fit=crop"
                                alt="Precision haircut"
                                className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/80 to-transparent"></div>
                        </div>

                        <div className="relative z-10 p-10 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <div className="px-4 py-1 border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                                    Флагман
                                </div>
                                <Activity className="w-8 h-8 text-brand-700" />
                            </div>

                            <div className="mt-auto">
                                <h3 className="text-4xl md:text-5xl font-serif font-extrabold text-brand-50 mb-6 tracking-tight uppercase">Комплекс «Умная стрижка»</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-brand-700/50 pt-6">
                                    <div>
                                        <span className="text-xs font-bold text-brand-300 uppercase tracking-widest block mb-2">Боль</span>
                                        <p className="text-brand-200 font-medium leading-relaxed text-sm">Стрижка выглядит хорошо только при выходе из барбершопа, а на третий день «рассыпается».</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2">Результат</span>
                                        <p className="text-brand-200 font-medium leading-relaxed text-sm">Выполняем срез с учетом костной структуры черепа. Голова выглядит аккуратно сразу после мытья, без использования фена и липких стайлингов.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Comm block (Tall) */}
                    <motion.div variants={item} className="md:col-span-4 row-span-2 border border-brand-700/50 rounded bg-brand-800 text-brand-50 p-8 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute right-0 bottom-0 w-full h-1/2 bg-accent/5 [clip-path:polygon(100%_0%,100%_100%,0%_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <Layers className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-3xl font-serif font-bold tracking-tight uppercase mb-8">Стрижка без парикмахерского словаря</h3>

                            <div className="space-y-6">
                                <div>
                                    <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest block mb-2">Боль</span>
                                    <p className="text-brand-200 text-sm leading-relaxed">Страх выглядеть некомпетентным, не зная слов «фейд» или «тейпер».</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-2">Результат</span>
                                    <p className="text-brand-200 text-sm leading-relaxed">Мастер сам задаст 3 уточняющих вопроса и покажет фото-референсы, чтобы вы получили именно тот образ, который представили.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Beard Block (Wide) — with photo */}
                    <motion.div variants={item} className="md:col-span-12 row-span-1 rounded border border-brand-700/50 bg-brand-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-accent/30 transition-colors duration-300 relative overflow-hidden">
                        {/* Background image */}
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200&q=80&auto=format&fit=crop"
                                alt="Beard grooming"
                                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/90 to-brand-900/60"></div>
                        </div>

                        <div className="relative z-10 p-8 max-w-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <Crosshair className="w-6 h-6 text-accent" />
                                <h3 className="text-2xl font-serif font-bold text-brand-50 uppercase tracking-tight">Моделирование бороды с контролем длины</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 border-t border-brand-700/50 pt-6">
                                <div>
                                    <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest block mb-2">Боль</span>
                                    <p className="text-brand-200 text-sm font-medium">Страх, что мастер уберет лишнее и придется отращивать бороду 3 месяца.</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-2">Результат</span>
                                    <p className="text-brand-200 text-sm font-medium">Согласовываем каждый сантиметр перед срезом. Четкие контуры опасной бритвой и сохранение вашей привычной длины.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default BentoServices;
