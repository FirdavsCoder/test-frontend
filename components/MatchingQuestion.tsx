'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MatchingQuestion({ pairs, onAnswer }: { pairs: string[][]; onAnswer: (answer: string[][]) => void }) {
  const [matches, setMatches] = useState<{ [key: string]: string }>({})

  const handleMatch = (left: string, right: string) => {
    setMatches(prev => ({ ...prev, [left]: right }))
  }

  const handleSubmit = () => {
    if (Object.keys(matches).length === pairs.length) {
      onAnswer(Object.entries(matches))
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Quyidagilarni moslashtiring:</h2>
      {pairs.map(([left], index) => (
        <div key={index} className="flex items-center space-x-2">
          <span className="text-white">{left}</span>
          <Select onValueChange={(value) => handleMatch(left, value)}>
            <SelectTrigger className="bg-transparent border-white text-white">
              <SelectValue placeholder="Tanlang" />
            </SelectTrigger>
            <SelectContent>
              {pairs.map(([, right], rightIndex) => (
                <SelectItem key={rightIndex} value={right}>
                  {right}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      <Button 
        onClick={handleSubmit} 
        disabled={Object.keys(matches).length !== pairs.length}
        className="bg-purple-600 hover:bg-purple-700 text-white mt-4"
      >
        Javoblarni yuborish
      </Button>
    </div>
  )
}

