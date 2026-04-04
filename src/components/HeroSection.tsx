import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {

  const [showHint, setShowHint] = useState(false);

  /* 🔥 SHOW SCROLL POPUP AFTER DELAY */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);

      // auto hide after 4 sec
      setTimeout(() => setShowHint(false), 4000);

    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen flex items-start justify-center text-center ...">

      {/* BORDER IMAGE */}
      <img
        src="/border.png"
        alt="border"
        className="
          absolute top-0 left-0 w-full h-full
          object-cover
          object-top
          pointer-events-none
          scale-[1.05]
          md:hidden
        "
      />

      {/* FADE */}
      <div className="absolute bottom-0 w-full h-28 bg-gradient-to-b from-transparent to-[#f5efe6]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-2xl px-4 pt-24 md:pt-24">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm tracking-widest text-gray-600 font-serif mb-2"
        >
          Wedding Invitation
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-gray-500 font-serif mb-6"
        >
          Together with our families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-5xl md:text-7xl font-script text-teal-800"
        >
          L. Preethi
        </motion.h1>

        <motion.p className="text-3xl my-3 font-script text-gray-500">
          &
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-5xl md:text-7xl font-script text-teal-800"
        >
          S. Pravin Bala
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "5rem" }}
          transition={{ delay: 1.4 }}
          className="h-[1px] bg-gray-400 my-6 mx-auto"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-base text-gray-700 font-serif leading-relaxed"
        >
          With love and joy, we invite you to celebrate our wedding and share this beautiful beginning with us.
        </motion.p>
      </div>

      {/* 👇 ALWAYS VISIBLE SCROLL ARROW */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-teal-800 text-xl"
      >
        ↓
      </motion.div>

      {/* 🔥 POPUP SCROLL HINT */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="
              fixed bottom-16 left-1/2 -translate-x-1/2
              bg-teal-800 text-white
              px-6 py-3 rounded-full
              shadow-lg
              text-sm font-serif
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