import { Button } from "@/components/ui/button"

export default function TrueFalseQuestion({ question, onAnswer }: { question: string; onAnswer: (answer: boolean) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">{question}</h2>
      <div className="flex space-x-4">
        <Button onClick={() => onAnswer(true)} className="bg-purple-600 hover:bg-purple-700 text-white">Togri</Button>
        <Button onClick={() => onAnswer(false)} className="bg-purple-600 hover:bg-purple-700 text-white">Notogri</Button>
      </div>
    </div>
  )
}

