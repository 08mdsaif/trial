import { useEffect, useState } from 'react';
import GlobalApi from '../Services/GlobalApi'
import { useNavigate } from 'react-router-dom'

function Hero() {
    const IMAGE_BASE_URL= "https://image.tmdb.org/t/p/original";
    const[movieList,setMovieList] = useState<any>([]);
    const navigate = useNavigate()

    useEffect(()=>{
        getPopularMovies();
    },[])

    const getPopularMovies=()=>{
    GlobalApi.getPopularMovies().then((resp:any)=>{
            const result = resp.data.results;
            setMovieList(result[0]);
            // console.log(result);
        })
    }
    return (
        <>
    <div className="relative h-screen">
        {/* position the content from the bottom so it adapts better on small screens */}
        <div className='absolute left-4 md:left-12 bottom-8 md:bottom-20 lg:bottom-24 z-10 space-y-5 flex flex-col gap-4'>
            {/* <h2 className='text-white text-[19px]'>Watch Only on Eivom</h2> */}
            <div className='flex flex-col gap-2 mb-0'>

            <h2 className=' mb-0 py-1 text-white text-[28px] md:text-[36px] font-semibold w-full max-w-[530px] leading-tight md:leading-[2.5rem] '>{movieList.title}</h2>
            <div className='mb-0  flex gap-3'>
                <h4 className='text-white text-[12px] flex items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-200" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.201 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
                    </svg>
                    {movieList && movieList.vote_average ? movieList.vote_average.toFixed(1) : '--'}
                </h4>

                <h4 className='text-white text-[12px] flex items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
                    {movieList && movieList.release_date ? movieList.release_date : '--'}
                </h4>

                {/* <h4 className='text-white text-[12px] flex items-center'>• {movieList && movieList.original_language.toUpperCase()}</h4> */}
            </div>
            </div>
            <h4 className='mb-0 text-white text-[16px] w-full max-w-[520px] line-clamp-2'>{movieList.overview}</h4>
            {/* wrap buttons on small screens to avoid overlap */}
            <div className='flex flex-wrap gap-2 mt-1'>
                <button type='button' onClick={() =>  navigate(`/player/movie/${movieList?.id ?? ''}`)} className='flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-[0_10px_20px_rgba(59,130,246,0.25)] w-[160px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black  " viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 3v18l15-9L5 3z" />
                    </svg>
                    <span className='text-[16px] text-black '>Play Now</span>
                </button>

                <button type='button' className='flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-3 rounded-lg backdrop-blur-sm border border-white/10 w-full sm:w-[160px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                    <span className='text-[16px]'>More Info</span>
                </button>
            </div>
        </div>

        <img
            src={IMAGE_BASE_URL + movieList.backdrop_path}
            alt={'Movie background'}
            width={1920}
            height={1080}
            className='absolute top-0 left-0 w-full h-full object-cover filter brightness-40'
            />
    </div>
    </>
  )
}

export default Hero