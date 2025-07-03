/* Darkmode */
import { useEffect, useState, useRef } from 'react';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import axios from 'axios';
import './App.css';
const profile_iconsize = 25;

function Header(){
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return(
    <>
    <header>
        <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
          {darkMode ? <CiLight size={profile_iconsize} color='#FFF'/> : <MdDarkMode size={profile_iconsize} />}
        </button>
    </header>
    </>
  )
}

function Body(){
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const tmdb = axios.create({
        baseURL: 'https://api.themoviedb.org/3',
    });

 const getPopularMovies = async () => {
    try {
const res = await tmdb.get(`/movie/popular`, {
    params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1,
    },
});
  return res.data.results;
} catch (error) {
    console.error('Failed to fetch popular movies:', error);
    return [];
}};

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await getPopularMovies();
      setMovies(data);
      setLoading(false);
    };

    loadMovies();
  }, []);

    return(
       <div className="page">
      <h1 className='title2'>Popular Movies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className='popular_movie_list'>
          {movies.map((movie) => (
            <li key={movie.id}>
            <img 
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            loading='lazy'
            />
        <div className="overlay">
             <div className='overlay_img'><img 
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            />
            </div>
            <div className='overlay_info'>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
        </div>
        </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    )
};

return(
    <>
        {PopularMovies()}
    </>
)
};

function Home(){
return (
    <>
        <Header />
        <Body />
    </>
    )
};

export default Home;