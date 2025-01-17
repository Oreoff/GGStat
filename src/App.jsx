import CountryTop from './pages/country-top.jsx';
import MainPage from './pages/main-page.jsx';
import PlayerPage from './pages/player-page.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {players} from './pages/data/players.js';
import './App.css';
const App = () =>  {
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
    <input type="text" className="input-item" placeholder="Find a player"/>
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
