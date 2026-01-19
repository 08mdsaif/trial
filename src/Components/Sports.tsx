// import GlobalApi from "@/Services/GlobalApi";
// import { useState } from "react";

// function StarSport1() {
//   const [loading, setLoading] = useState(false);
//   const [showPlayer, setShowPlayer] = useState(false);
//   const [streamUrl, setStreamUrl] = useState<string | null>(null);

  

//   const handleOpen = async () => {
//     setStreamUrl(GlobalApi.getStarSport1);
//     setLoading(true);
//     setShowPlayer(true);
//   };

//   const handleOpenHindi = async () => {
//     setStreamUrl(GlobalApi.getStarSport1Hindi);
//     setLoading(true);
//     setShowPlayer(true);
//   }

//   const handleClosePlayer = () => {
//     setLoading(false);
//     setShowPlayer(false);
//   };

//   return (
//     <section id="sports" className="relative px-4 sm:px-12 py-6">
//     <div>
//       <h1 className="text-center text-amber-50 ">SPORTS</h1>

//       <div className="m-3 mt-4">
//         <button
//           onClick={handleOpen}
//           className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700"
//           disabled={loading}
//         >
//           {loading ? "Opening…" : "Star Sport 1"}
//         </button>
//       </div>

//       {showPlayer && streamUrl && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
//           <div className="bg-gray-900 rounded-lg overflow-hidden w-full max-w-4xl">
//             <div className="flex justify-between items-center p-2 border-b border-gray-700">
//               <div className="text-white font-semibold">Star Sport 1</div>
//               <div>
//                 <button onClick={handleClosePlayer} className="px-3 py-1 bg-gray-800 text-white rounded">Close</button>
//               </div>
//             </div>
//             <div className="p-2">
//               <div className="w-full h-64 sm:h-108 bg-black">
//                 <iframe
//                   title="Star Sport 1 Stream"
//                   src={streamUrl}
//                   className="w-full h-full"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//       </section>
//   );
// }

// export default StarSport1;


import { useState } from "react";
import GlobalApi from "@/Services/GlobalApi";

type StreamOption = {
  id: string;
  title: string;
  logo: string;
  url: string;
  lang?: string;
};

export default function Sports(){
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [activeStream, setActiveStream] = useState<StreamOption | null>(null);

  const streams: StreamOption[] = [
    {
      id: "star1-en",
      title: "Star Sports 1 (English)",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/73/Star_Sports_1_HD.png",
      url: GlobalApi.getStarSport1,
      lang: "EN",
    },
    {
      id: "star1-hi",
      title: "Star Sports 1 (Hindi)",
      logo: "https://logodix.com/logo/817076.jpg",
      url: GlobalApi.getStarSport1Hindi,
      lang: "HI",
    },
  ];

  const openStream = (stream: StreamOption) => {
    setLoadingId(stream.id);
    setTimeout(() => {
      setActiveStream(stream);
      setShowPlayer(true);
      setLoadingId(null);
    }, 250);
  };

  const closePlayer = () => {
    setShowPlayer(false);
    setActiveStream(null);
  };

  return (
    <section id="sports" className="relative px-4 sm:px-12 py-6">
      <div className="px-4 py-6">
        <h1 className="text-2xl text-white font-bold mb-4">Sports Channels</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {streams.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-4 bg-gray-800/60 p-3 rounded-lg border border-gray-700"
            >
              <img src={s.logo} alt={`${s.title} logo`} className="w-16 h-16 object-contain rounded" />

              <div className="flex-1">
                <div className="text-white font-semibold">{s.title}</div>
                <div className="text-sm text-gray-300">Language: {s.lang}</div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => openStream(s)}
                    className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                    aria-label={`Open ${s.title}`}
                  >
                    {loadingId === s.id ? "Opening..." : "Play"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showPlayer && activeStream && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeStream.title}
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
            onKeyDown={(e) => {
              if (e.key === "Escape") closePlayer();
            }}
          >
            <div className="bg-transparent">
              {/* Glass banner, modal content */}
              <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col gap-0">
                <div className="flex flex-col md:flex-row gap-4 items-stretch">
                  {/* Left: TV logo */}
                  <div className="flex flex-col items-center justify-center py-6 px-4">
                    <img
                      src={activeStream.logo}
                      alt="channel"
                      className="w-32 h-32 md:w-44 md:h-44 object-contain rounded-xl border border-blue-500/20 shadow"
                    />
                  </div>
                  {/* Right: Info + player */}
                  <div className="flex flex-col flex-1 justify-between px-2 py-3">
                    {/* Channel title, language, etc */}
                    <div className="flex flex-col gap-3 mb-4">
                      <div className="text-3xl font-bold text-white">{activeStream.title}</div>
                      <div className="flex gap-2 mb-2">
                        <span className="bg-blue-500/70 text-white px-4 py-2 rounded font-semibold text-sm">
                          {activeStream.lang === "EN" ? "English" : "Hindi"}
                        </span>
                        {/* Add more tags if needed */}
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-base text-gray-200">
                          {/* Here you could pull a description of the channel/sport, or hardcode: */}
                          Enjoy live coverage, commentary and highlights for all sports events on {activeStream.title}.
                        </p>
                      </div>
                    </div>
                    {/* Player */}
                    <div className="w-full h-72 sm:h-96 bg-black rounded-xl overflow-hidden mb-4 mt-2 border border-blue-900/30 shadow">
                      <iframe
                        title={activeStream.title}
                        src={activeStream.url}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
                {/* Close button row */}
                <div className="flex justify-end items-center gap-2 p-4 border-t border-gray-800 bg-gray-900/70 rounded-b-2xl">
                  <button onClick={closePlayer} className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
