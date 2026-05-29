"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

export default function IntroOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadySeen = localStorage.getItem(
      "maystudio_intro_seen"
    );

    if (!alreadySeen) {
      setVisible(true);
    }
  }, []);

  const handleEnter = () => {
    localStorage.setItem(
      "maystudio_intro_seen",
      "true"
    );

    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[999] overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#f6f2ff] via-[#fff0f7] to-[#efe7ff]"
        >
          {/* Glow principal */}
          <div className="absolute w-[700px] h-[700px] bg-[#ff4fa3]/20 blur-3xl rounded-full animate-pulse" />

          {/* Glow secundario */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#4b2ca3]/20 blur-3xl rounded-full" />

          {/* Content */}
          <motion.div
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]"
            >
              <Image
                src="/logo-maystudio.png"
                alt="MayStudio"
                fill
                priority
                sizes="(max-width:768px) 320px, 500px"
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-[#4b2ca3] tracking-tight">
              MayStudio
            </h1>

            <p className="text-pink-500 text-2xl italic mt-3 mb-10">
              a house for fans
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={handleEnter}
              className="bg-[#4b2ca3] hover:bg-[#351f75] text-white px-10 py-4 rounded-full text-lg font-semibold transition duration-300 shadow-2xl"
            >
              Ver catálogo
            </motion.button>
          </motion.div>

          {/* Instagram */}
          <a
            href="https://instagram.com/"
            target="_blank"
            className="absolute bottom-6 right-6 bg-white/70 backdrop-blur-xl border border-white/30 px-5 py-3 rounded-full shadow-xl hover:scale-110 transition font-semibold text-[#4b2ca3]"
          >
            Instagram
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}