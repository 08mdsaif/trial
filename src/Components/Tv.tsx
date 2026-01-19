import GlobalApi from "@/Services/GlobalApi";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Movies() {
  const [items, setItems] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTvShows();
  }, []);

  const getTvShows = () => {
  GlobalApi.getTvShows().then((resp) => {
      const result = resp.data.results;
      //   console.log(result);
      setItems(result);
    });
  };

  const handleNavigate = useCallback((movie:any) =>{
      navigate(`/player/${movie.media_type}/${movie.id}`);
  }, [navigate]);

  return (
  <div id="tv" className="relative px-4 sm:px-12">
      <div className="flex items-center py-1 gap-2">
  <div className="flex size-6 items-center justify-center rounded bg-blue-500"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tv"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg></div>
        <h2 className="text-white text-2xl font-semibold">TV Shows</h2>
      </div>
      <div className="
        flex flex-nowrap gap-4 my-4 p-0.5 overflow-x-auto rounded-md
        [scrollbar-width:none]

        sm:grid sm:overflow-visible
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-8
        sm:gap-4 sm:py-5
      ">
        {items.map((movie: any) => (
          <div
            key={movie.id}
            onClick={() => handleNavigate(movie)}
            className="relative min-w-[150px] h-[226px] rounded-[6px] overflow-hidden shadow-lg bg-gray-900 border border-transparent transition-transform duration-200 hover:border-blue-500 hover:[scale:1.03]"
          >
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover filter brightness-65"
              // style={{ filter: 'brightness(50%)' }}
            />

            <div className="absolute top-2 right-2 z-40 flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full text-yellow-400 text-xs font-semibold">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="flex-shrink-0">
                <path d="M12 17.27 18.18 21 16.545 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.455 4.73L5.82 21z"></path>
              </svg>
              <span className="text-yellow-400">{movie.vote_average?.toFixed(1) ?? '-'}</span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#b71212d0] to-transparent px-2 pb-2 pt-6 text-white z-30">
              <div className="text-xs text-center text-[#D8D8D8]">{movie.first_air_date ? movie.first_air_date.slice(0, 4) : "-"} • {movie.original_language?.toUpperCase()} • <span>HD</span></div>
              <div className="text-[14px] font-semibold leading-tight text-center w-full line-clamp-2 pb-1">{movie.name}</div>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default Movies;