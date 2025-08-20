"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GraduationCap, Bot } from "lucide-react"

export default function Dashboard({ onGoToEduvatorbot }: { onGoToEduvatorbot?: () => void }) {
  return (
    <div className="min-h-screen relative bg-black text-white overflow-hidden flex flex-col items-center justify-center px-6">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* Floating Eduvator Shapes */}
      <motion.div
        className="absolute top-20 left-16 text-green-400/50"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <GraduationCap size={100} />
      </motion.div>
      <motion.div
        className="absolute bottom-24 right-20 text-cyan-400/50"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
      >
        <Bot size={120} />
      </motion.div>

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl"
      >
        {/* Eduvator Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Eduvator: The Complete Learning Dashboard
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl mb-10">
          Empowering learners with <span className="text-green-400">AI-driven guidance</span>,  
          <span className="text-cyan-400"> personalized learning</span>, and  
          <span className="text-purple-400"> real-time progress tracking</span> — all in one seamless experience.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
         <Button
  onClick={() => window.location.href = "/eduvatorbot"}
  className="px-8 py-6 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full shadow-lg"
>
  Chat with Eduvator Bot 🤖
</Button>

        </div>
      </motion.div>
    </div>
  )
}
