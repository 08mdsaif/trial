import GlobalApi from '@/Services/GlobalApi';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Trending() {
  const [items, setItems] = useState<any>([]);
  const navigate = useNavigate()

  useEffect(() => {
    getTrendingMovies();
  }, [])

  const getTrendingMovies = () => {
  GlobalApi.getTrendingMovies().then((resp: any) => {
      const result = resp.data.results;
      // console.log(result)
      setItems(result);
    })
  }

  const handleNavigate = useCallback((movie:any) => {
      navigate(`/player/${movie.media_type}/${movie.id}`);
  }, [navigate]);



  return (
    <>

      <div className="relative px-4 sm:px-12 p-4">

        {/* Avoid large negative margins which can overlap the Hero section on small screens */}
        <div className="relative z-30">
          <div className="">
            <div className="flex items-center py-1 gap-2">
              <div className="flex size-6 items-center justify-center rounded bg-blue-500 "><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#000" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" ><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg></div>
              <h2 className="text-white text-2xl font-semibold">What's Trending Today</h2>
            </div>

            <div className='mt-4'>

              <div className="flex flex-nowrap gap-4 my-4 sm:my-4.5 p-0.5 overflow-auto  [scrollbar-width:none] rounded-md ">
                {items.map((movie: any) => (
                  <div
                    key={movie.id}
                    onClick={() => handleNavigate(movie)}
                    role="button"
                    tabIndex={0}
                    // onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/player/${movie.id}`) }}
                    className="relative min-w-[320px] h-[160px] rounded-xl overflow-hidden shadow-lg bg-gray-900 group transition-transform duration-200 border border-transparent hover:border-blue-500 hover:[scale:1.03]"

                  >
                    {/* Movie Poster */}
                    <img
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path || movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
                      <div className="p-4">
                        <h2 className="text-lg font-bold text-white mb-1 leading-tight">
                          {movie.title || movie.name}
                        </h2>
                        <div className="flex flex-wrap items-center text-blue-200 text-xs font-semibold space-x-2">
                          <span>Rating: {movie.vote_average?.toFixed(1) ?? '-'}</span>
                          {movie.release_date && (
                            <>
                              <span>•</span>
                              <span>{new Date(movie.release_date).toLocaleDateString('en-GB')}</span>
                            </>
                          )}
                          {movie.original_language && (
                            <>
                              <span>•</span>
                              <span className="uppercase">{movie.original_language}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>HD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Trending