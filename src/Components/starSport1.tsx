// import React, { useState } from "react";

// import GlobalApi from "@/Services/GlobalApi";

// type StreamOption = {
//   id: string;
//   title: string;
//   logo: string;
//   url: string;
//   lang?: string;
// };

// export default function StarSport1(): JSX.Element {
//   const [loadingId, setLoadingId] = useState<string | null>(null);
//   const [showPlayer, setShowPlayer] = useState(false);
//   const [activeStream, setActiveStream] = useState<StreamOption | null>(null);

//   const streams: StreamOption[] = [
//     {
//       id: "star1-en",
//       title: "Star Sports 1 (English)",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/7/73/Star_Sports_1_HD.png",
//       url: GlobalApi.getStarSport1,
//       lang: "EN",
//     },
//     {
//       id: "star1-hi",
//       title: "Star Sports 1 (Hindi)",
//       logo: "https://logodix.com/logo/817076.jpg",
//       url: GlobalApi.getStarSport1Hindi,
//       lang: "HI",
//     },
//   ];

//   const openStream = (stream: StreamOption) => {
//     setLoadingId(stream.id);
//     setTimeout(() => {
//       setActiveStream(stream);
//       setShowPlayer(true);
//       setLoadingId(null);
//     }, 250);
//   };

//   const closePlayer = () => {
//     setShowPlayer(false);
//     setActiveStream(null);
//   };

//   return (
//     <div className="px-4 py-6">
//       <h1 className="text-2xl text-white font-bold mb-4">Sports Channels</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {streams.map((s) => (
//           <div
//             key={s.id}
//             className="flex items-center gap-4 bg-gray-800/60 p-3 rounded-lg border border-gray-700"
//           >
//             <img src={s.logo} alt={`${s.title} logo`} className="w-16 h-16 object-contain rounded" />

//             <div className="flex-1">
//               <div className="text-white font-semibold">{s.title}</div>
//               <div className="text-sm text-gray-300">Language: {s.lang}</div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   onClick={() => openStream(s)}
//                   className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
//                   aria-label={`Open ${s.title}`}
//                 >
//                   {loadingId === s.id ? "Opening..." : "Play"}
//                 </button>

//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showPlayer && activeStream && (
//         <div
//           role="dialog"
//           aria-modal="true"
//           aria-label={activeStream.title}
//           tabIndex={-1}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
//           onKeyDown={(e) => {
//             if (e.key === "Escape") closePlayer();
//           }}
//         >
//           <div className="bg-gray-900 rounded-lg overflow-hidden w-full max-w-4xl shadow-lg">
//             <div className="flex items-center justify-between p-3 border-b border-gray-700">
//               <div className="flex items-center gap-3">
//                 <img src={activeStream.logo} alt="channel" className="w-10 h-10 object-contain rounded" />
//                 <div className="text-white font-semibold">{activeStream.title}</div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button onClick={closePlayer} className="px-3 py-1 rounded bg-red-600 text-white">
//                   Close
//                 </button>
//               </div>
//             </div>

//             <div className="w-full h-72 sm:h-96 bg-black">
//               <iframe title={activeStream.title} src={activeStream.url} className="w-full h-full" allowFullScreen />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }