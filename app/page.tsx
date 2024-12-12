import QuizContainer from '@/components/QuizContainer'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <AnimatedBackground />
      <div className="z-10 relative">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Manga Test Challenge
        </h1>
        <QuizContainer />
      </div>
    </main>
  )
}

