
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import { Link, replace } from 'react-router-dom';
import { countries } from './data/countries.js';
import countryTopFetch from './services/countryTopFetch.js';
import logo from './img/logo.png';
import free_belarus from './img/free belarus.png';
import free_russia from './img/free russia.png';
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
        const data = await countryTopFetch();
        setPlayers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  if (loading) return <div className="loader-container">
   <div class="loader"></div>
   <p className="loading-text">Loading....</p> </div>;
  if (error) return <p>Error: {error}</p>;


function ReplaceFlag(countryCode) {
  if(countryCode == 'RU'){
    return free_russia;
  }
  else if(countryCode == 'BY'){
    return free_belarus;
    }
    else return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}
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
              {players.map((row, index) => (
                <tr key={index} className="table-row country-top">
                  <td className="table-cell country-top-cell">
                  <div className="country-flag-container">
                  <img
                    className="country-flag"  
                    src={ReplaceFlag(row.code)}
                    alt="Flag"
                    
                  />
                  <div className="country-text-container">
<p className="table-text country-table-text">{row.code}</p>
                 <Link
  to={{
    pathname: "/",
    search: "?country=" + row.code,
  }}
  className="show-rating-link"
>
Rating
</Link>
                  </div>      
                </div>
                  </td>
                  <td className="table-cell country-top-cell player-cell">
                    <Link to={`/player/${encodeURIComponent(row.name)}`} className="player-link">
                     <div className="player-container-flex">
                     <div style={{ display: "flex", alignItems: "center" }}>
                     <img
                    src={row.avatar}
                    alt="Avatar"
                    onError={(e) => {
                      e.target.onerror = null; 
                          e.target.src = logo;

                    }}
                    width="50"
                    height="50"
                    />
                        <div>
                          <p className="table-text">{row.name}  <span className="alias">/{row.alias}/</span></p>
                          <p className="table-text" >
                            {row.region}
                          </p>
                        </div>
                      </div>
                      </div> 
                    </Link>
                  </td>
                  <td className="table-cell country-top-cell mmr-cell"><p className='table-text'>{row.points}</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}