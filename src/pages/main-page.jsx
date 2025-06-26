import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import { Pagination } from '@mui/material';import { PaginationItem} from '@mui/material';
import { Link } from 'react-router-dom';
import League from './league.jsx'; 
import Race from './race';
import Icons from "./img/icons.svg";
import { countries } from './data/countries.js';
import fetchPlayers from './services/playersFetch.js';
import Popper from '@mui/material/Popper';
export default function MainPage()
{
  const [country, setCountry] = React.useState('');

  const [page, setPage] = React.useState(1);
  const [playersPerPage,setPlayersPerPage] = React.useState(25);
  const [rank, setRank] = React.useState([]);  
  const [race, setRace] = React.useState('');
  const [players, setPlayers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [bar, setBar] = React.useState(false);
    const [region, setRegion] = React.useState("");
    const [filter, setFilter] = React.useState("");

    const toggleWindow = () => {
      setBar(!bar);
    };
    const closeModal = () => setBar(false);
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
    if (loading) return <p className="loading-text">Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  const handlePlayersChange = (event) => {
    setPlayersPerPage(event.target.value);
  };
const playerCountryCodes = [...new Set(players.map(p => p.code))];

      const countriesWithPlayers = countries.filter(country =>
        playerCountryCodes.includes(country.code)
      ).map(country => ({
        ...country,
        label: country.label,
      }));
  const handleRankChange = (rank) => {
   setRank((prevRanks) =>
    prevRanks.includes(rank)
      ? prevRanks.filter((r) => r !== rank)
      : [...prevRanks, rank] 
  );
  };
  const clearRanks = () => setRank([]);
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
    setRegion("Korea");
  }
  const setGlobal = (value) =>
  {
    setCountry("");
    setRegion("");
  }
  const isFilterActive = (rank.length > 0) || race || country;
  const CustomPopper = (props) => {
    return (
      <Popper {...props} modifiers={[{ name: 'offset', options: { offset: [0, 0] } }]} />
    );
  };
  const setNonKoreans = (value) =>
    {
      setCountry("!KR");
          setRegion("Non-Korea");
    }
    const clearAll = () =>
    {
      setCountry("");
       setRank([]);
      setRace("");
      setRegion("");
    }
  const filteredPlayers = players.filter((row) => {
    const matchesCountry = country === "!KR"
    ? row.country.flag !== "https://flagcdn.com/w40/kr.png" 
    : country
    ? row.country.flag.includes(country.toLowerCase())
    : true;
    const matchesRank = rank ?  rank.length === 0|| rank.includes(row.rank.league) : true;
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
                <p className="section-description">Welcome to GGStat, the StarCraft: Remastered ladder rankings browser. </p>
                <button className={`filter-button ${isFilterActive ? 'filter-active' : ''}`} onClick={toggleWindow}>
  <p className="filter-button-text">Filter</p>
  <svg width={15} height={15} className='buttons-svg-item'>
    <use href={`${Icons}#filter`} />
  </svg>
</button>
            </div>
            <div className="buttons-container">
                <button className={`buttons-container-item ${region === ""? "region-chosen":""}`} onClick={setGlobal}>
                  
                          <svg width={20} height={20} className='buttons-svg-item'>
                          <use href={`${Icons}#statisctics 1`} />
                      </svg>
                            
                            Global</button>
                <button className={`buttons-container-item ${region === "Korea"? "region-chosen":""}`} onClick={SetKoreans}> 
                          <svg width={20} height={20} className='buttons-svg-item'>
                          <use href={`${Icons}#korea`} />
                      </svg>
                             Korea</button>
                <button className={`buttons-container-item ${region === "Non-Korea"? "region-chosen":""}`} onClick={setNonKoreans}>
                
                          <svg width={20} height={20} className='buttons-svg-item'>
                          <use href={`${Icons}#team-leader 2`} />
                      </svg>
                            Non-Korea</button>
            </div>
          </div>

            <div className="table-container">
            <div className="table-wrapper" >
      <table 
        className="table" 
        
      >
        <thead>
          <tr className="table-header-row">
            <th 
              className="table-cell table-cell-center"
            ><p className="table-text table-title">Place</p></th>
            <th 
              className="table-cell table-cell-player"
            ><p className="table-text table-title">Player</p></th>
            <th 
              className="table-cell table-cell-country"
            > <Autocomplete
            id="country-select-demo"
            options={countriesWithPlayers}
            autoHighlight
            getOptionLabel={(option) => option.label}
            onChange={handleCountryChange}
            PopperComponent={CustomPopper}
            sx={{
              width: 300,
              borderRadius: '12px',
              '& .MuiAutocomplete-inputRoot': {
                borderRadius: '8px',
                backgroundColor: '#232B35',
              },
              '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
              '& .MuiAutocomplete-option': {
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              },
              '& .MuiAutocomplete-popupIndicator': {
                color: 'white',
              },
              '& .MuiAutocomplete-popper': {
                marginTop: '0px !important',
              },
              '& .MuiAutocomplete-paper': {
                backgroundColor: '#232B35',
                borderTop: 'none',         
                boxShadow: 'none',          
              },
              '& .MuiOutlinedInput-root': {
                color: 'white',
              },
              '& .MuiInputLabel-root': {
                color: 'white', 
                fontFamily: 'TT Firs Neue Trl',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white', 
              },
            }}
            componentsProps={{
              paper: {
                sx: {
                  backgroundColor: '#232B35',
                  boxShadow: 'none',
                  marginTop: '0px',
                  borderTop: 'none',
                },
              },
            }}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
          
              return (
                <div
                  className="country-box"
                  key={key}
                  {...optionProps}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 8px',
                    backgroundColor: '#232B35',
                    color: 'white',
                    fontFamily: 'TT Firs Neue Trl',
                    fontSize: '12px',
                  }}
                >
                  <img
                    loading="lazy"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt=""
                    style={{ width: 20, height: 15, borderRadius: 2 }}
                  />
                  {option.label} ({option.code})
                </div>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                InputProps={{
                  ...params.InputProps,
                  className: 'country-selector-input',
                }}
                InputLabelProps={{
                  className: 'country-selector-label',
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
              className="table-cell table-cell-rank"
            >
              <div className="select-rank-button-container">
            <button className={`select-rank-button ${rank.includes("S") ? "contained" : ""}`} onClick={() => handleRankChange("S")}>S</button>
            <button className={`select-rank-button ${rank.includes("A") ? "contained" : ""}`} onClick={() => handleRankChange("A")}>A</button>
            <button className={`select-rank-button ${rank.includes("B") ? "contained" : ""}`} onClick={() => handleRankChange("B")}>B</button>
            <button className={`select-rank-button ${rank.includes("C") ? "contained" : ""}`} onClick={() => handleRankChange("C")}>C</button>
            <button className={`select-rank-button ${rank.includes("D") ? "contained" : ""}`} onClick={() => handleRankChange("D")}>D</button>
            <button className={`select-rank-button ${rank.includes("E") ? "contained" : ""}`} onClick={() => handleRankChange("E")}>E</button>
            <button className={`select-rank-button ${rank.includes("F") ? "contained" : ""}`} onClick={() => handleRankChange("F")}>F</button>
            <button className={`select-rank-button ${rank.length === 0 ? "contained" : ""}`}onClick={() => clearRanks()}>All</button>
            </div></th>
            <th 
              className="table-cell table-cell-race"
            >
              <div className="select-race-button-container">
                <button className={`terran-button select-race-button ${race ==="T"?"selected":""}`} onClick={() => handleRaceChange("T")}>T</button>
                <button className={`zerg-button select-race-button ${race ==="Z"?"selected":""}`} onClick={() => handleRaceChange("Z")}>Z</button>
                <button className={`protoss-button select-race-button ${race ==="P"?"selected":""}`} onClick={() => handleRaceChange("P")}>P</button>
                <button className={`select-race-button ${race ===""?"selected":""}`} onClick={() => handleRaceChange("")}>All</button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedPlayers.map((row, index) => (
            <tr key={index} className="table-row">
              <td 
                className="table-cell table-cell-standing"
              ><div className="standing-container"><p className="table-text table-standing">{row.standing}</p></div></td>
              <td className="table-cell" >
              <Link to={`/player-page/${encodeURIComponent(row.name)}`} className="player-link">
                <div className="player-container player-container-flex">     
                  <img
                    src={row.avatar}
                    alt="Avatar"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://p1.hiclipart.com/preview/716/196/996/blizzard-flat-iconset-starcraft-remastered-png-clipart.jpg';
                    }}
                    width="50"
                    height="50"
                    className="player-avatar"
                  />
                  <div>
                    <p className="table-text">{row.name}</p>
                    <p className="table-text player-region-text">{row.region}</p>
                  </div>
                  
            
                </div>
                </Link>
              </td>
              <td 
                className="table-cell country-cell"
              >
              <div className="country-flag-container">
              <img
                    src={row.flag}
                    alt="Flag"
                    className="country-flag"
                  />
                <p className="table-text">{row.code}</p>
              </div>
                  

              </td>
              <td 
                className="table-cell rank-cell"
              >
                <div className="race-container">
                  <League text={row.league}MMR={row.points} />
                </div>
              </td>
              <td 
                className='table-cell race-cell'
                style={{ padding: 0 }}
              ><Race text = {row.race}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="pagination-container">

    
    <div className="pagination-wrapper">
    <Pagination
  count={Math.ceil(filteredPlayers.length / playersPerPage)}
  page={page}
  onChange={handleChangePage}
  shape="square"
  sx={{
    '& .MuiPaginationItem-root': {
      color: 'white',
      border: '1px solid gray',
      '&:hover': {
        backgroundColor: '#333',
        color: '#00F89F',
      },
      '&.Mui-selected': {
        backgroundColor: '#00F89F',
        color: '#232B35',
      },
    },
  }}
/>
      </div>
      </div>
            </div>
            {bar && (
              <div
              className="backdrop"
            >
        <div className="filter-container">
           <div className="buttons-container modal">
                <button className={`buttons-container-item ${region === ""? "region-chosen":""}`} onClick={setGlobal}>
                  
                          <svg width={20} height={20} className='buttons-svg-item'>
                          <use href={`${Icons}#statisctics 1`} />
                      </svg>
                            
                            Global</button>
                <button className={`buttons-container-item ${region === "Korea"? "region-chosen":""}`} onClick={SetKoreans}> 
                          <svg width={20} height={20} className='buttons-svg-item'>
                          <use href={`${Icons}#korea`} />
                      </svg>
                             Korea</button>
                <button className={`buttons-container-item ${region === "Non-Korea"? "region-chosen":""}`} onClick={setNonKoreans}>
                
                          <svg width={20} height={20} className='buttons-svg-item'>
                          <use href={`${Icons}#team-leader 2`} />
                      </svg>
                            Non-Korea</button>
            </div>
           <div className="modal-country-container">
            <p className="modal-country-container-text"> Choose a country</p>
            <Autocomplete
            className='modal-country-selector'
  id="country-select-demo"
  options={countriesWithPlayers}
  autoHighlight
  getOptionLabel={(option) => option.label}
  onChange={handleCountryChange}
  PopperComponent={CustomPopper}
  sx={{
    width: 300,
    borderRadius: '12px',
    '& .MuiAutocomplete-inputRoot': {
      borderRadius: '8px',
      backgroundColor: '#232B35',
    },
    '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
    '& .MuiAutocomplete-option': {
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    '& .MuiAutocomplete-popupIndicator': {
      color: 'white',
    },
    '& .MuiAutocomplete-popper': {
      marginTop: '0px !important',
    },
    '& .MuiAutocomplete-paper': {
      backgroundColor: '#232B35',
      borderTop: 'none',         
      boxShadow: 'none',          
    },
    '& .MuiOutlinedInput-root': {
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'white', 
      fontFamily: 'TT Firs Neue Trl',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white', 
    },
  }}
  componentsProps={{
    paper: {
      sx: {
        backgroundColor: '#232B35',
        boxShadow: 'none',
        marginTop: '0px',
        borderTop: 'none',
      },
    },
  }}
  renderOption={(props, option) => {
    const { key, ...optionProps } = props;

    return (
      <div
        className="country-box"
        key={key}
        {...optionProps}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 8px',
          backgroundColor: '#232B35',
          color: 'white',
          fontFamily: 'TT Firs Neue Trl',
          fontSize: '12px',
        }}
      >
        <img
          loading="lazy"
          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
          alt=""
          style={{ width: 20, height: 15, borderRadius: 2 }}
        />
        {option.label} ({option.code})
      </div>
    );
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Choose a country"
      InputProps={{
        ...params.InputProps,
        className: 'country-selector-input',
      }}
      InputLabelProps={{
        className: 'country-selector-label',
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
</div>
            
<p className="select-rank-label">Choose rank</p>
    <div className="select-rank-button-container modal">
            <button className={`select-rank-button ${rank.includes("S") ? "contained" : ""}`} onClick={() => handleRankChange("S")}>S</button>
            <button className={`select-rank-button ${rank.includes("A") ? "contained" : ""}`} onClick={() => handleRankChange("A")}>A</button>
            <button className={`select-rank-button ${rank.includes("B") ? "contained" : ""}`} onClick={() => handleRankChange("B")}>B</button>
            <button className={`select-rank-button ${rank.includes("C") ? "contained" : ""}`} onClick={() => handleRankChange("C")}>C</button>
            <button className={`select-rank-button ${rank.includes("D") ? "contained" : ""}`} onClick={() => handleRankChange("D")}>D</button>
            <button className={`select-rank-button ${rank.includes("E") ? "contained" : ""}`} onClick={() => handleRankChange("E")}>E</button>
            <button className={`select-rank-button ${rank.includes("F") ? "contained" : ""}`} onClick={() => handleRankChange("F")}>F</button>
            <button className={`select-rank-button ${rank.length === 0 ? "contained" : ""}`}onClick={() => clearRanks()}>All</button>
            </div>
            <p className="select-race-label">Choose race</p>
            <div className="select-race-button-container">
               <button className={`terran-button select-race-button ${race ==="T"?"selected":""}`} onClick={() => handleRaceChange("T")}>T</button>
                <button className={`zerg-button select-race-button ${race ==="Z"?"selected":""}`} onClick={() => handleRaceChange("Z")}>Z</button>
                <button className={`protoss-button select-race-button ${race ==="P"?"selected":""}`} onClick={() => handleRaceChange("P")}>P</button>
                <button className={`select-race-button ${race ===""?"selected":""}`} onClick={() => handleRaceChange("")}>All</button>
              </div>
              <div className="close-button-container">
                <button className="close-button" onClick={clearAll}>Clear all</button>
                <button className="close-button" onClick={toggleWindow}>Show results</button>
              </div>
        </div>
        </div>
      )}
        </div>
        
    );
}
