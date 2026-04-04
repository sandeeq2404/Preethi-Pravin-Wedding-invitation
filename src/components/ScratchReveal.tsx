import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScratchCircle from "./ScratchCircle";

/* ================= CONFETTI ================= */
const Confetti = () => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {[...Array(70)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -100,
            x: Math.random() * width,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: height + 100,
            rotate: 360,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 1.5,
          }}
          className="absolute"
          style={{
            width: `${6 + Math.random() * 6}px`,
            height: `${10 + Math.random() * 10}px`,
            backgroundColor: ["#d4af37", "#b91c1c", "#0f766e"][i % 3],
            borderRadius: "2px",
          }}
        />
      ))}
    </div>
  );
};

/* ================= MAIN ================= */
export default function ScratchReveal() {
  const [count, setCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);

  /* 🔥 POPUP HINT */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 4000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /* 🔥 HANDLE SCRATCH */
  const handleReveal = () => {
    setCount((prev) => {
      const next = prev + 1;

      if (next === 3) {
        setShowConfetti(true);

        // 🎉 hide confetti
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);

        // 📜 auto scroll to countdown
        setTimeout(() => {
          const el = document.getElementById("countdown");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 800);
      }

      return next;
    });
  };

  return (
    <section className="py-24 px-6 bg-[#f5efe6] text-center relative overflow-hidden">

      {/* TITLE */}
      <h2 className="text-4xl md:text-5xl font-script text-teal-800 mb-6">
        Reveal the Date
      </h2>

      <p className="font-serif text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
        A special moment awaits you. Gently unveil each piece to discover the day we begin our beautiful journey together.
      </p>

      {/* 🔥 CENTERED SCRATCH */}
      <div className="flex justify-center items-center gap-6 md:gap-10 px-4">
        <ScratchCircle value="20" onReveal={handleReveal} />
        <ScratchCircle value="APR" onReveal={handleReveal} />
        <ScratchCircle value="2026" onReveal={handleReveal} />
      </div>

      {/* FINAL MESSAGE */}
      <AnimatePresence>
        {count === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <p className="text-2xl font-serif text-teal-900">
              We look forward to celebrating this beautiful day with you
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎉 CONFETTI */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      

    </section>
  );
}