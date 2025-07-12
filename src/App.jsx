/* Darkmode */
import { useEffect, useState, useRef } from 'react';
  /* Route to pages */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
  /* Navigate pages */
import { useNavigate } from 'react-router-dom';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import './App.css';
import Home from './Home';
import Mylist from './mylist';

const profile_iconsize = 25;

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

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

function Title() {
    const navigate = useNavigate();

  return (
    <>
    <main>
    <h2>Welcome to</h2>
    <h1 className='title'>Movieflix</h1>
      <div className='btn-container'>
        <button onClick= {() => navigate('/home')} className='button-divein'>DIVE IN</button>
        <button onClick= {() => navigate('/mylist')} className='button-mylist'>MY LIST</button>
      </div>
    </main>
    </>
      );
}

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = 
    {<>
    <Header/>
    <Title />
    </>} />
    <Route path = "/home" element = {<Home />}/>
    <Route path = "/mylist" element = {<Mylist />}/>
    </Routes>
    </BrowserRouter>
  </>
    );
}

export default App;
