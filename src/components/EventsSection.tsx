import { motion } from "framer-motion";

export default function EventsSection() {
  return (
    <section className="py-24 px-6 bg-[#f5efe6] text-center">

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-serif text-teal-900 mb-20 tracking-wide"
      >
        Events
      </motion.h2>

      <div className="space-y-20">

        {/* ================= CHENNAI ================= */}
        <BorderCard>

          <h3 className="text-5xl md:text-4xl font-script text-teal-800 mb-3">
            Reception & Wedding
          </h3>

          <p className="text-3xl text-amber-600 font-serif mb-6 tracking-wide">
            Chennai
          </p>

          <p className="text12xl font-serif text-gray-800">
            Reception — 19 April 2026
          </p>
          <p className="text-12xl text-gray-600 mb-3">
            6:30 PM onwards
          </p>

          <p className="text-base font-serif text-gray-800 mt-3">
            Wedding — 20 April 2026
          </p>
          <p className="text-sm text-gray-600 mb-5">
            6:00 AM – 7:30 AM
          </p>

          <p className="text-teal-900 font-serif text-base mb-1">
            ECR VGP Golden Beach
          </p>

          <p className="text-sm text-gray-600 mb-6">
            Valluvar Gardens, Injambakkam, Chennai
          </p>

          <a
            href="https://www.google.com/maps?q=VGP+Golden+Beach+Chennai"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm px-6 py-2 border border-teal-800 
              text-teal-800 rounded-full font-serif
              hover:bg-teal-800 hover:text-white transition
            "
          >
            View Location
          </a>

        </BorderCard>

        {/* ================= COIMBATORE ================= */}
        <BorderCard>

          <h3 className="text-5xl md:text-4xl font-script text-teal-800 mb-3">
            Reception
          </h3>

          <p className="text-3xl text-amber-600 font-serif mb-6 tracking-wide">
            Coimbatore
          </p>

          <p className="text-12xl font-serif text-gray-800">
            22 April 2026
          </p>

          <p className="text-sm text-gray-600 mb-5">
            6:30 PM onwards
          </p>

          <p className="text-teal-900 font-serif text-base mb-1">
            Guna Hall, Hotel Anandhaas
          </p>

          <p className="text-sm text-gray-600 mb-6">
            Puliyakulam Road, Coimbatore - 641037
          </p>

          <a
            href="https://www.google.com/maps?q=Guna+Hall+Coimbatore"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm px-6 py-2 border border-teal-800 
              text-teal-800 rounded-full font-serif
              hover:bg-teal-800 hover:text-white transition
            "
          >
            View Location
          </a>

        </BorderCard>

      </div>
    </section>
  );
}


/* ================= PREMIUM BORDER CARD ================= */

function BorderCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="
        relative 
        w-full max-w-[500px]   /* ✅ SAME SIZE FOR ALL */
        h-[600px]              /* ✅ FIXED HEIGHT */
        mx-auto
        flex items-center justify-center
      "
    >

      {/* BORDER */}
      <img
        src="/gold-border.png"
        alt="border"
        className="
          absolute inset-0 w-full h-full object-contain
          pointer-events-none
          scale-[1.08]   /* ✅ Slightly bigger */
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 px-10 text-center leading-relaxed">
        {children}
      </div>

    </motion.div>
  );
}