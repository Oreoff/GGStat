import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { countries } from './data/countries.js';
import fetchPlayers from './services/playersFetch.js';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleCountryChange = (event, value) => {
    setCountry(value ? value.code : '');
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
        <div className="table-wrapper" style={{
          width: '100%',
          overflowX: 'auto',
          maxWidth: '100%',
          backgroundColor: '#232B35',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <table className="table" style={{
            minWidth: 650,
            width: '100%',
            borderCollapse: 'collapse',
            borderSpacing: 0
          }}>
            <thead>
              <tr className="table-header-row">
                <th className="table-cell" style={{ padding: '8px 16px' }}><div className="filters-container">
                <Autocomplete 
      id="country-select-demo"
      sx={{ 
        width: 300,
        '@media (max-width: 768px)': {
          width: '100%',
          maxWidth: '200px',
        }
      }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      className="country-selector"
      onChange={handleCountryChange}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        
        return (
          <div className='country-box'
          
            key={key}
            {...optionProps}
            style={{backgroundColor:"#232B35",
              color:"white",
              fontSize: 16,
              fontFamily: 'TT Firs Neue Trl',
              display: 'flex',
              alignItems: 'center'}}

          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
             
              alt=""
              style={{borderRadius:'5px'}}
            />
            {option.label} ({option.code})
          </div>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          className="country-selector-label"
          InputProps={{
            ...params.InputProps,
            style: {
              color: '#fff',
              fontSize: 16,
              fontFamily: 'TT Firs Neue Trl',
            },
          }}
          InputLabelProps={{
            style: {
              color: '#fff',
              fontSize: 16,
              fontFamily: 'TT Firs Neue Trl',
            },
          }}
          sx={{

            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#fff',
              },
              '&:hover fieldset': {
                borderColor: '#fff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff',
              },
            },
            '& .MuiSvgIcon-root': {
              color: '#fff',
            },
          }}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password',
            },
          }}
        />
      )}
    />
      </div></th>
                <th className="table-cell" style={{ padding: '8px 16px' }}><h3 className='table-title'>Player</h3></th>
                <th className="table-cell" style={{ padding: '8px 16px' }}><h3 className='table-title'>MMR</h3></th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((row, index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell" style={{ padding: '8px 16px' }}>
                  <div
                  style={{
                    overflow: 'hidden',
                    borderRadius: '5px',
                    marginRight: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    '@media (max-width: 768px)': {
                      width: '25px',
                      height: '20px',
                    }
                  }}
                >
                  <img
                    className="country-flag"  
                    src={row.country.flag}
                    alt="Flag"
                    
                  />
                  <p className="table-text">{row.country.code}</p>
                </div>
                  </td>
                  <td className="table-cell" style={{ padding: '8px 16px' }}>
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
                  <td className="table-cell" style={{ padding: '8px 16px' }}><p className='table-text'>{row.rank.points}</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}