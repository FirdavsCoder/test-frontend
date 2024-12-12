import { useState } from 'react'
import { Trophy, Save, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Results({ answers, questions }: { answers: any[]; questions: any[] }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState('');

  const correctAnswers = answers.filter((answer, index) => {
    const question = questions[index];
    switch (question.type) {
      case 'truefalse':
      case 'multiplechoice':
      case 'completesentence':
        return answer === question.answer;
      case 'matching':
        return JSON.stringify(answer.sort()) === JSON.stringify(question.pairs.sort());
      default:
        return false;
    }
  }).length;

  const score = (correctAnswers / questions.length) * 100;

  const saveResults = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          answers,
          totalQuestions: questions.length,
          correctAnswers,
          score,
        }),
      });

      if (response.ok) {
        setSaved(true);
      } else {
        console.error('Natijalarni saqlashda xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Natijalarni saqlashda xatolik:', error);
    }
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-md p-8 rounded-lg shadow-lg max-w-2xl w-full text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 10 }}
      >
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
      </motion.div>
      <h2 className="text-3xl font-bold mb-4 text-white">Test Natijalari</h2>
      <p className="text-xl mb-2 text-blue-200">
        Siz {questions.length} savoldan {correctAnswers} tasiga togri javob berdingiz.
      </p>
      <motion.div
        className="text-4xl font-semibold mb-6 text-blue-300 flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <span>Sizning ballingiz: {score.toFixed(2)}%</span>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 10 }}
        >
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-8 h-8 inline-block ml-2 ${
                index < Math.round(score / 20) ? 'text-yellow-400' : 'text-gray-400'
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ism-familiyangizni kiriting"
        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
      />
      {!saved && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={saveResults}
          disabled={saving || !name}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center space-x-2 mx-auto disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? 'Saqlanmoqda...' : 'Natijalarni saqlash'}</span>
        </motion.button>
      )}
      {saved && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-green-300 font-semibold mt-4"
        >
          Natijalar muvaffaqiyatli saqlandi!
        </motion.p>
      )}
    </motion.div>
  );
}

