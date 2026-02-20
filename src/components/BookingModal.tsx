import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Clock } from 'lucide-react';
import { useState, useMemo } from 'react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const masters = [
    { id: 1, name: "Фигаро", role: "Старший барбер", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&crop=face" },
    { id: 2, name: "Бартез", role: "Бренд-барбер", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&auto=format&fit=crop&crop=face" },
    { id: 3, name: "Хелен", role: "Бренд-барбер", photo: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&q=80&auto=format&fit=crop&crop=face" },
];

const services = [
    { id: 1, name: "Стрижка", price: "2 500 ₽", duration: "60 мин" },
    { id: 2, name: "Борода", price: "1 500 ₽", duration: "30 мин" },
    { id: 3, name: "Комплекс (стрижка + борода)", price: "3 500 ₽", duration: "90 мин" },
    { id: 4, name: "Королевское бритьё", price: "2 000 ₽", duration: "45 мин" },
];

// Generate pseudo-random booked slots based on date seed
function getBookedSlots(date: Date, masterId: number): Set<string> {
    const seed = date.getDate() * 31 + date.getMonth() * 12 + masterId * 7;
    const booked = new Set<string>();
    const allSlots = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];

    // Book ~30-50% of slots deterministically
    for (let i = 0; i < allSlots.length; i++) {
        const hash = (seed * (i + 1) * 17 + i * 13) % 100;
        if (hash < 38) {
            booked.add(allSlots[i]);
        }
    }
    return booked;
}

const timeSlots = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];

const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

function getDaysArray(startDate: Date, count: number): Date[] {
    const days: Date[] = [];
    for (let i = 0; i < count; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        days.push(d);
    }
    return days;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
    const [step, setStep] = useState(1); // 1=service, 2=master, 3=datetime, 4=confirm
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [selectedMaster, setSelectedMaster] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [weekOffset, setWeekOffset] = useState(0);
    const [confirmed, setConfirmed] = useState(false);

    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const startOfWeek = useMemo(() => {
        const d = new Date(today);
        d.setDate(d.getDate() + weekOffset * 7);
        return d;
    }, [today, weekOffset]);

    const weekDays = useMemo(() => getDaysArray(startOfWeek, 7), [startOfWeek]);

    const bookedSlots = useMemo(() => {
        if (!selectedDate || !selectedMaster) return new Set<string>();
        return getBookedSlots(selectedDate, selectedMaster);
    }, [selectedDate, selectedMaster]);

    const isPastSlot = (date: Date, time: string) => {
        const now = new Date();
        const [h, m] = time.split(":").map(Number);
        const slotTime = new Date(date);
        slotTime.setHours(h, m, 0, 0);
        return slotTime <= now;
    };

    const handleReset = () => {
        setStep(1);
        setSelectedService(null);
        setSelectedMaster(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setWeekOffset(0);
        setConfirmed(false);
    };

    const handleClose = () => {
        onClose();
        setTimeout(handleReset, 300);
    };

    const handleConfirm = () => {
        setConfirmed(true);
        setTimeout(() => {
            handleClose();
        }, 2500);
    };

    const selectedServiceData = services.find(s => s.id === selectedService);
    const selectedMasterData = masters.find(m => m.id === selectedMaster);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={handleClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-2xl bg-brand-900 border border-brand-700/50 overflow-hidden max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Gold corner decorations */}
                        <div className="absolute top-0 left-0 w-16 h-[1px] bg-accent/50"></div>
                        <div className="absolute top-0 left-0 h-16 w-[1px] bg-accent/50"></div>
                        <div className="absolute bottom-0 right-0 w-16 h-[1px] bg-accent/50"></div>
                        <div className="absolute bottom-0 right-0 h-16 w-[1px] bg-accent/50"></div>

                        {/* Ambient glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>

                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-brand-700/50 relative z-10">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-brand-50 uppercase tracking-tight">Запись</h3>
                                <div className="flex gap-2 mt-2">
                                    {[1, 2, 3, 4].map(s => (
                                        <div
                                            key={s}
                                            className={`h-1 rounded-full transition-all duration-300 ${s <= step
                                                ? 'bg-accent w-8'
                                                : 'bg-brand-700 w-4'
                                                }`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={handleClose}
                                className="w-10 h-10 flex items-center justify-center text-brand-300 hover:text-accent transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto flex-1 relative z-10">
                            <AnimatePresence mode="wait">

                                {/* Step 1: Service */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="text-sm text-brand-300 uppercase tracking-widest font-bold mb-6">Выберите услугу</p>
                                        <div className="space-y-3">
                                            {services.map(service => (
                                                <button
                                                    key={service.id}
                                                    onClick={() => {
                                                        setSelectedService(service.id);
                                                        setStep(2);
                                                    }}
                                                    className={`w-full text-left p-5 border rounded transition-all duration-300 group ${selectedService === service.id
                                                        ? 'border-accent bg-accent/10'
                                                        : 'border-brand-700/50 bg-brand-800 hover:border-accent/30'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <span className="font-semibold text-brand-50 group-hover:text-accent transition-colors">{service.name}</span>
                                                            <span className="flex items-center gap-2 text-brand-300 text-sm mt-1">
                                                                <Clock className="w-3.5 h-3.5" /> {service.duration}
                                                            </span>
                                                        </div>
                                                        <span className="text-accent font-serif font-bold text-lg">{service.price}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Master */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="text-sm text-brand-300 uppercase tracking-widest font-bold mb-6">Выберите мастера</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {masters.map(master => (
                                                <button
                                                    key={master.id}
                                                    onClick={() => {
                                                        setSelectedMaster(master.id);
                                                        setSelectedDate(today);
                                                        setStep(3);
                                                    }}
                                                    className={`text-center p-5 border rounded transition-all duration-300 group ${selectedMaster === master.id
                                                        ? 'border-accent bg-accent/10'
                                                        : 'border-brand-700/50 bg-brand-800 hover:border-accent/30'
                                                        }`}
                                                >
                                                    <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-brand-700 group-hover:border-accent transition-colors">
                                                        <img src={master.photo} alt={master.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="block font-serif font-bold text-brand-50 uppercase tracking-tight">{master.name}</span>
                                                    <span className="block text-[10px] text-brand-300 uppercase tracking-widest mt-1">{master.role}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Date & Time */}
                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="text-sm text-brand-300 uppercase tracking-widest font-bold mb-6">Дата и время</p>

                                        {/* Week navigation */}
                                        <div className="flex items-center justify-between mb-4">
                                            <button
                                                onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
                                                disabled={weekOffset === 0}
                                                className="w-8 h-8 flex items-center justify-center text-brand-300 hover:text-accent disabled:opacity-30 transition-colors"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <span className="text-sm text-brand-200 font-medium">
                                                {weekDays[0].getDate()} – {weekDays[6].getDate()} {monthNames[weekDays[6].getMonth()]}
                                            </span>
                                            <button
                                                onClick={() => setWeekOffset(Math.min(3, weekOffset + 1))}
                                                disabled={weekOffset >= 3}
                                                className="w-8 h-8 flex items-center justify-center text-brand-300 hover:text-accent disabled:opacity-30 transition-colors"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Day selector */}
                                        <div className="grid grid-cols-7 gap-2 mb-6">
                                            {weekDays.map((day, i) => {
                                                const isToday = day.toDateString() === today.toDateString();
                                                const isPast = day < today;
                                                const isSelected = selectedDate?.toDateString() === day.toDateString();
                                                return (
                                                    <button
                                                        key={i}
                                                        disabled={isPast}
                                                        onClick={() => {
                                                            setSelectedDate(day);
                                                            setSelectedTime(null);
                                                        }}
                                                        className={`flex flex-col items-center py-3 rounded text-center transition-all duration-200 ${isPast
                                                            ? 'opacity-30 cursor-not-allowed'
                                                            : isSelected
                                                                ? 'bg-accent text-brand-950'
                                                                : 'bg-brand-800 text-brand-200 hover:bg-brand-700'
                                                            }`}
                                                    >
                                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-brand-950' : 'text-brand-300'}`}>
                                                            {dayNames[day.getDay()]}
                                                        </span>
                                                        <span className={`text-lg font-bold mt-0.5 ${isSelected ? 'text-brand-950' : ''}`}>
                                                            {day.getDate()}
                                                        </span>
                                                        {isToday && (
                                                            <span className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-brand-950' : 'bg-accent'}`}></span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Time slots */}
                                        {selectedDate && (
                                            <div>
                                                <div className="flex items-center gap-4 mb-4 text-[10px] font-bold uppercase tracking-widest">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-3 h-3 rounded bg-brand-800 border border-brand-700"></span>
                                                        <span className="text-brand-300">Свободно</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-3 h-3 rounded bg-red-900/50 border border-red-800/50"></span>
                                                        <span className="text-brand-300">Занято</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-3 h-3 rounded bg-accent"></span>
                                                        <span className="text-brand-300">Ваш выбор</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                                                    {timeSlots.map(time => {
                                                        const isBooked = bookedSlots.has(time);
                                                        const isPast = isPastSlot(selectedDate, time);
                                                        const isSelected = selectedTime === time;
                                                        const isDisabled = isBooked || isPast;

                                                        return (
                                                            <button
                                                                key={time}
                                                                disabled={isDisabled}
                                                                onClick={() => setSelectedTime(time)}
                                                                className={`py-3 px-2 rounded text-sm font-semibold transition-all duration-200 relative ${isSelected
                                                                    ? 'bg-accent text-brand-950 shadow-[0_4px_20px_rgba(200,164,90,0.3)]'
                                                                    : isBooked
                                                                        ? 'bg-red-900/20 text-red-400/60 border border-red-800/30 cursor-not-allowed line-through'
                                                                        : isPast
                                                                            ? 'bg-brand-800/50 text-brand-300/30 cursor-not-allowed'
                                                                            : 'bg-brand-800 text-brand-200 border border-brand-700/50 hover:border-accent/40 hover:text-accent'
                                                                    }`}
                                                            >
                                                                {time}
                                                                {isSelected && (
                                                                    <motion.div
                                                                        layoutId="selected-time"
                                                                        className="absolute inset-0 rounded border-2 border-accent"
                                                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                                    />
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {selectedTime && (
                                            <motion.button
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                onClick={() => setStep(4)}
                                                className="w-full mt-6 bg-accent hover:bg-accent-hover text-brand-950 font-bold uppercase tracking-widest py-4 rounded transition-all duration-300 shadow-[0_10px_30px_rgba(200,164,90,0.2)]"
                                            >
                                                Далее
                                            </motion.button>
                                        )}
                                    </motion.div>
                                )}

                                {/* Step 4: Confirm */}
                                {step === 4 && !confirmed && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="text-sm text-brand-300 uppercase tracking-widest font-bold mb-6">Подтверждение</p>

                                        <div className="bg-brand-800 border border-brand-700/50 rounded p-6 space-y-5">
                                            <div className="flex items-center gap-4">
                                                {selectedMasterData && (
                                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent/30">
                                                        <img src={selectedMasterData.photo} alt={selectedMasterData.name} className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="block font-serif font-bold text-brand-50 uppercase">{selectedMasterData?.name}</span>
                                                    <span className="text-xs text-brand-300">{selectedMasterData?.role}</span>
                                                </div>
                                            </div>

                                            <div className="h-[1px] bg-brand-700/50"></div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest block mb-1">Услуга</span>
                                                    <span className="text-brand-50 font-medium">{selectedServiceData?.name}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest block mb-1">Стоимость</span>
                                                    <span className="text-accent font-serif font-bold text-lg">{selectedServiceData?.price}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest block mb-1">Дата</span>
                                                    <span className="text-brand-50 font-medium">
                                                        {selectedDate?.getDate()} {selectedDate && monthNames[selectedDate.getMonth()]}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest block mb-1">Время</span>
                                                    <span className="text-brand-50 font-medium">{selectedTime}</span>
                                                </div>
                                            </div>

                                            <div className="h-[1px] bg-brand-700/50"></div>

                                            <div className="flex items-center gap-2 text-brand-300 text-xs">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>Длительность: {selectedServiceData?.duration}</span>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleConfirm}
                                            className="w-full mt-6 bg-accent hover:bg-accent-hover text-brand-950 font-bold uppercase tracking-widest py-5 rounded transition-all duration-300 shadow-[0_10px_40px_rgba(200,164,90,0.25)] flex items-center justify-center gap-3"
                                        >
                                            <Check className="w-5 h-5" />
                                            Подтвердить запись
                                        </motion.button>

                                        <p className="text-center text-xs text-brand-300 mt-3">
                                            Бесплатная отмена за 2 часа до визита
                                        </p>
                                    </motion.div>
                                )}

                                {/* Confirmed */}
                                {confirmed && (
                                    <motion.div
                                        key="confirmed"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                                            className="w-20 h-20 bg-accent/10 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-6"
                                        >
                                            <Check className="w-10 h-10 text-accent" />
                                        </motion.div>
                                        <h3 className="text-2xl font-serif font-bold text-brand-50 uppercase mb-3">Вы записаны!</h3>
                                        <p className="text-brand-300">
                                            {selectedDate?.getDate()} {selectedDate && monthNames[selectedDate.getMonth()]} в {selectedTime}
                                        </p>
                                        <p className="text-accent font-medium mt-1">{selectedMasterData?.name} · {selectedServiceData?.name}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Back button (steps 2-4) */}
                        {step > 1 && step <= 4 && !confirmed && (
                            <div className="p-6 pt-0 relative z-10">
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="text-sm text-brand-300 hover:text-accent transition-colors flex items-center gap-1"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Назад
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
