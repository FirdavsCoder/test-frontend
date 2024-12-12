import { Button } from "@/components/ui/button"

export default function MultipleChoiceQuestion({ question, options, onAnswer }: { question: string; options: string[]; onAnswer: (answer: string) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">{question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Button key={index} onClick={() => onAnswer(option)} className="bg-purple-600 hover:bg-purple-700 text-white">{option}</Button>
        ))}
      </div>
    </div>
  )
}

