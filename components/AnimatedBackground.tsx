'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Book, Star, Heart, Zap, Pencil, GraduationCap, Coffee, Clock, Brain, LightbulbIcon as LightBulb, CheckCircle, Trophy } from 'lucide-react'

const smallIcons = [Book, Star, Heart, Zap]
const largeIcons = [Pencil, GraduationCap, Coffee, Clock, Brain, LightBulb, CheckCircle, Trophy]

const AnimatedIcon = ({ Icon, x, y, size }: { Icon: typeof Book; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute text-gray-700 opacity-10"
    style={{ x, y }}
    animate={{
      x: [x - 20, x + 20, x - 20],
      y: [y - 20, y + 20, y - 20],
      rotate: [0, 360],
    }}
    transition={{
      duration: 10 + Math.random() * 10,
      repeat: Infinity,
      repeatType: 'reverse',
    }}
  >
    <Icon size={size} />
  </motion.div>
)

export default function AnimatedBackground() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Brauzer o'lchamlarini olish
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize() // Dastlabki o'lchamlarni olish
    window.addEventListener('resize', handleResize) // O'lcham o'zgarganda qayta hisoblash

    return () => window.removeEventListener('resize', handleResize) // Tozalash
  }, [])

  if (!dimensions.width || !dimensions.height) {
    // Brauzer o'lchamlari mavjud bo'lmaganda hech narsa qaytarmaslik
    return null
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => {
        const Icon = smallIcons[Math.floor(Math.random() * smallIcons.length)]
        return (
          <AnimatedIcon
            key={`small-${i}`}
            Icon={Icon}
            x={Math.random() * dimensions.width}
            y={Math.random() * dimensions.height}
            size={32 + Math.random() * 32}
          />
        )
      })}
      {[...Array(4)].map((_, i) => {
        const Icon = largeIcons[i]
        const side = i % 2 === 0 ? 'left' : 'right'
        const x = side === 'left' ? dimensions.width * 0.1 : dimensions.width * 0.9
        const y = (i < 2 ? 0.3 : 0.7) * dimensions.height
        return (
          <AnimatedIcon
            key={`large-${i}`}
            Icon={Icon}
            x={x}
            y={y}
            size={128 + Math.random() * 64}
          />
        )
      })}
    </div>
  )
}
