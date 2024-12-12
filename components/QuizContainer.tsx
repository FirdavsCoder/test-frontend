'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Timer from './Timer'
import TrueFalseQuestion from './TrueFalseQuestion'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'
import MatchingQuestion from './MatchingQuestion'
import CompleteSentenceQuestion from './CompleteSentenceQuestion'
import Results from './Results'
import { CheckCircle, HelpCircle, GitCompare, PenTool } from 'lucide-react'


const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'truefalse':
        return CheckCircle
      case 'multiplechoice':
        return HelpCircle
      case 'matching':
        return GitCompare
      case 'completesentence':
        return PenTool
      default:
        return HelpCircle
    }
}

export default function QuizContainer() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [timeUp, setTimeUp] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('/api/questions');
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Savollarni yuklashda xatolik:', error);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeUp || currentQuestion >= questions.length) {
      // Quiz ended, calculate results
    }
  }, [timeUp, currentQuestion, questions.length])

  const handleAnswer = (answer: any) => {
    setAnswers([...answers, answer])
    setCurrentQuestion(currentQuestion + 1)
  }

  const renderQuestionContent = (question: any) => {
    switch (question.type) {
      case 'truefalse':
        return <TrueFalseQuestion question={question.question} onAnswer={handleAnswer} />
      case 'multiplechoice':
        return <MultipleChoiceQuestion question={question.question} options={question.options} onAnswer={handleAnswer} />
      case 'matching':
        return <MatchingQuestion pairs={question.pairs} onAnswer={handleAnswer} />
      case 'completesentence':
        return <CompleteSentenceQuestion question={question.question} onAnswer={handleAnswer} />
      default:
        return null
    }
  }

  const renderQuestion = () => {
    const question = questions[currentQuestion]
    const Icon = getQuestionIcon(question.type)
    return (
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Icon className="w-6 h-6 text-purple-300" />
          <h2 className="text-xl font-semibold text-white">{question.question}</h2>
        </div>
        {renderQuestionContent(question)}
      </motion.div>
    )
  }

  if (loading) {
    return <div className="text-white">Savollar yuklanmoqda...</div>;
  }

  if (timeUp || currentQuestion >= questions.length) {
    return <Results answers={answers} questions={questions} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-md p-8 rounded-lg shadow-lg max-w-2xl w-full"
    >
      <Timer duration={3600} onTimeUp={() => setTimeUp(true)} />
      <div className="mb-4 text-lg font-semibold text-white flex justify-between items-center">
        <span>Savol {currentQuestion + 1} / {questions.length}</span>
        <motion.div 
          className="h-2 bg-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <AnimatePresence mode="wait">
        {renderQuestion()}
      </AnimatePresence>
    </motion.div>
  )
}

