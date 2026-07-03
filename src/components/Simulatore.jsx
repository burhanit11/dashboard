import { memo, useState } from "react";
import { FaPlay, FaCheckCircle, FaTimesCircle, FaArrowRight } from "react-icons/fa";
import useStore from "../store/useStore";

const QUESTIONS = [
  {
    id: 1,
    question: "Se tutti i G sono Z e tutti gli Z sono M, allora:",
    options: [
      "Tutti i G sono M",
      "Alcuni G non sono M",
      "Nessuna delle precedenti",
      "Dipende dal contesto",
    ],
    correct: 0,
    explanation: "Per la transitività della relazione 'è un sottoinsieme di', se G ⊆ Z e Z ⊆ M, allora G ⊆ M.",
  },
  {
    id: 2,
    question: "Il teorema di incompletezza di Gödel afferma che:",
    options: [
      "Ogni sistema formale coerente è incompleto",
      "Ogni sistema formale è decidibile",
      "Esistono verità indimostrabili",
      "Sia A che C",
    ],
    correct: 3,
    explanation: "Il teorema afferma che ogni sistema formale coerente che sia abbastanza potente da descrivere l'aritmetica è incompleto, e quindi esistono verità indimostrabili all'interno del sistema.",
  },
  {
    id: 3,
    question: "Qual è la complessità temporale media di QuickSort?",
    options: [
      "O(n)",
      "O(n log n)",
      "O(n²)",
      "O(log n)",
    ],
    correct: 1,
    explanation: "QuickSort ha complessità media O(n log n) anche se nel caso peggiore può degradare a O(n²).",
  },
  {
    id: 4,
    question: "Nel paradosso di Russell, l'insieme R = {x | x ∉ x} porta a:",
    options: [
      "R ∈ R se e solo se R ∉ R",
      "R è l'insieme universale",
      "La teoria degli insiemi è sbagliata",
      "Nessuna contraddizione",
    ],
    correct: 0,
    explanation: "Se R ∈ R, allora per definizione R ∉ R. Se R ∉ R, allora R soddisfa la condizione e R ∈ R. In entrambi i casi otteniamo una contraddizione.",
  },
  {
    id: 5,
    question: "La media aritmetica di 3, 7, 9, 12 è:",
    options: [
      "7.25",
      "7.75",
      "8",
      "7.5",
    ],
    correct: 1,
    explanation: "(3 + 7 + 9 + 12) / 4 = 31 / 4 = 7.75",
  },
];

const Simulatore = memo(function Simulatore() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const addPoints = useStore((s) => s.addPoints);

  const question = QUESTIONS[currentQuestion];

  const handleSelect = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === question.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((c) => c + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const finalScore = score + (selectedAnswer === question.correct ? 0 : 0);
      const pointsEarned = finalScore * 20;
      addPoints(pointsEarned);
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (!started) {
    return (
      <div className="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out]">
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4">
          <h2 className="text-xl font-bold text-[#2D3154] mb-1">Simulatore</h2>
          <p className="text-sm text-gray-400">Metti alla prova le tue conoscenze</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-center max-w-md w-full">
            <div className="w-20 h-20 bg-[#0056D2]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaPlay size={32} color="#0056D2" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D3154] mb-2">Quiz Rapido</h3>
            <p className="text-gray-500 mb-6">
              5 domande di logica e cultura generale. Ogni risposta corretta vale 20 punti!
            </p>
            <button
              onClick={() => setStarted(true)}
              className="w-full bg-[#0056D2] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0044AA] transition-colors flex items-center justify-center gap-2"
            >
              Inizia Simulazione <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out]">
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4">
          <h2 className="text-xl font-bold text-[#2D3154] mb-1">Risultato Simulazione</h2>
          <p className="text-sm text-gray-400">Hai completato il quiz!</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-center max-w-md w-full">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${percentage >= 60 ? "bg-green-100" : "bg-red-100"}`}>
              {percentage >= 60 ? (
                <FaCheckCircle size={48} color="#10B981" />
              ) : (
                <FaTimesCircle size={48} color="#EF4444" />
              )}
            </div>
            <h3 className="text-2xl font-bold text-[#2D3154] mb-2">
              {percentage >= 60 ? "Ottimo lavoro!" : "Continua a studiare!"}
            </h3>
            <p className="text-5xl font-black mb-2" style={{ color: percentage >= 60 ? "#10B981" : "#EF4444" }}>
              {score}/{QUESTIONS.length}
            </p>
            <p className="text-gray-500 mb-2">{percentage}% risposte corrette</p>
            <p className="text-lg font-bold text-[#0056D2] mb-6">+{score * 20} punti guadagnati!</p>
            <button
              onClick={handleRestart}
              className="w-full bg-[#0056D2] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0044AA] transition-colors"
            >
              Riprova
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out]">
      {/* Progress */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-[#2D3154]">Domanda {currentQuestion + 1} di {QUESTIONS.length}</span>
          <span className="text-sm font-bold text-[#0056D2]">Punteggio: {score}/{currentQuestion}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full">
          <div
            className="h-full bg-[#0056D2] rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex-1">
        <h3 className="text-lg font-bold text-[#2D3154] mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct;
            let bgClass = "bg-gray-50 hover:bg-gray-100";
            let borderClass = "border-gray-200";
            let textClass = "text-gray-700";

            if (showResult) {
              if (isCorrect) {
                bgClass = "bg-green-50";
                borderClass = "border-green-400";
                textClass = "text-green-700";
              } else if (isSelected && !isCorrect) {
                bgClass = "bg-red-50";
                borderClass = "border-red-400";
                textClass = "text-red-700";
              }
            } else if (isSelected) {
              bgClass = "bg-blue-50";
              borderClass = "border-blue-400";
              textClass = "text-blue-700";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgClass} ${borderClass}`}
                disabled={showResult}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${borderClass} ${textClass}`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className={`font-medium ${textClass}`}>{option}</span>
                  {showResult && isCorrect && <FaCheckCircle className="ml-auto text-green-500" />}
                  {showResult && isSelected && !isCorrect && <FaTimesCircle className="ml-auto text-red-500" />}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={`mt-4 p-4 rounded-xl ${selectedAnswer === question.correct ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"}`}>
            <p className="text-sm font-medium mb-1">
              {selectedAnswer === question.correct ? "✅ Corretto!" : "❌ Spiegazione:"}
            </p>
            <p className="text-xs text-gray-600">{question.explanation}</p>
          </div>
        )}

        {showResult && (
          <button
            onClick={handleNext}
            className="mt-4 w-full bg-[#0056D2] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0044AA] transition-colors flex items-center justify-center gap-2"
          >
            {currentQuestion < QUESTIONS.length - 1 ? "Prossima Domanda" : "Vedi Risultato"} <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
});

export default Simulatore;
