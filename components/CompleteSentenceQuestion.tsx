'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CompleteSentenceQuestion({ question, onAnswer }: { question: string; onAnswer: (answer: string) => void }) {
  const [answer, setAnswer] = useState('')

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">{question}</h2>
      <Input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Javobingizni shu yerga yozing"
        className="bg-transparent border-white text-white placeholder-gray-300"
      />
      <Button 
        onClick={() => onAnswer(answer)} 
        disabled={!answer}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Yuborish
      </Button>
    </div>
  )
}

