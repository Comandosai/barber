import { motion } from 'framer-motion';

const Masters = () => {
    const masters = [
        {
            name: "Фигаро",
            role: "Старший барбер",
            experience: "30 лет опыта",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop&crop=face",
            desc: "30 лет опыта в парикмахерском искусстве. Гарантирует симметрию и чистый переход на любой форме головы, справляясь с самыми сложными «вихрями» роста волос."
        },
        {
            name: "Бартез",
            role: "Бренд-барбер",
            experience: "Инженер МАИ",
            photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&auto=format&fit=crop&crop=face",
            desc: "В прошлом инженер МАИ, применяет математическую точность в расчетах углов среза. Его стрижки не требуют укладки, так как волосы ложатся по естественным линиям."
        },
        {
            name: "Хелен",
            role: "Бренд-барбер",
            experience: "Эксперт стиля",
            photo: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80&auto=format&fit=crop&crop=face",
            desc: "Эксперт по подбору индивидуального стиля через диалог. Поможет сменить имидж тем, кто «сам не знает, чего хочет», исключая риск того, что мастер сделает стрижку на свой вкус."
        }
    ];

    return (
        <section className="py-24 bg-brand-900 relative px-4 md:px-12 border-y border-brand-700/50 overflow-hidden">
            {/* Decorative vertical lines */}
            <div className="absolute top-0 right-10 w-[1px] h-full bg-brand-700/30"></div>
            <div className="absolute top-0 right-[20%] w-[1px] h-full bg-brand-700/30 hidden md:block"></div>

            {/* Gold ambient */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 mb-6 text-accent text-xs font-bold uppercase tracking-widest">
                        <span className="w-6 h-[1px] bg-accent"></span> Исключить рулетку
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-brand-50 mb-6 uppercase tracking-tight">
                        Команда <br />без лотереи
                    </h2>
                    <p className="text-brand-300 text-lg font-medium">
                        Биографии через результаты. Выбирайте мастера под конкретную техническую или эстетическую задачу.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {masters.map((master, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-brand-800 border border-brand-700/50 p-0 flex flex-col h-full hover:border-accent/40 transition-colors duration-300 relative overflow-hidden"
                        >
                            {/* Photo */}
                            <div className="w-full h-64 overflow-hidden relative">
                                <img
                                    src={master.photo}
                                    alt={master.name}
                                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-800 via-transparent to-transparent"></div>
                                {/* Gold corner accent */}
                                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-accent/40 group-hover:border-accent transition-colors duration-300"></div>
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <h3 className="text-3xl font-serif font-bold text-brand-50 mb-2 uppercase tracking-tight">
                                    {master.name}
                                </h3>

                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-200 bg-brand-700/50 px-2 py-1">{master.role}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-1">{master.experience}</span>
                                </div>

                                <div className="mt-auto border-t border-brand-700/50 pt-6 group-hover:border-accent/20 transition-colors">
                                    <p className="text-brand-300 text-sm font-medium leading-relaxed">
                                        {master.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Masters;
