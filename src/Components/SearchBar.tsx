import { Input } from "@/Components/ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import GlobalApi from "@/Services/GlobalApi";
import { useNavigate } from "react-router-dom";
import { Search, X, Sparkles, Loader2 } from "lucide-react";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResults, setAiResults] = useState<any[]>([]);

  const [mode, setMode] = useState<"tmdb" | "ai">("tmdb");

  // ✅ keyboard navigation
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const trimmed = useMemo(() => value.trim(), [value]);

  // ✅ close dropdown on outside click + esc
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // ✅ Debounced TMDB search
  useEffect(() => {
    if (!trimmed) {
      setResults([]);
      setAiResults([]);
      setOpen(false);
      setLoading(false);
      setActiveIndex(-1);
      setMode("tmdb");
      return;
    }

    if (mode === "ai") return;

    setLoading(true);

    const t = setTimeout(() => {
      GlobalApi.getsearchMovies(trimmed)
        .then((resp: any) => {
          const data = resp?.data?.results || [];
          setResults(data);
          setOpen(true);
          setActiveIndex(-1);
        })
        .catch(() => {
          setResults([]);
        })
        .finally(() => setLoading(false));
    }, 350);

    return () => clearTimeout(t);
  }, [trimmed]);

  // ✅ click item
  const goTo = (r: any) => {
    setOpen(false);
    setActiveIndex(-1);

    // ✅ fallback if media_type missing
    const mediaType = r.media_type || (r.first_air_date ? "tv" : "movie");
    navigate(`/player/${mediaType}/${r.id}`);
  };

  // ✅ AI search
  const runAiSearch = async () => {
    if (!trimmed) return;

    try {
      setLoading(true);
      setMode("ai"); // ✅ switch to AI mode
      setAiResults([]);
      setResults([]); // ✅ hide tmdb list

      // ✅ Call your backend AI API
      const aiResp = await GlobalApi.getAiSearch(trimmed);
      const titles: string[] = aiResp?.data?.titles || [];

      // ✅ Convert AI titles into TMDB results (to get ID/poster)
      const tmdbPromises = titles.map((title: string) =>
        GlobalApi.getsearchMovies(title)
      );

      const tmdbResponses = await Promise.all(tmdbPromises);

      const aiMovies = tmdbResponses
        .map((r: any) => r?.data?.results?.[0])
        .filter(Boolean);

      setAiResults(aiMovies);
      setOpen(true);
      setActiveIndex(-1);
    } catch (err) {
      setAiResults([]);
    } finally {
      setLoading(false);
    }
  };

  const list = mode === "ai" ? aiResults : results;
  

  // ✅ keyboard navigation inside input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    
    if(e.key === "Enter"){
      e.preventDefault();

      if(activeIndex >= 0 && list[activeIndex]){
        goTo(list[activeIndex]);
        return;
      }

      runAiSearch();
      return;
    }


    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        Math.min(prev + 1, Math.max(results.length - 1, 0))
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };
  // const list = mode === "ai" ? aiResults : results;


  return (
    <div
      ref={containerRef}
      className="relative w-full min-w-[140px] sm:min-w-[220px]"
    >
      {/* ✅ AI Premium Search Pill */}
      <div
        className={`
          relative flex items-center gap-2
          rounded-full
          bg-white/[0.04]
          border border-white/10
          shadow-[0_20px_50px_rgba(0,0,0,0.35)]
          backdrop-blur-xl
          transition-all
          ${open ? "ring-1 ring-blue-500/40" : "ring-0"}
        `}
      >
        {/* Left Icon */}
        <div className="pl-3 flex items-center gap-2 text-white/40">
          <Search size={16} className="flex-shrink-0" />
        </div>

        {/* Input */}
        <Input
          value={value}
          onChange={(e: any) =>{ 
            setValue(e.target.value)
            setMode("tmdb");
            setAiResults([]);
          }}
          
          onFocus={() => {
            if (list.length || loading) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search movies, TV, sports..."
          className="
            border-0 bg-transparent text-white placeholder:text-white/25
            focus-visible:ring-0 focus-visible:ring-offset-0
            text-[12px] sm:text-sm
            px-2 py-2
            h-10 sm:h-11
          "
        />

        {/* Right Side */}
        <div className="pr-2 flex items-center gap-2">
          {loading ? (
            <div className="text-white/35">
              <Loader2 size={16} className="animate-spin" />
            </div>
          ) : (
            <div onClick={runAiSearch} className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-300 hover:bg-blue-600/25 transition">
              <Sparkles size={14} />
            </div>
          )}

          {value && (
            <button
              onClick={() => {
                setValue("");
                setResults([]);
                setAiResults([]);
                setOpen(false);
                setActiveIndex(-1);
                setMode("tmdb");
              }}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 transition"
              aria-label="clear"
              type="button"
              title="clear"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {trimmed && (
        <p className="mt-2 text-[11px] text-white/35 px-2">
          Press <span className="text-white/60">Enter</span> or tap{" "}
          <span className="text-blue-300">✨</span> for AI Search
        </p>
      )}

      {/* ✅ Dropdown */}
      {open && (
        <div
          className="
            absolute left-0 right-0 mt-2 z-50
            rounded-2xl
            bg-black/70 backdrop-blur-2xl
            border border-white/10
            shadow-[0_30px_80px_rgba(0,0,0,0.7)]
            overflow-hidden
          "
        >
          {/* Loading skeleton */}
          {loading && (
            <div className="p-3 space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 rounded-xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && trimmed && list.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-white/60 text-sm font-semibold">
                No results found
              </p>
              <p className="text-white/30 text-xs mt-1">
                Try different keywords 🎬
              </p>
            </div>
          )}

          {/* Results */}
          {!loading && list.length > 0 && (
            <div className="max-h-[320px] overflow-auto p-2">
              <p className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-[0.25em] text-white/25 font-bold">
                {mode === "ai" ? "AI Results" : "TMDB Results"}
              </p>

              <div className="space-y-1">
                {list.map((r: any, index: number) => {
                  const title = r.title || r.name || "Untitled";
                  const year =
                    r.release_date?.slice(0, 4) ||
                    r.first_air_date?.slice(0, 4) ||
                    "N/A";
                  const type =
                    r.media_type || (r.first_air_date ? "tv" : "movie");

                  return (
                    <button
                      key={`${mode}-${r.id}`}
                      onClick={() => goTo(r)}
                      className={`
                        w-full text-left flex items-center gap-3 p-2.5 rounded-xl
                        transition
                        ${
                          activeIndex === index
                            ? "bg-white/10 border border-white/10"
                            : "hover:bg-white/5 border border-transparent"
                        }
                      `}
                      type="button"
                    >
                      <img
                        src={
                          r.poster_path
                            ? `https://image.tmdb.org/t/p/w92${r.poster_path}`
                            : "https://via.placeholder.com/64x92?text=-"
                        }
                        className="w-10 h-14 rounded-lg object-cover flex-shrink-0"
                        alt={title}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-sm truncate">
                          {title}
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-white/40">
                            {year}
                          </span>

                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600/15 border border-blue-500/20 text-blue-300 uppercase tracking-wider">
                            {type}
                          </span>
                        </div>
                      </div>

                      <div className="text-white/25 text-xs hidden sm:block">
                        Enter ↵
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer hint */}
          {!loading && list.length > 0 && (
            <div className="px-3 py-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/30">
              <span>↑ ↓ to navigate</span>
              <span>Enter to open</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}