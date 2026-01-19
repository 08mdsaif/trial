import { useEffect, useState, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieBaseUrl } from "@/Services/GlobalApi";
import GlobalApi from "@/Services/GlobalApi";
import {
  ArrowLeft, Play, Lightbulb, LightbulbOff,
  ChevronDown, MonitorPlay, Server, Heart
} from "lucide-react";

const api_Key = import.meta.env.VITE_TMDB_API;

type Episode = {
  still_path: string | null;
  episode_number: number;
  name?: string;
  air_date?: string;
};

type Season = {
  season_number: number;
  name: string;
  episode_count: number;
};

type TagData = {
  release_date?: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
} | null;

type MovieData = {
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  overview?: string;
  seasons?: Season[];
};


type EpisodeCardProps = {
  episode: Episode;
  isActive: boolean;
  onClick: () => void;
};


// --- Horizontal Episode Card ---
const EpisodeCard = ({ episode, isActive, onClick } : EpisodeCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`group flex-shrink-0 w-64 text-left space-y-2 p-2 rounded-xl transition-all duration-300 ${isActive ? "bg-blue-600/20 ring-1 ring-blue-500/50 shadow-lg shadow-blue-900/20" : "hover:bg-white/5"}`}
  >
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-800">
      {episode.still_path ? (
        <img
          alt={episode.name ?? `Episode ${episode.episode_number}`}
          src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
          className={`w-full h-full object-cover transition-transform group-hover:scale-110 ${isActive ? 'opacity-50' : ''}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-zinc-600">
          <Play className="w-6 h-6" />
        </div>
      )}
      <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 text-[10px] font-bold text-white rounded">
        EP {episode.episode_number}
      </div>
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <MonitorPlay className="w-8 h-8 text-blue-400" />
        </div>
      )}
    </div>
    <div className="px-1">
      <h4 className={`text-sm font-bold truncate ${isActive ? "text-blue-400" : "text-zinc-200 group-hover:text-white"}`}>
        {episode.name || `Episode ${episode.episode_number}`}
      </h4>
      <p className="text-[10px] text-zinc-500 uppercase font-medium">Premiered: {episode.air_date}</p>
    </div>
  </button>
);

export default function Player() {
  const params = useParams();
  const id = params.id ?? "";
  const movie_type = params.type ?? "movie";
  const navigate = useNavigate();

  const episodeRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);

  const [movie, setMovie] = useState<MovieData | null>(null);
  const [tag, setTag] = useState<TagData>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [episodesLoading, setEpisodesLoading] = useState(false);
  const [cinemaMode, setCinemaMode] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const sources = useMemo(() => [
    { name: "NoAdd", url: GlobalApi.fmovies },
    { name: "ViTo", url: GlobalApi.viTo },
    { name: "ViIcu", url: GlobalApi.viIcu },
    { name: "VidFast", url: GlobalApi.vidFast },
    { name: "VidLink", url: GlobalApi.vidLink },
    { name: "VidEasy", url: GlobalApi.vidEasy },
    { name: "111Movies", url: GlobalApi.movies111 },
    { name: "VidRock", url: GlobalApi.vidRock },
    { name: "Go(mov)", url: GlobalApi.goDrive },
    { name: "Go(tv)", url: GlobalApi.goTv },
    { name: "embed", url: GlobalApi.twoEmbed },
    { name: "RiveStream", url: GlobalApi.riveStream },
  ], []);

  const [activeSrcTemplate, setActiveSrcTemplate] = useState(sources[0].url);

  const finalSrc = useMemo(() => {
    let url = activeSrcTemplate.replace("{type}", movie_type).replace("{id}", id);
    if (movie_type === "tv") {
      url = url.replace("{season}", String(selectedSeason)).replace("{episode}", String(selectedEpisode));
      if (!activeSrcTemplate.includes("{season}")) {
        url = url.replace(/\/*$/, "") + `/${selectedSeason}/${selectedEpisode}`;
      }
    }
    return url;
  }, [activeSrcTemplate, movie_type, id, selectedSeason, selectedEpisode]);

  useEffect(() => {
    if (movie_type === "movie") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (movie_type === "tv" && !episodesLoading && episodes.length > 0) {
      setTimeout(() => {
        episodeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }
  }, [movie_type, episodesLoading, episodes.length]);

  useEffect(() => {
    if (cinemaMode) {
      playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [cinemaMode]);

  useEffect(() => {

    async function fetchData() {
      setLoading(true);
      try {
        const [res, tagRes] = await Promise.all([
          fetch(`${movieBaseUrl}/${movie_type}/${id}?api_key=${api_Key}`),
          GlobalApi.gettagMovie(id).catch(() => ({ data: null }))
        ]);
        const data = await res.json();
        setMovie(data);
        setTag(tagRes.data);
        if (movie_type === "tv" && data?.seasons) {
          setSeasons(data.seasons.filter((s : Season) => s.season_number > 0));
        }
      } catch (err) { console.error(err); }
      setLoading(false);
    }


    fetchData();
  }, [id, movie_type]);

  useEffect(() => {
    if (movie_type === "tv") {
      setEpisodesLoading(true);
      fetch(`${movieBaseUrl}/tv/${id}/season/${selectedSeason}?api_key=${api_Key}`)
        .then(res => res.json())
        .then(data => setEpisodes(data.episodes || []))
        .finally(() => setEpisodesLoading(false));
    }
  }, [selectedSeason, id, movie_type]);

  // const backdrop = movie?.backdrop_path
  //   ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  //   : undefined;


  return (
    <div className={`relative min-h-screen transition-all duration-1000 ${cinemaMode ? 'bg-[#030303]' : 'bg-slate-950 text-slate-100'}`}>

      {/* --- BACKDROP IMAGE SECTION --- */}
      <div className="fixed top-0 left-0 w-full h-[75vh] overflow-hidden z-0 pointer-events-none">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000`}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
            opacity: cinemaMode ? 0.05 : 0.35
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950/40" />
      </div>

      <nav className={`relative z-10 p-5 flex items-center justify-between transition-opacity duration-700 ${cinemaMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
        <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all">
          <ArrowLeft className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <button 
          type="button"
          onClick={() => setCinemaMode(!cinemaMode)}
          className={`fixed bottom-8 right-8 z-[100] p-4 rounded-full border transition-all duration-500 shadow-2xl
              ${cinemaMode
              ? 'bg-yellow-500 border-yellow-500 text-black scale-110 rotate-12 shadow-[0_0_30px_rgba(234,179,8,0.6)]'
              : 'bg-slate-900 border-slate-700 text-yellow-500 hover:scale-110'
            }`}
        >
          {cinemaMode ? <LightbulbOff className="w-6 h-6" /> : <Lightbulb className="w-6 h-6" />}
        </button>
      </nav>

      <main className="relative z-10 mx-auto px-4 max-w-6xl">

        <div className={`mb-6 space-y-4 transition-all duration-700 ${cinemaMode ? 'opacity-5 translate-y-[-10px]' : 'opacity-100 translate-y-0'}`}>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-white uppercase italic">
            {movie?.title || movie?.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
              <span className="text-blue-500 uppercase tracking-widest">{tag?.release_date?.split('-')[0]}</span>
              <span className="w-1 h-1 bg-slate-800 rounded-full" />
              <span className="uppercase tracking-widest">{tag?.runtime ? `${tag.runtime} MIN` : 'TV SERIES'}</span>
            </div>
            <div className="flex gap-2 border-l border-slate-800 pl-3">
              {tag?.genres?.slice(0, 3).map((g) => (
                <span key={g.id} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- COMPACT SERVER BAR --- */}
        <div className={`mb-3 flex items-center gap-2 p-2 rounded-xl border transition-all duration-700 ${cinemaMode ? 'opacity-5' : 'bg-slate-900/50 border-slate-800'}`}>
          <span className="shrink-0 text-[10px] font-black text-slate-500 px-3 border-r border-slate-800 uppercase tracking-widest flex items-center gap-1">
            <Server className="w-3 h-3 text-blue-500" /> Signals
          </span>

          <div
            className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar"
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="flex items-center gap-2">
              {sources.map((src) => (
                <button
                  type="button"
                  key={src.name}
                  onClick={() => setActiveSrcTemplate(src.url)}
                  className={`shrink-0 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeSrcTemplate === src.url
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                      : "text-slate-400 hover:text-white"
                    }`}
                >
                  {src.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={playerRef} className={`relative bg-black shadow-2xl transition-all duration-1000 aspect-video rounded-3xl overflow-hidden border ${cinemaMode ? 'border-blue-500/50 shadow-[0_0_100px_rgba(0,0,0,1)] scale-[1.02] z-50' : 'border-slate-800'}`}>
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 font-bold animate-pulse text-blue-500 tracking-widest">CONNECTING TO HOST...</div>
          ) : (
            <iframe title="Video PLayer" src={finalSrc} className="w-full h-full" allowFullScreen />
          )}
        </div>

        {movie_type === "tv" && (
          <div  ref={episodeRef} className={`mt-8 transition-all duration-700 ${cinemaMode ? 'opacity-5 translate-y-[20px]' : 'opacity-100 translate-y-0'}`}>
            <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
              <h2 className="text-2xl font-black tracking-tight uppercase italic text-white">Episodes</h2>
              <div className="relative">
                <select
                  aria-label="Select season"
                  disabled={cinemaMode}
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="appearance-none bg-slate-900 border border-slate-800 px-6 py-2.5 rounded-2xl text-sm font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer text-white"
                >
                  {seasons.map(s => <option key={s.season_number} value={s.season_number}>Season {s.season_number}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar scroll-smooth">
              {episodesLoading ? (
                <div className="text-slate-500 font-bold animate-pulse italic">RETRIEVING DATA...</div>
              ) : (
                episodes.map(ep => (
                  <EpisodeCard
                    key={ep.episode_number}
                    episode={ep}
                    isActive={selectedEpisode === ep.episode_number}
                    onClick={() => {
                      setSelectedEpisode(ep.episode_number);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                ))
              )}
            </div>
          </div>
        )}

        <section className={`mt-10 mb-50 transition-all duration-1000 ${cinemaMode ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
          <div className="bg-slate-900/40 backdrop-blur-md rounded-[2rem] p-6 md:p-7 border border-white/5 shadow-2xl overflow-hidden relative group w-full">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
              <div className="w-48 md:w-52 lg:w-56 shrink-0 shadow-2xl rounded-2xl overflow-hidden border border-white/10 aspect-[2/3] mx-auto md:mx-0">
                {movie?.poster_path ? (
                  <img title="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
                ) : <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 italic">No Poster</div>}
              </div>
              <div className="flex flex-col justify-center space-y-6 flex-1 text-center md:text-left w-full">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic leading-tight">
                  {movie?.title || movie?.name}
                </h2>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-5 md:p-6">
                  <p className="text-slate-300 text-sm md:text-lg leading-relaxed font-medium italic opacity-90">
                    {movie?.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className={`mt-10 mb-10 border-t border-slate-900 pt-8 transition-opacity duration-700 ${cinemaMode ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-lg font-black italic tracking-tighter text-white">EivoM</span>
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest border border-slate-900 px-2 py-0.5 rounded">v2.4</span>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest justify-center md:justify-start">
              <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Support</a>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 justify-center md:justify-start">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>by AsyncX</span>
            </div>
          </div>
        </footer>

      </main>

      <style>{`.custom-scrollbar::-webkit-scrollbar { height: 6px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }`}</style>
    </div>
  );
}