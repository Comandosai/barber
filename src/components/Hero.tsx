import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const Hero = ({ onBooking }: { onBooking: () => void }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section
            ref={ref}
            className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
        >
            {/* Subtle background texture */}
            <div className="absolute inset-0 bg-brand-950 z-0"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,164,90,0.06)_0%,transparent_60%)] z-0"></div>

            {/* Gold ambient glows */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute top-20 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                style={{ y: textY, opacity }}
                className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-32 pb-20"
            >
                {/* Left — Text */}
                <div className="flex flex-col items-start gap-8">

                    {/* Gold accent line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-[2px] bg-accent"
                    ></motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-serif leading-[1.05] tracking-tight uppercase"
                    >
                        <span className="block italic font-light text-brand-200 -mb-2">Стрижка, которая</span>
                        <span className="block font-extrabold text-brand-50">держит форму</span>
                        <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-accent">4 недели без укладки.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="text-lg md:text-xl text-brand-200 max-w-xl leading-relaxed font-normal"
                    >
                        Подберем образ под вашу анатомию лица и направление роста волос. Никаких скрытых платежей на кассе и случайного результата.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row items-center gap-6 mt-4 w-full sm:w-auto"
                    >
                        <button onClick={onBooking} className="group relative px-8 py-5 bg-accent hover:bg-accent-hover text-brand-950 w-full sm:w-auto rounded flex items-center justify-center gap-4 transition-all duration-300 hover:pr-6 shadow-[0_10px_40px_rgba(200,164,90,0.25)] font-bold">
                            <span className="tracking-wide uppercase text-sm">Записаться и зафиксировать цену</span>
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* Micro trust badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="flex items-center gap-6 mt-2"
                    >
                        <div className="flex items-center gap-2 text-brand-300 text-xs font-medium">
                            <Sparkles className="w-3.5 h-3.5 text-accent" />
                            <span>7+ лет опыта</span>
                        </div>
                        <div className="w-[1px] h-4 bg-brand-700"></div>
                        <div className="text-brand-300 text-xs font-medium">100% стерильность</div>
                        <div className="w-[1px] h-4 bg-brand-700"></div>
                        <div className="text-brand-300 text-xs font-medium">28 дней формы</div>
                    </motion.div>
                </div>

                {/* Right — Hero Image */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full aspect-[3/4] lg:aspect-[4/5] hidden lg:block"
                >
                    {/* Gold frame decoration */}
                    <div className="absolute -top-3 -left-3 w-24 h-[1px] bg-accent/60"></div>
                    <div className="absolute -top-3 -left-3 h-24 w-[1px] bg-accent/60"></div>
                    <div className="absolute -bottom-3 -right-3 w-24 h-[1px] bg-accent/60"></div>
                    <div className="absolute -bottom-3 -right-3 h-24 w-[1px] bg-accent/60"></div>

                    {/* Main image */}
                    <motion.div
                        style={{ scale: imgScale }}
                        className="w-full h-full overflow-hidden relative"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=85&auto=format&fit=crop"
                            alt="Premium barbershop haircut"
                            className="w-full h-full object-cover object-center"
                        />
                        {/* Subtle gradient overlays for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/30 via-transparent to-transparent"></div>
                    </motion.div>

                    {/* Floating badge on image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="absolute bottom-8 left-8 bg-brand-950/90 backdrop-blur-md border border-accent/30 px-5 py-4 gold-glow z-10"
                    >
                        <div className="flex items-center gap-4">
                            <div>
                                <span className="block text-3xl font-serif font-bold text-accent">28</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-brand-200 uppercase tracking-widest block">дней</span>
                                <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest">сохранения формы</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Rating badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="absolute top-8 right-8 bg-brand-950/90 backdrop-blur-md border border-accent/20 px-4 py-3 z-10"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-serif font-bold text-accent">★</span>
                            <div>
                                <span className="text-sm font-bold text-brand-50">4.9</span>
                                <span className="text-[9px] text-brand-300 block">500+ отзывов</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-[9px] text-brand-300 uppercase tracking-[0.3em]">Узнать больше</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-5 h-8 border border-brand-700 rounded-full flex items-start justify-center p-1"
                >
                    <div className="w-1 h-2 bg-accent rounded-full"></div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
