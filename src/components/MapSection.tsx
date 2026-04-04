import { motion } from "framer-motion";

const venues = [
  {
    title: "Chennai Venue",
    place: "ECR VGP Golden Beach",
    address: "Valluvar Gardens, Injambakkam, Chennai",
    map: "https://www.google.com/maps?q=VGP+Golden+Beach+Chennai&output=embed",
    link: "https://www.google.com/maps?q=VGP+Golden+Beach+Chennai",
  },
  {
    title: "Coimbatore Venue",
    place: "Guna Hall, Hotel Anandhaas",
    address: "Puliyakulam Road, Coimbatore - 641037",
    map: "https://www.google.com/maps?q=Guna+Hall+Coimbatore&output=embed",
    link: "https://www.google.com/maps?q=Guna+Hall+Coimbatore",
  },
];

export default function MapSection() {
  return (
    <section className="relative py-24 px-6 bg-[#f8f3eb] text-center overflow-hidden">

      {/* 🔥 TOP BLEND (MATCH PREVIOUS SECTION) */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#f5efe6] to-transparent" />

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-script text-teal-800 mb-16"
      >
        Find Your Way
      </motion.h2>

      {/* VENUES */}
      <div className="space-y-20 max-w-3xl mx-auto">

        {venues.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#fdfaf5] rounded-2xl shadow-lg p-8 border border-[#e6dfd3]"
          >

            {/* TITLE */}
            <h3 className="text-2xl md:text-3xl font-script text-teal-800 mb-2">
              {v.title}
            </h3>

            {/* PLACE */}
            <p className="text-lg text-amber-600 font-serif mb-4">
              {v.place}
            </p>

            {/* ADDRESS */}
            <p className="text-sm text-gray-600 font-serif mb-6">
              {v.address}
            </p>

            {/* MAP */}
            <div className="w-full h-56 rounded-xl overflow-hidden shadow-md mb-6">
              <iframe
                src={v.map}
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>

            {/* BUTTON */}
            <a
              href={v.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block px-6 py-2 border border-teal-800 
                text-teal-800 rounded-full font-serif
                hover:bg-teal-800 hover:text-white transition
              "
            >
              View Location
            </a>

          </motion.div>
        ))}

      </div>

      {/* ✨ SUBTLE BACKGROUND ANIMATION */}
      <motion.div
        className="absolute bottom-10 left-10 opacity-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="w-24 h-24 border border-teal-800 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute top-10 right-10 opacity-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="w-16 h-16 border border-amber-600 rounded-full" />
      </motion.div>

    </section>
  );
}