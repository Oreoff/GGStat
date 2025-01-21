import CountryTop from './pages/country-top.jsx';
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
    <nav className = "navigation-menu">
      <ul className = "navigation-menu-list">
        <li className = "navigation-menu-item"><Link to="/" className='navigation-menu-link'>Leaderboard</Link></li>
        <li className = "navigation-menu-item"><Link to="/country-tops" className='navigation-menu-link'>Country tops</Link></li>
      </ul>
    </nav>
    <form action="" className="input-container">
    <input type="text" 
    className="input-item
  " placeholder="Find a player"
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
<p className="footer-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="terms-link">Terms & Conditions</a>
  </footer>
  </div>
  );
}

export default App;
