"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0c0f17] via-[#0b0f1a] to-[#0b0712]" />
      <div className="container mx-auto grid items-center gap-10 px-4 py-10 md:grid-cols-2 md:py-16 lg:py-20">
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Exploramos el futuro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-lg text-white/80 md:text-xl"
          >
            Sin vueltas y con palabras simples
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative flex justify-end"
        >
          <div className="animate-float">
            <Image
              src="/halo-ring-transparent.png"
              alt="Halo futurista"
              width={400}
              height={400}
              className="object-contain drop-shadow-glow"
              priority
            />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .drop-shadow-glow {
          filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.4)) 
                  drop-shadow(0 0 40px rgba(59, 130, 246, 0.3))
                  drop-shadow(0 0 60px rgba(236, 72, 153, 0.2));
        }
      `}</style>
    </section>
  )
}
