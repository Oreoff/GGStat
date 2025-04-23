import CountryTop from './pages/country-top.jsx';
import Icons from "./pages/img/icons.svg";
import MainPage from './pages/main-page.jsx';
import PlayerPage from './pages/player-page.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import {useState, useEffect} from 'react';
import './App.css';
import fetchPlayers from './pages/services/playersFetch.js';
const App = () =>  {
  const [query,setQuery] = useState('');
  const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    useEffect(() => {
      const loadPlayers = async () => {
        try {
          const data = await fetchPlayers();
          setPlayers(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      loadPlayers();
    }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  const filteredPlayers = players.filter(player => player.player.name.toLowerCase().includes(query.toLowerCase()));
  function ShowList()
  {
    const container = document.querySelector(".search-list");
    if(container) container.classList.toggle("active");
  }
  function RemoveList()
  {
    const container = document.querySelector(".search-list");
    if(container) container.classList.remove("active");
  }
  
  return (
    <div>
      <Router>
    <header className="container header-container">
              <h1 className="logo">GGStat</h1>
              <div className="burger-menu">
              <div className="burger-icon" onClick={() => setMenuOpen(!menuOpen)}>
  <div className={menuOpen ? "line open" : "line"}></div>
  <div className={menuOpen ? "line open" : "line"}></div>
  <div className={menuOpen ? "line open" : "line"}></div>
</div>
  <nav className={`navigation-menu ${menuOpen ? 'open' : ''}`}>
      <ul className = "navigation-menu-list">
        <li className = "navigation-menu-item"><Link to="/" className='navigation-menu-link'>
        <div className="navigation-menu-svg-container">
        <svg width={20} height={20} className='navgation-menu-svg'>
        <use href={`${Icons}#leaderboard`} />
    </svg>
          </div> 
        
    <p className="navigation-menu-text">Leaderboard</p></Link></li>
    <li className = "navigation-menu-item"><Link to="/country-tops" className='navigation-menu-link '>
        <div className="navigation-menu-svg-container country-top">
        <svg width={20} height={20} className='navgation-menu-svg'>
        <use href={`${Icons}#team-leader 2`} />
    </svg>
          </div> 
        
    <p className="navigation-menu-text">Country top</p></Link></li>
      </ul>
    </nav>

              </div>
              

<nav className={`navigation-menu `}>
      <ul className = "navigation-menu-list">
        <li className = "navigation-menu-item"><Link to="/" className='navigation-menu-link'>
        <div className="navigation-menu-svg-container">
        <svg  className='navigation-menu-svg' viewBox='0 0 20 20'>
        <use href={`${Icons}#leaderboard`} />
    </svg>
          </div> 
        
    <p className="navigation-menu-text">Leaderboard</p></Link></li>
    <li className = "navigation-menu-item"><Link to="/country-tops" className='navigation-menu-link '>
        <div className="navigation-menu-svg-container country-top">
        <svg className='navigation-menu-svg' viewBox='0 0 20 20'>
        <use href={`${Icons}#team-leader 2`} />
    </svg>
          </div> 
        
    <p className="navigation-menu-text">Country top</p></Link></li>
      </ul>
    </nav>
    <form action="" className="input-container">
  <div className="search-field-svg">
    <button
      type="button"
      className="search-button"
      onClick={() => setSearchOpen((prev) => !prev)}
    >
      <svg className="navigation-menu-svg" viewBox='0 0 20 20'>
        <use href={`${Icons}#Vector`} />
      </svg>
    </button>
  </div>
  <input
  type="text"
    className={`input-item ${searchOpen ? 'active' : ''}`}
   placeholder="Find a player"
  value={query}
  onChange={(e) => {
    setQuery(e.target.value);
    ShowList();
  }
   }
  />
  <ul className="search-list">
    
  {filteredPlayers.map((player, index) => (
    <Link to={`/player-page/${encodeURIComponent(player.player.name)}`}className="player-link" onClick = {()=>RemoveList()}>
          <li
            key={index}
            className='search-list-item'
            style={{
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={player.player.avatar}
              alt={player.player.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
            />
            <div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{player.player.name}</p>
              <p style={{ margin: 0, color: '#888' }}>{player.country.name}</p>
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
