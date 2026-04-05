import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import HeroSection from "./components/HeroSection";
import CountdownTimer from "./components/CountdownTimer";
import EventsSection from "./components/EventsSection";
import MapSection from "./components/MapSection";
import EnvelopeLanding from "./components/EnvelopeLanding";
import ScratchReveal from "./components/ScratchReveal";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [entered, setEntered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  /* ================= HANDLE OPEN ================= */
  const handleOpen = () => {
    setEntered(true);
    setLoading(true);

    // 🎵 play music
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
    }
    

    // 🖼️ PRELOAD IMAGES (IMPORTANT)
    const images = [
      "/border.png",
      "/gold-border.png",
      "/peacock.png"
    ];

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // ⏳ LOADING DELAY (smooth UX)
    setTimeout(() => {
      setLoading(false);
    }, 5500);
  };

  /* ================= SOUND ================= */
  const toggleSound = () => {
    if (!audioRef.current) return;

    const newMuted = !muted;
    audioRef.current.muted = newMuted;
    setMuted(newMuted);
  };

  return (
    <div className="bg-[#f5efe6] text-gray-800 relative overflow-hidden">

      {/* AUDIO */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* ENVELOPE */}
      {!entered && <EnvelopeLanding onOpen={handleOpen} />}

      {/* 🔥 LOADING SCREEN */}
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      {entered && !loading && (
        <>
          <HeroSection />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <ScratchReveal />
            <CountdownTimer />
            <EventsSection />
            <MapSection />

            {/* FOOTER */}
            <footer className="bg-[#0f3d3e] text-white py-12 px-6 text-center">
              <h3 className="text-4xl font-script text-amber-200 mb-4">
                S. Pravin Bala & L. Preethi
              </h3>

              <p className="text-teal-100 mb-6 font-serif">
                We look forward to celebrating with you
              </p>

              <p className="text-sm text-teal-200">
                20th April 2026
              </p>
            </footer>
          </motion.div>

          {/* 🔊 SOUND BUTTON */}
          <button
            onClick={toggleSound}
            className="
              fixed bottom-6 right-6 z-50 
              bg-teal-800 hover:bg-teal-900 
              text-white px-4 py-3 rounded-full 
              shadow-lg transition-all
            "
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;