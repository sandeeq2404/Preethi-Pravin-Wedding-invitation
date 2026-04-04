import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onReveal: () => void;
};

export default function ScratchCircle({ value, onReveal }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 🎨 GOLD GRADIENT (premium look)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

gradient.addColorStop(0, "#d4af37");   // gold
gradient.addColorStop(0.9, "#f8f8f8"); // silver shine
gradient.addColorStop(1, "#c0c0c0");   // silver

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      scratch(x, y);

      // 🔍 Calculate scratched %
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let cleared = 0;

      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) cleared++;
      }

      const percent = cleared / (canvas.width * canvas.height);

      // 🎯 AUTO REVEAL
      if (percent > 0.4 && !revealed) {
        setRevealed(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        document.body.style.overflow = ""; // ✅ ALWAYS UNLOCK SCROLL
        onReveal();
      }
    };

    const start = () => {
      isDrawing = true;
      document.body.style.overflow = "hidden"; // 🚫 lock scroll
    };

    const end = () => {
      isDrawing = false;
      document.body.style.overflow = ""; // ✅ unlock scroll safely
    };

    // 🖱 POINTER EVENTS
    canvas.addEventListener("pointerdown", start);
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointerleave", end);
    canvas.addEventListener("pointercancel", end); // 🔥 important
    canvas.addEventListener("pointermove", handlePointerMove);

    // 📱 MOBILE SCROLL FIX
    const preventTouchScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    canvas.addEventListener("touchmove", preventTouchScroll, {
      passive: false,
    });

    return () => {
      // 🔥 ALWAYS CLEANUP
      document.body.style.overflow = "";

      canvas.removeEventListener("pointerdown", start);
      canvas.removeEventListener("pointerup", end);
      canvas.removeEventListener("pointerleave", end);
      canvas.removeEventListener("pointercancel", end);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("touchmove", preventTouchScroll);
    };
  }, [revealed, onReveal]);

  return (
    <div className="relative w-28 h-28 flex items-center justify-center touch-none">

      {/* TEXT UNDER SCRATCH */}
      <span className="absolute text-2xl font-serif text-teal-900">
        {value}
      </span>

      {/* SCRATCH LAYER */}
      {!revealed && (
        <canvas
          ref={canvasRef}
          width={120}
          height={120}
          className="absolute rounded-full shadow-lg cursor-pointer"
        />
      )}
    </div>
  );
}