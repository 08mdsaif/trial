import axios from "axios";

const api_Key = import.meta.env.VITE_TMDB_API;
export const movieBaseUrl = 'https://api.themoviedb.org/3';

//Movie streaming sources
const viTo = 'https://vidsrc.to/embed/{type}/{id}';
const viIcu = 'https://vidsrc.icu/embed/{type}/{id}';
const vidFast = 'https://vidfast.pro/{type}/{id}';
const vidLink = 'https://vidlink.pro/{type}/{id}';
const vidEasy = 'https://player.videasy.net/{type}/{id}';
const movies111 = 'https://111movies.com/{type}/{id}';
const vidRock = 'https://vidrock.net/{type}/{id}';
const goDrive = 'https://godriveplayer.com/player.php?imdb={id}';
const goTv = 'https://godriveplayer.com/player.php?type=series&tmdb={id}&season={season}&episode={episode}';
const twoEmbed = 'https://www.2embed.cc/embed/{id}';
const riveStream = 'https://rivestream.xyz/watch?type={type}&id={id}&season={season}&episode={episode}';
// https://www.fmovies.gd/watch/tv/61859/1/1
const fmovies = 'https://www.fmovies.gd/watch/{type}/{id}';
const AiSearch = 'https://wovie3.vercel.app/api/ai-search';


// https://vidsrc.to/embed/movie/{id}
// const vidsrcUrl = 'https://vidsrc.to/embed/movie';
// https://vidrock.net/movie
// https://vidsrc.icu/embed/movie/{id}
// https://111movies.com/movie/{id}
// https://111movies.com/tv/{id}/{season}/{episode}

const getStarSport1 = 'https://streamcrichd.com/update/star.php';
// Hindi stream (added)
const getStarSport1Hindi = 'https://streamcrichd.com/update/star1hi.php';

const trendingMoviesUrl = 'https://api.themoviedb.org/3/trending';
// const moviesUrl = 'https://api.themoviedb.org/3/discover/movie';
const moviesUrl = 'https://api.themoviedb.org/3/trending/movie';
const tvUrl = 'https://api.themoviedb.org/3/trending/tv';
const searchUrl = 'https://api.themoviedb.org/3/search/multi';
const tagUrl = 'https://api.themoviedb.org/3/movie/{id}';

const getPopularMovies = () => axios.get(movieBaseUrl + '/movie/popular?api_key=' + api_Key);
// const getTopRatedMovies = axios.get(movieBaseUrl + '/top_rated?api_key=' + api_Key);
// const getUpcomingMovies = axios.get(movieBaseUrl + '/upcoming?api_key=' + api_Key);
// const getMoviesByGenreId= (genreId: number) => axios.get(movieByGenreUrl + '&with_genres=' + genreId);
const getTrendingMovies = () => axios.get(trendingMoviesUrl + '/all/day?api_key=' + api_Key);
const getMovies = () => axios.get(moviesUrl + '/week?api_key=' + api_Key);
const getTvShows = () => axios.get(tvUrl + '/day?api_key=' + api_Key);
const getsearchMovies = (query: string) => axios.get(searchUrl + '?api_key=' + api_Key + '&query=' + encodeURIComponent(query));
const gettagMovie = (id: string) => axios.get(tagUrl.replace('{id}', id) + '?api_key=' + api_Key);
const getAiSearch = (query: string) => axios.post(AiSearch, { query });


export default {getPopularMovies, getTrendingMovies, getMovies, getTvShows, getsearchMovies, gettagMovie , getAiSearch,
                getStarSport1, getStarSport1Hindi,
                viTo, viIcu, vidFast, vidLink, vidEasy, vidRock, goDrive, twoEmbed, riveStream, movies111 , goTv , fmovies
};
