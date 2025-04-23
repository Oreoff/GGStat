import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import League from './league.jsx'; 
import Race from './race';
import Icons from "./img/icons.svg";
import { countries } from './data/countries.js';
import fetchPlayers from './services/playersFetch.js';
export default function MainPage()
{
  const [country, setCountry] = React.useState('');

  const [page, setPage] = React.useState(1);
  const [playersPerPage,setPlayersPerPage] = React.useState(25);
  const [rank, setRank] = React.useState('');  
  const [race, setRace] = React.useState('');
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
    console.log("Players:" + players);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  const handlePlayersChange = (event) => {
    setPlayersPerPage(event.target.value);
  };

  const handleRankChange = (rank) => {
    setRank(rank);
  };
  const handleCountryChange = (event, value) => {
    setCountry(value ? value.code : '');
  };
  const handleRaceChange = (race) => {
    setRace(race);
  };
  const handleChangePage = (event, value) => {
    setPage(value);
  };
 
  const SetKoreans = (value) => 
  {
    setCountry("KR");
  }
  const setGlobal = (value) =>
  {
    setCountry("");
  }
  const setNonKoreans = (value) =>
    {
      setCountry("!KR");
    }
  const filteredPlayers = players.filter((row) => {
    const matchesCountry = country === "!KR"
    ? row.country.flag !== "https://flagcdn.com/w40/kr.png" 
    : country
    ? row.country.flag.includes(country.toLowerCase())
    : true;
    const matchesRank = rank ? row.rank.league.includes(rank): true;
    const matchesRace = race ? row.race.includes(race): true;
    return matchesCountry && matchesRank && matchesRace;
  });
  const paginatedPlayers = filteredPlayers.slice(
    (page - 1) * playersPerPage,
    page * playersPerPage
  );

    return(
        <div className="container">
          <div className="section-container">
          <div className="section-name-container">
                <h2 className='section-title'>Leaderboards</h2>
                <p className="section-description">Welcome to cwal.gg, the StarCraft: Remastered ladder rankings browser. </p>
            </div>
            <div className="buttons-container">
                <button className="buttons-container-item" onClick={setGlobal}>
                  
                          <svg width={20} height={20} className='buttons-svg-item'>
                          <use href={`${Icons}#statisctics 1`} />
                      </svg>
                            
                            Global</button>
                <button className="buttons-container-item" onClick={SetKoreans}> 
                          <svg width={20} height={20} className='buttons-svg-item'>
                          <use href={`${Icons}#korea`} />
                      </svg>
                             Korea</button>
                <button className="buttons-container-item" onClick={setNonKoreans}>
                
                          <svg width={20} height={20} className='buttons-svg-item'>
                          <use href={`${Icons}#team-leader 2`} />
                      </svg>
                            Non-Korea</button>
            </div>
          </div>

            <div className="table-container">
            <div className="table-wrapper" style={{
                width: '100%',
                overflowX: 'auto',
                maxWidth: '100%',
                backgroundColor: '#232B35',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}>
      <table 
        className="table" 
        style={{ 
          minWidth: 650,
          width: '100%',
          borderCollapse: 'collapse',
          borderSpacing: 0
        }}
      >
        <thead>
          <tr className="table-header-row">
            <th 
              className="table-cell" 
              style={{ 
                padding: 0, 
                textAlign:"center",
                minWidth: '40px'
              }}
            ><p className="table-text table-title">Place</p></th>
            <th 
              className="table-cell" 
              style={{ 
                padding: 0, 
                textAlign:"center",
                minWidth: '120px'
              }}
            ><p className="table-text table-title">Player</p></th>
            <th 
              className="table-cell" 
              style={{ 
                padding: 5,
                minWidth: '100px'
              }}
            ><Autocomplete 
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
    /></th>
            <th 
              className="table-cell" 
              style={{ 
                padding: 0,
                minWidth: '80px'
              }}
            >
              <div className="select-rank-button-container" style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '2px'
              }}>
            <button className="select-rank-button" onClick={() => handleRankChange("S")}>S</button>
            <button className="select-rank-button" onClick={() => handleRankChange("A")}>A</button>
            <button className="select-rank-button" onClick={() => handleRankChange("B")}>B</button>
            <button className="select-rank-button" onClick={() => handleRankChange("C")}>C</button>
            <button className="select-rank-button" onClick={() => handleRankChange("D")}>D</button>
            <button className="select-rank-button" onClick={() => handleRankChange("E")}>E</button>
            <button className="select-rank-button" onClick={() => handleRankChange("F")}>F</button>
            <button className="select-rank-button" onClick={() => handleRankChange("")}>All</button>
            </div></th>
            <th 
              className="table-cell" 
              style={{ 
                padding: 0,
                minWidth: '60px'
              }}
            >
              <div className="select-race-button-container" style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '2px'
              }}>
                <button className="terran-button select-race-button " onClick={() => handleRaceChange("T")}>T</button>
                <button className="zerg-button select-race-button" onClick={() => handleRaceChange("Z")}>Z</button>
                <button className="protoss-button select-race-button" onClick={() => handleRaceChange("P")}>P</button>
                <button className="select-race-button" onClick={() => handleRaceChange("")}>All</button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedPlayers.map((row, index) => (
            <tr key={index} className="table-row" style={{ padding: 0, borderRadius: "15px"}}>
              <td 
                className="table-cell" 
                style={{ 
                  padding: 0, 
                  textAlign:"center"
                }}
              ><div className="standing-container"><p className="table-text table-standing">{row.standing}</p></div></td>
              <td 
                className="table-cell" 
                style={{ padding: 0 }}
              >
              <Link to={`/player-page/${encodeURIComponent(row.player.name)}`} className="player-link">
                <div className="player-container"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    '@media (max-width: 768px)': {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }
                  }}
                >
                 

                  
                  <img
                    src={row.player.avatar}
                    alt="Avatar"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://p1.hiclipart.com/preview/716/196/996/blizzard-flat-iconset-starcraft-remastered-png-clipart.jpg';
                    }}
                    width="50"
                    height="50"
                    style={{ 
                      marginRight: 8,
                      '@media (max-width: 768px)': {
                        width: '40px',
                        height: '40px',
                        marginBottom: '4px',
                      }
                    }}
                  />
                  <div>
                    <p className="table-text">{row.player.name}</p>
                    <p className="table-text" style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem'}}>{row.player.region}</p>
                  </div>
                  
            
                </div>
                </Link>
              </td>
              <td 
                className="table-cell" 
                style={{ padding: 0 }}
              >
              <div className="country-flag-container">
              <img
                    src={row.country.flag}
                    alt="Flag"
                    className="country-flag"
                  />
                <p className="table-text">{row.country.code}</p>
              </div>
                  

              </td>
              <td 
                className="table-cell" 
                style={{ padding: 0 }}
              >
                <div 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    '@media (max-width: 768px)': {
                      justifyContent: 'center',
                    }
                  }}
                >
                  <League text={row.rank.league}MMR={row.rank.points} />
                </div>
              </td>
              <td 
                className='table-cell'
                style={{ padding: 0 }}
              ><Race text = {row.race}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="pagination-container">

    
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "16px",
        '@media (max-width: 768px)': {
          overflowX: 'auto',
          padding: '0 10px',
        }
      }}
    >
          <Pagination
                    count={Math.ceil(filteredPlayers.length / playersPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    shape="square"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        borderRadius: '8px',
                        border: '1px solid gray',
                        width: '40px',
                        height: '40px',
                        fontWeight: 'bold',
                        color: 'gray',
                        backgroundColor: '#232B35',
                        '&:hover': {
                          backgroundColor: '#00F89F',
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#232B35',
                          color: '#00F89F',
                          borderColor: '#00F89F',
                        }
                      }
                    }}
                  />
      </div>
      </div>
            </div>
        </div>
        
    );
}
