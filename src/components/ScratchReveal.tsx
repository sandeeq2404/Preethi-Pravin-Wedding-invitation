import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScratchCircle from "./ScratchCircle";

// 👇 ADD CONFETTI HERE 
const Confetti = () => {
  const height = typeof window !== "undefined" ? window.innerHeight : 800;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -100,
            x: `${Math.random() * 100}vw`, 
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
            backgroundColor: ["#115e59", "#8b4513", "#0d9488", "#92400e"][i % 4],
            borderRadius: "2px",
          }}
        />
      ))}
    </div>
  );
};

export default function ScratchReveal() {
  const [count, setCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleReveal = () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (count === 3) {
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  }, [count]);

  return (
    <section className="py-28 text-center bg-[#f5efe6] relative overflow-hidden">

      <h2 className="text-4xl md:text-5xl font-script text-teal-800 mb-6">
        Reveal the Date
      </h2>

      <p className="font-serif text-gray-600 mb-8 max-w-xl mx-auto px-4">
        A special moment awaits you. Gently unveil each piece to discover
        the day we begin our beautiful journey together.
      </p>

      {/* Button-like instruction tag */}
      <div className="mb-12">
        <p className="inline-block px-6 py-2 rounded-full border border-teal-800/20 bg-teal-800/5 text-teal-800 font-serif text-sm tracking-widest uppercase shadow-sm cursor-default">
          Scratch the cards
        </p>
      </div>

      <div className="flex justify-center gap-6 md:gap-10 px-4">
        <ScratchCircle value="20" onReveal={handleReveal} />
        <ScratchCircle value="APR" onReveal={handleReveal} />
        <ScratchCircle value="2026" onReveal={handleReveal} />
      </div>

      {/* FINAL MESSAGE - Now properly centered and padded */}
      <AnimatePresence>
        {count === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 px-6" /* Added padding here */
          >
            <p className="text-2xl md:text-3xl font-serif text-teal-900 max-w-2xl mx-auto leading-relaxed">
              We look forward to celebrating this beautiful day with you
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONFETTI */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>
      
    </section>
  );
}