import CountryTop from './pages/country-top.jsx';
import Icons from "./pages/img/icons.svg";
import MainPage from './pages/main-page.jsx';
import PlayerPage from './pages/player-page.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {useState, useEffect, useRef} from 'react';
import { NavLink } from "react-router-dom";
import './App.css';
import searchFetch from './pages/services/searchFetch.js';
const App = () =>  {
  const [query,setQuery] = useState('');
  const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const inputRef = useRef(null);
    const handleSearchClick = () => {
      setSearchOpen((prev) => !prev);     
    };
    
    useEffect(() => {
      if (searchOpen) {
        inputRef.current?.focus();
      }
    }, [searchOpen]);
    useEffect(() => {
  const loadPlayers = async () => {
    if (!query.trim()) {
      setPlayers([]);
      return;
    }
    try {
      const data = await searchFetch(query);
      setPlayers(data);
    } catch (err) {
      setError(err.message);
    }
  };
  loadPlayers();
}, [query]);
  function ShowList()
  {
    const container = document.querySelector(".search-list");
    if(container) container.classList.add("search-open");
  }
  function RemoveList()
  {
    const container = document.querySelector(".search-list");
    if(container) container.classList.remove("search-open");
     const input = document.querySelector(".input-item"); 
  if (input) input.value = "";
  }
  return (
    <div>
      <Router>
    <header className="container header-container">
              <Link to="/" className='logo-link'><h1 className="logo">GGStat</h1></Link>
              <div className="burger-menu">
              <div className="burger-icon" onClick={() => setMenuOpen(!menuOpen)}>
  <div className={menuOpen ? "line open" : "line"}></div>
  <div className={menuOpen ? "line open" : "line"}></div>
  <div className={menuOpen ? "line open" : "line"}></div>
</div>
  <nav className={`navigation-menu ${menuOpen ? 'open' : ''}`}>
      <ul className = "navigation-menu-list">
        <li className = "navigation-menu-item"><NavLink to="/" end className='navigation-menu-link'>
        <svg width={20} height={20} className='navigation-menu-svg'>
        <use href={`${Icons}#leaderboard`} />
    </svg>
    <p className="navigation-menu-text">Leaderboard</p></NavLink></li>
    <li className = "navigation-menu-item"><NavLink to="/country-tops" className='navigation-menu-link '>
        <svg width={20} height={20} className='navigation-menu-svg'>
        <use href={`${Icons}#team-leader 2`} />
    </svg>
       
    <p className="navigation-menu-text">Country top</p></NavLink></li>
      </ul>
    </nav>
              </div>
<nav className={`navigation-menu `}>
       <ul className = "navigation-menu-list">
        <li className = "navigation-menu-item"><NavLink to="/" end className='navigation-menu-link'>
        <svg width={20} height={20} className='navigation-menu-svg'>
        <use href={`${Icons}#leaderboard`} />
    </svg>
    <p className="navigation-menu-text">Leaderboard</p></NavLink></li>
    <li className = "navigation-menu-item"><NavLink to="/country-tops" className='navigation-menu-link '>

        <svg width={20} height={20} className='navigation-menu-svg'>
        <use href={`${Icons}#team-leader 2`} />
    </svg>
    <p className="navigation-menu-text">Country top</p></NavLink></li>
      </ul>
    </nav>
    <form action="" className="input-container">
  <div className="search-field-button">
    <button
      type="button"
      className="search-button-item"
      onClick={handleSearchClick}
    >
      <svg className="search-button-svg" viewBox='0 0 20 20'>
        <use href={`${Icons}#Vector`} />
      </svg>
    </button>
  </div>
  <input
  type="text"
  ref={inputRef}
    className="input-item"
   placeholder="Find a player"
  value={query}
  onChange={(e) => {
    setQuery(e.target.value);
    ShowList();
  }
   }
  />
  <ul className="search-list">
    
  {players.map((name, index) => (
  <Link
    to={`/player-page/${encodeURIComponent(name)}`}
    className="player-link"
    onClick={() => RemoveList()}
    key={index}
  >
    <li className="search-list-item">
      <div>
        <p className="search-field-text">{name}</p>
      </div>
    </li>
  </Link>
))}
  </ul>
  </form>
  </header>
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/country-tops" element={<CountryTop/>}/>
      <Route path="/player-page/:name" element={<PlayerPage/>}/>
    </Routes>
  </Router> 
  <footer className="footer">
    <div className="footer-container">
      <p className="copyright all-rights">Copyright © 2025 - All right reserved</p>
      <p className="copyright">This site is not affiliated with, endorsed, sponsored, or specifically approved by Blizzard Entertainment, Inc., and Blizzard Entertainment, Inc. is not responsible for it. Images from StarCraft are © Blizzard Entertainment, Inc. All rights reserved. StarCraft, Brood War and Blizzard Entertainment are trademarks or registered trademarks of Blizzard Entertainment, Inc. in the U.S. and/or other countries.</p>
    </div>
  </footer>
  </div>
  );
}
export default App;
