
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { countries } from './data/countries.js';
import fetchPlayers from './services/playersFetch.js';
import Icons from "./img/icons.svg";
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
export default function CountryTop() {
  const [country, setCountry] = React.useState('');
  const [players, setPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
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

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleCountryChange = (event, value) => {
    setCountry(value ? value.code : '');
  };
  const CustomPopper = (props) => {
    return (
      <Popper {...props} modifiers={[{ name: 'offset', options: { offset: [0, 0] } }]} />
    );
  };
  var uniquePlayers = [];
  const seenCountries = new Set();

  players.forEach(player => {
    if (
      !seenCountries.has(player.country.code) ||
      player.rank.points > uniquePlayers.find(p => p.country.code === player.country.code).rank.points
    ) {
      uniquePlayers = uniquePlayers.filter(p => p.country.code !== player.country.code);
      uniquePlayers.push(player);
      seenCountries.add(player.country.code);
    }
  });

  const filteredPlayers = uniquePlayers.filter((row) => {
    const matchesCountry =
      country ? row.country.flag.includes(country.toLowerCase())
        : true;
    return matchesCountry;
  });

  return (
    <div className="container">
      <h2 className="section-title">Top 1 for each country</h2>
      
      <div className="table-container">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr className="table-header-row country-top">
                <th className="table-cell country-top-cell header-cell"><h3 className='table-title'>
                Country
      </h3></th>
                <th className="table-cell country-top-cell header-cell"><h3 className='table-title'>Player</h3></th>
                <th className="table-cell country-top-cell header-cell"><h3 className='table-title'>MMR</h3></th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((row, index) => (
                <tr key={index} className="table-row country-top">
                  <td className="table-cell country-top-cell">
                  <div className="country-flag-container">
                  <img
                    className="country-flag"  
                    src={row.country.flag}
                    alt="Flag"
                    
                  />
                  <p className="table-text">{row.country.code}</p>
                </div>
                  </td>
                  <td className="table-cell country-top-cell player-cell">
                    <Link to={`/player-page/${encodeURIComponent(row.player.name)}`} className="player-link">
                     <div className="player-container">
                     <div style={{ display: "flex", alignItems: "center" }}>
                     <img
                    src={row.player.avatar}
                    alt="Avatar"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://p1.hiclipart.com/preview/716/196/996/blizzard-flat-iconset-starcraft-remastered-png-clipart.jpg';
                    }}
                    width="50"
                    height="50"
                    />
                        <div>
                          <p className="table-text">{row.player.name}</p>
                          <p className="table-text" >
                            {row.player.region}
                          </p>
                        </div>
                      </div>
                      </div> 
                    </Link>
                  </td>
                  <td className="table-cell country-top-cell mmr-cell"><p className='table-text'>{row.rank.points}</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}