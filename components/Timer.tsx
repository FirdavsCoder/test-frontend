'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Timer({ duration, onTimeUp }: { duration: number; onTimeUp: () => void }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = 1 - timeLeft / duration

  return (
    <div className="flex items-center space-x-2 text-2xl font-bold mb-4 text-white relative">
      <Clock className="w-6 h-6" />
      <motion.span
        key={timeLeft}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </motion.span>
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-blue-400"
        initial={{ width: 0 }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 1 }}
      />
    </div>
  )
}

