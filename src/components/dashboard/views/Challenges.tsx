// "use client";

// import { useState, useEffect, useRef } from "react";
// import Card from "../../common/Card";
// import Modal from "@/components/ui/Modal";
// import { useChallenge } from "@/context/ChallengeContext";
// import {
//   ClockIcon,
//   CheckCircleIcon,
//   XCircleIcon,
// } from "@heroicons/react/24/outline";

// interface Challenge {
//   id: number;
//   question: string;
//   type: string;
//   options: Record<string, string> | null;
//   correct_answer: string;
//   difficulty: string;
//   topic: string;
//   userAnswer?: string | null;
// }

// export default function Challenges() {
//   const { setActive } = useChallenge();
//   const [sessionStart, setSessionStart] = useState<Date | null>(null);
//   const [challenges, setChallenges] = useState<Challenge[]>([]);
//   const [answers, setAnswers] = useState<Record<number, string>>({});
//   const [completed, setCompleted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [nextSessionTime, setNextSessionTime] = useState("");

//   // Modal states
//   const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
//     null,
//   );
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [showResultModal, setShowResultModal] = useState(false);
//   const [resultData, setResultData] = useState<{
//     correct: number;
//     wrong: number;
//     total: number;
//     percentage: string;
//     xpEarned: number;
//   } | null>(null);

//   // Timer per question
//   const [secondsLeft, setSecondsLeft] = useState(10);
//   const [timerActive, setTimerActive] = useState(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   // Refs untuk mengurus timeout dan interval
//   const expiryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

//   // Beforeunload warning
//   useEffect(() => {
//     if (!completed && challenges.length > 0 && !loading) {
//       const handler = (e: BeforeUnloadEvent) => {
//         e.preventDefault();
//         e.returnValue = "";
//       };
//       window.addEventListener("beforeunload", handler);
//       return () => window.removeEventListener("beforeunload", handler);
//     }
//   }, [completed, challenges, loading]);

//   // Fetch session on mount
//   useEffect(() => {
//     fetchSession();
//   }, []);

//   // Set challenge active state
//   useEffect(() => {
//     if (!loading && challenges.length > 0 && !completed) {
//       setActive(true);
//     } else {
//       setActive(false);
//     }
//   }, [loading, challenges, completed, setActive]);

//   // Fungsi untuk membersihkan semua timer
//   const clearTimers = () => {
//     if (expiryTimeoutRef.current) {
//       clearTimeout(expiryTimeoutRef.current);
//       expiryTimeoutRef.current = null;
//     }
//     if (countdownIntervalRef.current) {
//       clearInterval(countdownIntervalRef.current);
//       countdownIntervalRef.current = null;
//     }
//   };

//   // Effect untuk mengurus tamat sesi dan paparan masa
//   useEffect(() => {
//     if (!sessionStart) return;

//     // Bersihkan timer lama
//     clearTimers();

//     const start = new Date(sessionStart);
//     const expiry = new Date(start.getTime() + 4 * 60 * 60 * 1000);
//     const now = new Date();
//     const delay = expiry.getTime() - now.getTime();

//     if (delay <= 0) {
//       // Sesi sudah tamat, muat semula segera
//       setTimeLeft("Session expired, refreshing...");
//       fetchSession();
//       return;
//     }

//     // Jadualkan muat semula tepat pada masa tamat
//     expiryTimeoutRef.current = setTimeout(() => {
//       setTimeLeft("Session expired, refreshing...");
//       fetchSession();
//     }, delay);

//     // Kemaskini paparan masa setiap saat
//     countdownIntervalRef.current = setInterval(() => {
//       const now = new Date();
//       const diff = expiry.getTime() - now.getTime();
//       if (diff <= 0) {
//         setTimeLeft("Session expired");
//         // Hentikan interval – muat semula akan dilakukan oleh timeout
//         if (countdownIntervalRef.current) {
//           clearInterval(countdownIntervalRef.current);
//           countdownIntervalRef.current = null;
//         }
//       } else {
//         const hours = Math.floor(diff / (1000 * 60 * 60));
//         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((diff % (1000 * 60)) / 1000);
//         setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
//       }
//     }, 1000);

//     return () => {
//       clearTimers();
//     };
//   }, [sessionStart]); // hanya bergantung pada sessionStart

//   // Countdown untuk sesi seterusnya (selepas tamat)
//   useEffect(() => {
//     if (!completed || !sessionStart) return;
//     const interval = setInterval(() => {
//       const now = new Date();
//       const start = new Date(sessionStart);
//       const nextAvailable = new Date(start.getTime() + 4 * 60 * 60 * 1000);
//       const diff = nextAvailable.getTime() - now.getTime();
//       if (diff <= 0) {
//         setNextSessionTime("Available now!");
//       } else {
//         const hours = Math.floor(diff / (1000 * 60 * 60));
//         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((diff % (1000 * 60)) / 1000);
//         setNextSessionTime(`${hours}h ${minutes}m ${seconds}s`);
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [completed, sessionStart]);

//   const fetchSession = async () => {
//     try {
//       const res = await fetch("/api/challenges/session");
//       if (res.ok) {
//         const data = await res.json();
//         setSessionStart(new Date(data.sessionStart));
//         setChallenges(data.challenges);
//         setAnswers(data.answers || {});
//         setCompleted(data.completed);
//       }
//     } catch (err) {
//       console.error("Failed to fetch session");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startTimer = () => {
//     setSecondsLeft(10);
//     setTimerActive(true);
//     if (timerRef.current) clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setSecondsLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current!);
//           setTimerActive(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const stopTimer = () => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//     setTimerActive(false);
//   };

//   const handleCardClick = (challenge: Challenge) => {
//     if (challenge.userAnswer !== undefined && challenge.userAnswer !== null)
//       return;
//     if (completed) return;

//     setSelectedChallenge(challenge);
//     setShowDetailModal(true);
//     startTimer();
//   };

//   const handleAnswer = async (answer: string) => {
//     if (!selectedChallenge || submitting) return;
//     stopTimer();
//     setSubmitting(true);

//     try {
//       const res = await fetch("/api/challenges/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ challengeId: selectedChallenge.id, answer }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setAnswers((prev) => ({ ...prev, [selectedChallenge.id]: answer }));
//         setChallenges((prev) =>
//           prev.map((c) =>
//             c.id === selectedChallenge.id ? { ...c, userAnswer: answer } : c,
//           ),
//         );
//         setShowDetailModal(false);
//         setSelectedChallenge(null);

//         const answeredCount = Object.keys({
//           ...answers,
//           [selectedChallenge.id]: answer,
//         }).length;
//         if (answeredCount === 10) {
//           // Calculate results
//           const correctCount =
//             challenges.reduce((acc, ch) => {
//               const userAns = answers[ch.id];
//               if (
//                 userAns &&
//                 userAns.toLowerCase().trim() ===
//                   ch.correct_answer.toLowerCase().trim()
//               )
//                 acc++;
//               return acc;
//             }, 0) + (data.correct ? 1 : 0);
//           const wrongCount = 10 - correctCount;
//           const xpEarned = correctCount * 200 + wrongCount * 30;
//           const percentage = ((correctCount / 10) * 100).toFixed(1);
//           setResultData({
//             correct: correctCount,
//             wrong: wrongCount,
//             total: 10,
//             percentage,
//             xpEarned,
//           });
//           setCompleted(true);
//           setShowResultModal(true);
//         }
//       } else {
//         alert(data.error || "Error submitting answer");
//       }
//     } catch (err) {
//       alert("Network error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const closeResultModal = () => {
//     setShowResultModal(false);
//     fetchSession();
//   };

//   if (loading) {
//     return <div className="text-center p-8">Loading challenges...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Challenges
//           </h1>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Solve daily challenges to earn XP. You have 10 seconds per question.
//           </p>
//         </div>
//         <div className="flex items-center gap-2 text-sm">
//           {!completed ? (
//             <>
//               <span className="text-gray-700 dark:text-gray-300">
//                 Session ends in:
//               </span>
//               <span className="font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
//                 {timeLeft}
//               </span>
//             </>
//           ) : (
//             <>
//               <span className="text-gray-700 dark:text-gray-300">
//                 Next session in:
//               </span>
//               <span className="font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
//                 {nextSessionTime}
//               </span>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Challenges Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {challenges.map((ch) => (
//           <div
//             key={ch.id}
//             onClick={() => handleCardClick(ch)}
//             className={`cursor-pointer transition-transform duration-300 hover:scale-105 ${
//               ch.userAnswer || completed ? "opacity-60 pointer-events-none" : ""
//             }`}
//           >
//             <Card hover>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span
//                     className={`px-2 py-1 rounded text-xs ${
//                       ch.difficulty === "Easy"
//                         ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
//                         : ch.difficulty === "Medium"
//                           ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
//                           : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
//                     }`}
//                   >
//                     {ch.difficulty}
//                   </span>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     {ch.topic}
//                   </span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
//                   {ch.question}
//                 </h3>
//                 <div className="flex justify-between items-center">
//                   <span className="text-xs text-blue-600 dark:text-blue-400">
//                     {ch.userAnswer ? "Answered" : "Not started"}
//                   </span>
//                   <span className="text-sm text-blue-600 hover:underline">
//                     {ch.userAnswer ? "View result →" : "Start →"}
//                   </span>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         ))}
//       </div>

//       {/* Challenge Detail Modal with Timer */}
//       <Modal
//         isOpen={showDetailModal}
//         onClose={() => {
//           stopTimer();
//           setShowDetailModal(false);
//           setSelectedChallenge(null);
//         }}
//         title={selectedChallenge?.question || "Challenge"}
//         maxWidth="2xl"
//       >
//         {selectedChallenge && (
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2 text-sm">
//                 <span
//                   className={`px-2 py-1 rounded ${
//                     selectedChallenge.difficulty === "Easy"
//                       ? "bg-green-100 text-green-600"
//                       : selectedChallenge.difficulty === "Medium"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-red-100 text-red-600"
//                   }`}
//                 >
//                   {selectedChallenge.difficulty}
//                 </span>
//                 <span className="text-gray-500">{selectedChallenge.topic}</span>
//               </div>
//               <div className="flex items-center gap-1 text-lg font-mono">
//                 <ClockIcon className="h-5 w-5 text-gray-600" />
//                 <span className={secondsLeft <= 3 ? "text-red-600" : ""}>
//                   {secondsLeft}s
//                 </span>
//               </div>
//             </div>

//             {selectedChallenge.type === "multiple_choice" &&
//               selectedChallenge.options && (
//                 <div className="space-y-2">
//                   {Object.entries(selectedChallenge.options).map(
//                     ([key, value]) => (
//                       <button
//                         key={key}
//                         onClick={() => handleAnswer(key)}
//                         disabled={submitting || secondsLeft === 0}
//                         className="w-full text-left p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
//                       >
//                         <span className="font-medium">{key}:</span>{" "}
//                         {value as string}
//                       </button>
//                     ),
//                   )}
//                 </div>
//               )}

//             {selectedChallenge.type === "true_false" && (
//               <div className="flex gap-4">
//                 <button
//                   onClick={() => handleAnswer("true")}
//                   disabled={submitting || secondsLeft === 0}
//                   className="flex-1 p-3 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 disabled:opacity-50"
//                 >
//                   True
//                 </button>
//                 <button
//                   onClick={() => handleAnswer("false")}
//                   disabled={submitting || secondsLeft === 0}
//                   className="flex-1 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 disabled:opacity-50"
//                 >
//                   False
//                 </button>
//               </div>
//             )}

//             {secondsLeft === 0 && !submitting && (
//               <p className="text-center text-red-600">
//                 Time's up! Please answer.
//               </p>
//             )}
//           </div>
//         )}
//       </Modal>

//       {/* Final Result Modal */}
//       <Modal
//         isOpen={showResultModal}
//         onClose={closeResultModal}
//         title="Session Complete"
//         maxWidth="md"
//       >
//         {resultData && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-3 text-center">
//               <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
//                 <CheckCircleIcon className="h-6 w-6 mx-auto text-green-600" />
//                 <p className="text-lg font-bold text-green-600">
//                   {resultData.correct}
//                 </p>
//                 <p className="text-xs text-gray-600">Correct</p>
//               </div>
//               <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
//                 <XCircleIcon className="h-6 w-6 mx-auto text-red-600" />
//                 <p className="text-lg font-bold text-red-600">
//                   {resultData.wrong}
//                 </p>
//                 <p className="text-xs text-gray-600">Wrong</p>
//               </div>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-blue-600">
//                 {resultData.percentage}%
//               </p>
//               <p className="text-sm text-gray-600">Accuracy</p>
//             </div>
//             <div className="text-center">
//               <p className="text-lg">
//                 XP Earned:{" "}
//                 <span className="font-bold text-yellow-600">
//                   {resultData.xpEarned}
//                 </span>
//               </p>
//             </div>
//             <div className="flex justify-center">
//               <button
//                 onClick={closeResultModal}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import Card from "../common/Card";

export default function ChallengesUnderConstruction() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Challenges
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Test your skills with coding challenges.
        </p>
      </div>

      <Card>
        <div className="flex flex-col items-center text-center py-12 px-4">
          <div className="relative w-32 h-32 mb-6">
            <Image
              src="/atlas.png"
              alt="AtlasFlux Logo"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Challenges – Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            We're preparing a set of exciting coding challenges for you. Stay
            tuned for updates and get ready to test your skills!
          </p>
          <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          What to Expect
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            Our Challenges section will offer a variety of coding problems
            across different difficulty levels and topics. You'll be able to
            solve problems, earn XP, and track your progress.
          </p>
          <p>We plan to include challenges in areas such as:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Algorithms & Data Structures</li>
            <li>Frontend & Backend Development</li>
            <li>Database Queries</li>
            <li>System Design</li>
            <li>And many more!</li>
          </ul>
          <p>
            Each challenge will have a time limit, and you'll earn XP for
            correct answers. There will also be leaderboards and achievements to
            keep you motivated.
          </p>
          <p>
            We're working hard to bring you this feature soon. In the meantime,
            keep learning and earning XP through other activities!
          </p>
        </div>
      </Card>
    </div>
  );
}
