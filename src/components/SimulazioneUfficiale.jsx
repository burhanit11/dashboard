import { memo, useState } from "react";
import { FaClock, FaTrophy, FaStar, FaLock } from "react-icons/fa";
import useStore from "../store/useStore";

const SECTIONS = [
  { id: "logica", name: "Logica", questions: 10, time: "15m", difficulty: "Medio", maxScore: 250, locked: false },
  { id: "matematica", name: "Matematica", questions: 8, time: "12m", difficulty: "Difficile", maxScore: 200, locked: false },
  { id: "informatica", name: "Informatica", questions: 7, time: "10m", difficulty: "Medio", maxScore: 175, locked: false },
  { id: "cultura", name: "Cultura Generale", questions: 5, time: "8m", difficulty: "Facile", maxScore: 125, locked: true },
];

const SimulazioneUfficiale = memo(function SimulazioneUfficiale() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);
  const user = useStore((s) => s.user);
  const addPoints = useStore((s) => s.addPoints);

  const MOCK_QUESTIONS = [
    {
      id: 1,
      question: "Se A > B e B > C, allora A > C. Questo principio si definisce:",
      options: ["Transitività", "Simmetria", "Riflessività", "Associatività"],
      correct: 0,
      explanation: "La transitività è il principio logico per cui se A è in relazione con B e B con C, allora A è in relazione con C.",
    },
    {
      id: 2,
      question: "In un elenco di 5 numeri, la mediana è:",
      options: ["La media aritmetica", "Il valore centrale quando ordinati", "Il valore più frequente", "La somma diviso 5"],
      correct: 1,
      explanation: "La mediana è il valore che divide esattamente a metà un insieme di numeri ordinati.",
    },
    {
      id: 3,
      question: "Quale struttura dati usa il principio LIFO?",
      options: ["Coda", "Pila (Stack)", "Lista concatenata", "Albero"],
      correct: 1,
      explanation: "Una Pila (Stack) segue il principio LIFO (Last In, First Out): l'ultimo elemento inserito è il primo ad essere rimosso.",
    },
  ];

  if (finished) {
    const correctCount = Object.values(answers).filter((a, i) => a === MOCK_QUESTIONS[i]?.correct).length;
    const percentage = Math.round((correctCount / MOCK_QUESTIONS.length) * 100);
    const pointsEarned = Math.round((correctCount / MOCK_QUESTIONS.length) * (selectedSection?.maxScore || 250));

    return (
      <div className="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out]">
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4">
          <h2 className="text-xl font-bold text-[#2D3154] mb-1">Simulazione Ufficiale</h2>
          <p className="text-sm text-gray-400">Hai completato la simulazione!</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-center max-w-md w-full">
            <div className="w-24 h-24 bg-gradient-to-br from-[#0056D2] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTrophy size={48} color="white" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D3154] mb-4">{selectedSection?.name}</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-3xl font-black text-[#0056D2]">{correctCount}/{MOCK_QUESTIONS.length}</div>
                <div className="text-xs text-gray-400">Risposte corrette</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-3xl font-black text-green-500">+{pointsEarned}</div>
                <div className="text-xs text-gray-400">Punti guadagnati</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} size={20} color={i < Math.ceil(percentage / 20) ? "#fbbf24" : "#e5e7eb"} />
              ))}
            </div>
            <button
              onClick={() => { setFinished(false); setStarted(false); setSelectedSection(null); }}
              className="w-full bg-[#0056D2] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0044AA] transition-colors"
            >
              Torna alle sezioni
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (started && selectedSection) {
    const question = MOCK_QUESTIONS[currentQuestion];
    const selectedAnswer = answers[currentQuestion];
    const isCorrect = selectedAnswer === question?.correct;

    return (
      <div className="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out]">
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-[#2D3154]">{selectedSection.name}</span>
            <span className="text-sm font-bold text-[#0056D2]">
              {currentQuestion + 1}/{MOCK_QUESTIONS.length}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div
              className="h-full bg-[#0056D2] rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / MOCK_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex-1">
          <h3 className="text-lg font-bold text-[#2D3154] mb-6">{question?.question}</h3>

          <div className="space-y-3">
            {question?.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.correct;
              let bgClass = "bg-gray-50 hover:bg-gray-100";
              let borderClass = "border-gray-200";

              if (selectedAnswer !== undefined) {
                if (isCorrectOption) {
                  bgClass = "bg-green-50 border-green-400";
                  borderClass = "border-2";
                } else if (isSelected) {
                  bgClass = "bg-red-50 border-red-400";
                  borderClass = "border-2";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (selectedAnswer === undefined) {
                      setAnswers((a) => ({ ...a, [currentQuestion]: index }));
                      setShowExplanation(true);
                    }
                  }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgClass} ${borderClass} ${selectedAnswer !== undefined ? "cursor-default" : "cursor-pointer"}`}
                  disabled={selectedAnswer !== undefined}
                >
                  <span className="font-medium text-gray-700">{option}</span>
                </button>
              );
            })}
          </div>

          {showExplanation && selectedAnswer !== undefined && (
            <div className={`mt-4 p-4 rounded-xl ${isCorrect ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"}`}>
              <p className="text-sm font-medium mb-1">{isCorrect ? "✅ Corretto!" : "❌ Sbagliato"}</p>
              <p className="text-xs text-gray-600">{question.explanation}</p>
            </div>
          )}

          {selectedAnswer !== undefined && (
            <button
              onClick={() => {
                if (currentQuestion < MOCK_QUESTIONS.length - 1) {
                  setCurrentQuestion((c) => c + 1);
                  setShowExplanation(false);
                } else {
                  const correctCount = Object.values({ ...answers }).filter((a, i) => a === MOCK_QUESTIONS[i]?.correct).length;
                  addPoints(Math.round((correctCount / MOCK_QUESTIONS.length) * selectedSection.maxScore));
                  setFinished(true);
                }
              }}
              className="mt-4 w-full bg-[#0056D2] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0044AA] transition-colors"
            >
              {currentQuestion < MOCK_QUESTIONS.length - 1 ? "Prossima" : "Termina Simulazione"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out]">
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4">
        <h2 className="text-xl font-bold text-[#2D3154] mb-1">Simulazione Ufficiale</h2>
        <p className="text-sm text-gray-400">Scegli una sezione per iniziare</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1">
        {SECTIONS.map((section, index) => (
          <div
            key={section.id}
            className={`bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] animate-[slideInUp_0.4s_ease-out_both] ${section.locked ? "opacity-60" : ""}`}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${section.locked ? "bg-gray-200" : "bg-[#0056D2]/10"}`}>
                  {section.locked ? (
                    <FaLock size={20} color="#9CA3AF" />
                  ) : (
                    <FaClock size={20} color="#0056D2" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#2D3154]">{section.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">{section.questions} domande</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{section.time}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs font-medium text-[#0056D2]">{section.maxScore} pt</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${section.difficulty === "Facile" ? "bg-green-100 text-green-600" : section.difficulty === "Medio" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>
                  {section.difficulty}
                </span>
                {!section.locked && (
                  <button
                    onClick={() => { setSelectedSection(section); setStarted(true); }}
                    className="bg-[#0056D2] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#0044AA] transition-colors"
                  >
                    Inizia
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SimulazioneUfficiale;
