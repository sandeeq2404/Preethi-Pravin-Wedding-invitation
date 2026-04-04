import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= PREMIUM UNIT ================= */

// Removed TypeScript to fix syntax errors in standard .jsx environments
const Unit = React.memo(({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Responsive sizing applied: 
        Mobile: w-[62px] h-[70px]
        Tablet/Desktop: w-[100px] h-[110px] 
      */}
      <div className="relative w-[62px] sm:w-[80px] md:w-[100px] h-[70px] sm:h-[90px] md:h-[110px] flex items-center justify-center overflow-hidden bg-slate-50 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
        <AnimatePresence>
          <motion.span
            key={value}
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
              mass: 1
            }}
            className="absolute text-4xl sm:text-5xl md:text-7xl font-serif text-teal-900"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="text-[9px] sm:text-xs md:text-sm tracking-[0.15em] md:tracking-[0.3em] uppercase text-gray-400 mt-3 md:mt-4 font-medium">
        {label}
      </span>
    </div>
  );
});

/* ================= MAIN COMPONENT ================= */

export default function CountdownTimer() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Grouped state for cleaner updates
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
  setIsMounted(true);

  const weddingDate = new Date("2026-04-20T06:00:00+05:30").getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff > 0) {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(prev => ({
        days: prev.days !== d ? d : prev.days,
        hours: prev.hours !== h ? h : prev.hours,
        minutes: prev.minutes !== m ? m : prev.minutes,
        seconds: s // only this updates every second
      }));
    }
  };

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);

  return () => clearInterval(interval);
}, []);

  if (!isMounted) return null;

  return (
    // Added overflow-hidden to the section to ensure nothing ever causes horizontal scroll
    <section className="py-16 md:py-24 px-2 sm:px-6 bg-[#f8f3eb] text-center w-full overflow-hidden">
      
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-serif text-teal-900 mb-3 md:mb-4"
      >
        Counting Down
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-gray-500 font-serif italic text-base md:text-lg mb-10 md:mb-16"
      >
        Until we say "I do"
      </motion.p>

      {/* NUMBERS */}
      {/* Adjusted gaps (gap-1 on mobile, gap-8 on desktop) to fit all screens */}
      <div className="flex justify-center items-center max-w-full mx-auto gap-1 sm:gap-4 md:gap-8">
        <Unit value={timeLeft.days} label="Days" />
        <span className="text-xl sm:text-3xl md:text-5xl text-teal-900/30 font-serif -mt-6 md:-mt-8 px-1 sm:px-0">:</span>
        <Unit value={timeLeft.hours} label="Hours" />
        <span className="text-xl sm:text-3xl md:text-5xl text-teal-900/30 font-serif -mt-6 md:-mt-8 px-1 sm:px-0">:</span>
        <Unit value={timeLeft.minutes} label="Minutes" />
        <span className="text-xl sm:text-3xl md:text-5xl text-teal-900/30 font-serif -mt-6 md:-mt-8 px-1 sm:px-0">:</span>
        <Unit value={timeLeft.seconds} label="Seconds" />
      </div>

    </section>
  );
}