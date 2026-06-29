
"use client"
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { track } from '@vercel/analytics';
// Import the static question bank (100 verified questions). Bundled at build time = no API, no waiting.
import questionsData from "../data/questions.json";

// Shape of a single answer: it holds both English and Farsi text.
interface Answer {
  en: string
  fa: string
}

// Shape of one full question, matching the JSON file.
interface Question {
  id: number
  topic: string
  source: string
  question_en: string
  question_fa: string
  answers: Answer[]
  correct_en: string
  explanation_en: string
  explanation_fa: string
}

// Reads the list of question IDs the user has already answered, from the browser.
// Returns an array of numbers (the IDs). Helper lives outside the component because it uses no component state.
function getSeenQuestions(): number[] {
  // On the server there is no localStorage, so bail out safely instead of crashing.
  if (typeof window === 'undefined') return []
  // Read whatever was saved under the key 'seenQuestions'. localStorage holds strings, so this is a string or null.
  const stored = localStorage.getItem('seenQuestions')
  // If something was saved, turn the string back into an array. If nothing, return an empty list.
  return stored ? JSON.parse(stored) : []
}

// Saves one question ID into the "seen" list in the browser, so it isn't shown again.
// Returns void because its job is a side effect (saving), not producing a value.
function markQuestionSeen(id: number): void {
  // Same server crash guard: no localStorage on the server.
  if (typeof window === 'undefined') return

  // Read the current seen list first, so we add to it instead of overwriting it.
  const seen = getSeenQuestions()

  // Only add this id if it isn't already in the list, to avoid duplicates.
  if (!seen.includes(id)) {
    // Add the new id to the end of the list.
    seen.push(id)
    // Turn the array into a string (localStorage only holds strings) and save it.
    localStorage.setItem('seenQuestions', JSON.stringify(seen))
  }
}

// Picks the questions for one quiz: up to 46 that the user has NOT already seen.
function selectQuizQuestions(): Question[] {
  // Read all 100 questions from the imported JSON. "as Question[]" tells TypeScript the shape.
  const allQuestions = questionsData.questions as Question[]

  // Read the IDs the user has already answered.
  let seen = getSeenQuestions()

  // If the user has seen every question, reset so the quiz cycles instead of running dry.
  if (seen.length >= allQuestions.length) {
    seen = []
    // Clear it from the browser too so the reset is remembered.
    if (typeof window !== 'undefined') {
      localStorage.removeItem('seenQuestions')
    }
  }

  // Keep only questions whose id is NOT in the seen list. This is the no-repeat core.
  const unseen = allQuestions.filter(q => !seen.includes(q.id))

  // Shuffle the unseen questions into a random order.
  const shuffled = unseen.sort(() => Math.random() - 0.5)

  // Take the first 46 (or fewer if fewer remain).
  return shuffled.slice(0, 46)
}

function QuizInner() {

  // Read the lang parameter from the URL (used for UI labels like "Next Question").
  const searchParams = useSearchParams()
  const lang = searchParams.get('lang') || 'en'

  // UI label translations. (The questions themselves always show both languages.)
  const translations = {
    en: {
      title: 'DMV Practice Quiz',
      loading: 'Loading your quiz...',
      correct: '✅ Correct!',
      wrong: '❌ Wrong!',
      nextQuestion: 'Next Question →',
      quizComplete: 'Quiz Complete!',
      tryAgain: 'Try Again',
      questionOf: 'of 46',
    },
    fa: {
      title: 'آزمون تمرینی DMV',
      loading: 'در حال بارگذاری آزمون شما...',
      correct: '✅ درست!',
      wrong: '❌ اشتباه!',
      nextQuestion: 'سوال بعدی ←',
      quizComplete: 'آزمون تمام شد!',
      tryAgain: 'دوباره امتحان کنید',
      questionOf: 'از ۴۶',
    },
    ps: {
      title: ' DMV د جواز ازموینه',
      loading: 'ستاسو ازموینه بارېږي...',
      correct: '✅ سمه ده!',
      wrong: '❌ غلطه ده!',
      nextQuestion: 'بله پوښتنه ←',
      quizComplete: 'ازموینه بشپړه شوه!',
      tryAgain: 'بیا هڅه وکړئ',
      questionOf: 'له ۴۶ څخه',
    }
  }

  // Pick the labels for the current language, defaulting to English.
  const t = translations[lang as keyof typeof translations] || translations.en

  // The 46 questions chosen for this quiz session (picked once from the unseen pool).
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])

  // Which question in the array we're currently showing (0 = first).
  const [currentIndex, setCurrentIndex] = useState(0)

  // The answer text the user clicked (null until they pick one).
  const [selected, setSelected] = useState<string | null>(null)

  // Whether the picked answer was correct.
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Loading screen flag (true until questions are ready).
  const [loading, setLoading] = useState(true)

  // How many questions answered so far.
  const [questionCount, setQuestionCount] = useState(0)

  // How many answered correctly.
  const [score, setScore] = useState(0)

  // Whether the quiz is over.
  const [isFinished, setIsFinished] = useState(false)

  // The question currently on screen is just the array item at our current position.
  const currentQuestion = quizQuestions[currentIndex]

  // Runs once when the quiz page loads.
  useEffect(() => {
    // Analytics: a quiz started.
    track('quiz_started', { language: lang })
    // Pick the 46 unseen questions and store them.
    const selected = selectQuizQuestions()
    setQuizQuestions(selected)
    // No API to wait for, so turn off loading immediately.
    setLoading(false)
    // Empty [] = run only once, on mount.
  }, [])

  // Runs when the user clicks an answer button. Receives the English text of the clicked answer.
  function handleAnswer(answer: string) {
    // Save which answer was clicked.
    setSelected(answer)

    // Correct if the clicked answer's English text matches this question's correct_en.
    const correct = answer === currentQuestion?.correct_en
    setIsCorrect(correct)

    // Compute the new score locally to avoid reading stale state.
    const newScore = correct ? score + 1 : score
    if (correct) setScore(newScore)

    // Mark this question as seen now that it's been answered (so it won't repeat next time).
    if (currentQuestion) markQuestionSeen(currentQuestion.id)

    // Track how many have been answered.
    const answered = questionCount + 1
    setQuestionCount(answered)

    // If that was the 46th answer, finish the quiz.
    if (answered === 46) {
      setIsFinished(true)
      track('quiz_completed', {
        score: newScore,
        total: 46,
        passed: newScore >= 38,
        language: lang,
      })
    }
  }

  // Moves to the next question instantly (no API). Just advances the index and clears the answer state.
  function goToNext() {
    setCurrentIndex(currentIndex + 1)
    setSelected(null)
    setIsCorrect(null)
  }

  // Resets everything for a fresh quiz (picks a new set of 46 unseen questions).
  function restartQuiz() {
    setQuizQuestions(selectQuizQuestions())
    setCurrentIndex(0)
    setScore(0)
    setQuestionCount(0)
    setIsFinished(false)
    setSelected(null)
    setIsCorrect(null)
  }

  // Loading screen.
  if (loading) return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6">🚗</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.loading}</h2>
      </div>
    </main>
  )

  // Results screen.
  if (isFinished) return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden">

        {/* Blue header */}
        <div className="bg-blue-600 px-6 py-5">
          <p className="text-blue-200 text-sm font-medium">Session Complete</p>
          <h1 className="text-white text-2xl font-bold">{t.quizComplete}</h1>
        </div>

        {/* Score circle */}
        <div className="flex flex-col items-center py-8">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke={score >= 38 ? "#22c55e" : "#ef4444"}
                strokeWidth="10"
                strokeDasharray={`${(score / 46) * 314} 314`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${score >= 38 ? 'text-green-600' : 'text-red-500'}`}>
                {score}
              </span>
              <span className="text-gray-400 text-xs">of 46</span>
            </div>
          </div>

          {/* Pass/Fail badge */}
          <div className={`mt-4 px-6 py-1 rounded-full border-2 font-bold text-sm
            ${score >= 38
              ? 'border-green-500 text-green-600'
              : 'border-red-500 text-red-500'}`}>
            {score >= 38 ? 'PASSED' : 'FAILED'}
          </div>
        </div>

        {/* Score breakdown */}
        <div className="mx-6 mb-6 border border-gray-100 rounded-xl overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <span className="text-gray-600">Correct</span>
            <span className="text-green-600 font-bold">{score}</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <span className="text-gray-600">Incorrect</span>
            <span className="text-red-500 font-bold">{questionCount - score}</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-gray-600">DMV Min.</span>
            <span className="text-blue-600 font-bold">38 / 46</span>
          </div>
        </div>

        {/* Try Again button */}
        <div className="px-6 pb-6">
          <button
            onClick={restartQuiz}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            {t.tryAgain}
          </button>
        </div>

      </div>
    </main>
  )

  // Main quiz screen.
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">

        {/* Header with progress count */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {questionCount + 1} {t.questionOf}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((questionCount + 1) / 46) * 100}%` }}>
          </div>
        </div>

        {/* Question in English */}
        <p className="text-lg font-medium text-gray-900 mb-2">{currentQuestion?.question_en}</p>

        {/* Question in Farsi, right-to-left so it reads correctly */}
        <p className="text-lg font-medium text-gray-700 mb-6 text-right" dir="rtl">{currentQuestion?.question_fa}</p>

        <div className="flex flex-col gap-3 w-full">
          {/* Loop over the four answers. Each has both en and fa. */}
          {currentQuestion?.answers.map((answer, index) => (
            <button
              key={answer.en}
              // Pass the English text of this answer to handleAnswer.
              onClick={() => handleAnswer(answer.en)}
              // Disable all buttons once an answer is picked.
              disabled={selected !== null}
              className={`w-full p-3 rounded-xl text-left font-medium transition-colors border shadow-sm flex items-center gap-3
                ${selected === null ? 'border-gray-100 hover:border-blue-300 hover:bg-blue-50'
                  : answer.en === currentQuestion.correct_en
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : selected === answer.en
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 text-gray-400'
                }`}
            >
              {/* Letter label A B C D */}
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                ${selected === null ? 'bg-gray-100 text-gray-600'
                  : answer.en === currentQuestion.correct_en ? 'bg-green-500 text-white'
                  : selected === answer.en ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-400'
                }`}>
                {['A', 'B', 'C', 'D'][index]}
              </span>

              {/* Both languages stacked for each answer */}
              <span className="flex flex-col">
                <span>{answer.en}</span>
                <span dir="rtl" className="text-gray-600">{answer.fa}</span>
              </span>
            </button>
          ))}

          {/* Result + explanation, shown after answering */}
          {selected && (
            <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
              {/* Correct or wrong message */}
              <p className="font-bold text-lg mb-2">{isCorrect ? t.correct : t.wrong}</p>
              {/* Explanation in English */}
              <p className="text-gray-600 mb-1">{currentQuestion?.explanation_en}</p>
              {/* Explanation in Farsi, right-to-left */}
              <p className="text-gray-600 mb-4 text-right" dir="rtl">{currentQuestion?.explanation_fa}</p>
              {/* Move to the next already-loaded question (instant) */}
              <button onClick={goToNext}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">{t.nextQuestion}</button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default function Quiz() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🚗</div>
          <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
        </div>
      </main>
    }>
      <QuizInner />
    </Suspense>
  )
}