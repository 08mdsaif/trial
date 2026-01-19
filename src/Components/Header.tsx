import logo from "../assets/textlogogenerator.svg";
import SearchBar from "./SearchBar";
import { useCallback, useState, useEffect } from "react";
import { X, Zap, Play, Tv, Trophy, Compass, Search } from "lucide-react";

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { id: 1, name: "Home", target: "top", icon: <Zap size={18} /> },
    { id: 2, name: "Movies", target: "movies", icon: <Play size={18} /> },
    { id: 3, name: "TV Shows", target: "tv", icon: <Tv size={18} /> },
    { id: 4, name: "Sports", target: "sports", icon: <Trophy size={18} /> },
  ];

//   const handleClick = useCallback((target: string) => {
//     setOpen(false);
//     const el = target === "top" ? window : document.getElementById(target);

//     if (el === window) window.scrollTo({ top: 0, behavior: "smooth" });
//     else el?.scrollIntoView({ behavior: "smooth" });
//   }, []);

const handleClick = useCallback((target: string) => {
  setOpen(false);

  if (target === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(target);
  el?.scrollIntoView({ behavior: "smooth" });
}, []);


  return (
    <>
      {/* ================= DESKTOP (visible on lg and above) ================= */}
      <div className="hidden lg:flex fixed top-0 left-0 w-full justify-center p-8 z-50 pointer-events-none">
        <header
          className={`
            flex items-center gap-2 p-1.5 transition-all duration-700 pointer-events-auto
            bg-white/[0.03] backdrop-blur-[40px] rounded-[2rem] 
            border-t border-l border-white/20 border-b border-r border-white/5
            shadow-[20px_20px_50px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.1),inset_-2px_-2px_4px_rgba(0,0,0,0.2)]
            ${scrolled ? "scale-95 translate-y-[-10px]" : "scale-100"}
          `}
        >
          {/* Logo */}
          <div className="px-6 py-3 bg-white/5 rounded-l-[1.8rem] border-r border-white/5">
            <img
              src={logo}
              alt="Logo"
              className="w-28 cursor-pointer drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
              onClick={() => handleClick("top")}
            />
          </div>

          {/* Nav */}
          <nav className="flex items-center">
            {menu.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.target)}
                className="px-8 py-3 text-sm font-medium text-white/50 hover:text-white transition-all hover:bg-white/5 relative group"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue-500 blur-[1px] group-hover:w-full transition-all duration-500" />
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="px-4 py-3 rounded-r-[1.8rem] border-l border-white/5 flex items-center gap-3 drop-shadow-2xl">
            <SearchBar />
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Compass size={16} />
            </div>
          </div>
        </header>
      </div>

      {/* ================= MOBILE (visible below lg) ================= */}
      <header className="lg:hidden fixed top-0 left-0 w-full z-[100] flex justify-center p-4">
        {/* Logo (only when menu closed) */}
        {!open && (
          <div
            className="absolute left-6 top-4 animate-in fade-in slide-in-from-left-6 duration-700 ease-out cursor-pointer"
            onClick={() => handleClick("top")}
          >
            <img
              src={logo}
              alt="Logo"
              className="w-[85px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            />
          </div>
        )}

        {/* Dynamic Island */}
        <div
          className={`
            relative transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1.2)]
            bg-black/90 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]
            ${
              open
                ? "w-full h-[450px] rounded-[3rem] p-6"
                : scrolled
                ? "w-[120px] h-[40px] rounded-full px-3"
                : "w-[180px] h-[50px] rounded-full px-4"
            }
          `}
        >
          {/* CLOSED */}
          {!open && (
            <div
              className="w-full h-full flex items-center justify-between cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 animate-pulse flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>

                {!scrolled && (
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                    Menu
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <Search size={18} className="text-white/40" />
              </div>
            </div>
          )}

          {/* OPEN */}
          {open && (
            <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-300">
              {/* Top bar */}
              <div className="flex justify-between items-center mb-10">
                <img src={logo} alt="Logo" className="w-[90px]" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/10 active:scale-90 transition-transform"
                  title="Close Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-3">
                {menu.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleClick(item.target)}
                    className="flex items-center gap-4 w-full p-4 rounded-3xl bg-white/[0.03] border border-white/5 active:scale-95 transition-all"
                    style={{ transitionDelay: `${index * 40}ms` }}
                  >
                    <div className="text-blue-500">{item.icon}</div>
                    <span className="text-white text-lg font-bold tracking-tight">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="mt-auto">
                <p className="text-[10px] text-center text-white/20 uppercase tracking-[0.3em] font-bold mb-3">
                  Global Search
                </p>
                <div className="bg-white/5 rounded-[2rem] p-1 border border-white/10">
                  <SearchBar />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Background Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90] lg:hidden animate-in fade-in duration-500"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default Header;