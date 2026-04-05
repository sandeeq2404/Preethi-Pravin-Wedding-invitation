import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 4000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    // Changed flex alignment to items-start to push content higher
    <div className="relative min-h-screen flex items-start justify-center text-center overflow-hidden bg-[#f5efe6]">

      {/* MOBILE BORDER */}
      <img
        src="/border.png"
        alt="mobile-border"
        className="
          absolute inset-0 w-full h-full
          object-cover object-top
          pointer-events-none
          scale-[1.05]
          md:hidden
          z-10
        "
      />

      {/* DESKTOP BACKGROUND */}
      <img
        src="/desktop-banner.png"
        alt="desktop-banner"
        className="
          hidden md:block
          absolute inset-0 w-full h-full
          object-cover object-bottom
          pointer-events-none
          opacity-60
          z-10
        "
      />

      {/* FADE */}
      <div className="absolute bottom-0 w-full h-28 bg-gradient-to-b from-transparent to-[#f5efe6] z-20" />

      {/* CONTENT */}
      {/* Pushed content down slightly with pt-24 so it doesn't hit the absolute top */}
      <div className="relative z-40 max-w-5xl px-4 pt-24 md:pt-32">

        {/* TITLE - Increased size */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg md:text-3xl tracking-widest text-gray-600 font-serif mb-2"
        >
          Wedding Invitation
        </motion.p>

        {/* SUBTITLE - Increased size slightly */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-xl text-gray-500 font-serif mb-6 md:mb-12"
        >
          Together with our families
        </motion.p>

        {/* NAMES */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-script text-teal-800"
          >
            L. Preethi
          </motion.h1>

          <motion.span className="text-3xl md:text-5xl text-gray-500 font-script">
            &
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-script text-teal-800"
          >
            S. Pravin Bala
          </motion.h1>
        </div>

        {/* DIVIDER */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "5rem" }}
          transition={{ delay: 1.4 }}
          className="h-[1px] bg-gray-400 my-6 md:my-12 mx-auto"
        />

        {/* TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-base md:text-2xl text-gray-700 font-serif leading-relaxed max-w-2xl mx-auto"
        >
          With love and joy, we invite you to celebrate our wedding and share this beautiful beginning with us.
        </motion.p>

      </div>

      {/* SCROLL ARROW */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 text-teal-800 text-xl md:text-3xl z-50"
      >
        ↓
      </motion.div>

      {/* POPUP - Ensured it is centered at the bottom */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="
              fixed bottom-32 md:bottom-24 left-1/2 -translate-x-1/2
              bg-teal-800 text-white
              px-6 py-3 md:px-8 md:py-4
              rounded-full shadow-lg
              text-sm md:text-lg font-serif
              z-50
            "
          >
            Scroll to Explore ↓
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}