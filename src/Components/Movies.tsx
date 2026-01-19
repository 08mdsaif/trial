import GlobalApi from "@/Services/GlobalApi";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

function Movies() {
  const [items, setItems] = useState<any>([]);
  const navigate = useNavigate()


  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
  GlobalApi.getMovies().then((resp) => {
      const result = resp.data.results;
      //   console.log(result);
      setItems(result);
    });
  };

  const handleNavigate = useCallback((movie:any) => {
      navigate(`/player/${movie.media_type}/${movie.id}`);
  }, [navigate]);


  return (
  <div id="movies" className="relative px-4 sm:px-12">
      <div className="flex items-center py-1 gap-2">
        <div className="flex size-6 items-center justify-center rounded bg-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clapperboard"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"></path><path d="m6.2 5.3 3.1 3.9"></path><path d="m12.4 3.4 3.1 4"></path><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path></svg>
        </div>
        <h2 className="text-white text-2xl font-semibold">Movies</h2>
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
              <div className="text-xs text-center text-[#D8D8D8]">{movie.release_date ? movie.release_date.slice(0, 4) : "-"} • {movie.original_language?.toUpperCase()} • <span>HD</span></div>
              <div className="text-[14px] font-semibold leading-tight text-center w-full line-clamp-2 pb-1">{movie.title}</div>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default Movies;
