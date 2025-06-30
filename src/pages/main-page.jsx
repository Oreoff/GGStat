import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import { Pagination } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import League from './league.jsx';
import Race from './race.jsx';
import Icons from "./img/icons.svg";
import { countries } from './data/countries.js';
import fetchPlayers from './services/playersFetch.js';
import { Link } from 'react-router-dom';

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [players, setPlayers] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [bar, setBar] = React.useState(false);

  const [country, setCountry] = React.useState(searchParams.get('country') || '');
  const [race, setRace] = React.useState(searchParams.get('race') || '');
  const [league, setleague] = React.useState(searchParams.getAll('league') || []);
  const [region, setRegion] = React.useState('');
  const [page, setPage] = React.useState(parseInt(searchParams.get('page')) || 1);
  const [playersPerPage] = React.useState(25);

  const toggleWindow = () => setBar(!bar);
  const closeModal = () => setBar(false);

  const isFilterActive = (league.length > 0) || !!race || !!country;

  const setGlobal = () => {
    setCountry('');
    setRegion('');
    setPage(1);
    updateQueryParams({ country: '', race: '', league: [], page: 1 });
  };

  const SetKoreans = () => {
    setCountry('KR');
    setRegion('Korea');
    setPage(1);
    updateQueryParams({ country: 'KR', race, league, page: 1 });
  };

  const setNonKoreans = () => {
    setCountry('!KR');
    setRegion('Non-Korea');
    setPage(1);
    updateQueryParams({ country: '!KR', race, league, page: 1 });
  };

  const clearleagues = () => {
    setleague([]);
    setPage(1);
    updateQueryParams({ country, race, league: [], page: 1 });
  };

  const updateQueryParams = (newParams = {}) => {
    const params = new URLSearchParams();

    const newPage = newParams.page ?? page;
    const newCountry = newParams.country ?? country;
    const newRace = newParams.race ?? race;
    const newLeague = newParams.league ?? league;

    if (newPage > 1) params.set('page', newPage.toString());
    if (newCountry) params.set('country', newCountry);
    if (newRace) params.set('race', newRace);
    if (newLeague.length > 0) newLeague.forEach((r) => params.append('league', r));

    setSearchParams(params);
  };

  const handleCountryChange = (event, value) => {
    const code = value ? value.code : '';
    setCountry(code);
    setPage(1);
    updateQueryParams({ country: code, race, league, page: 1 });
  };

  const handleRaceChange = (value) => {
    setRace(value);
    setPage(1);
    updateQueryParams({ country, race: value, league, page: 1 });
  };

  const handleleagueChange = (value) => {
    const updated = league.includes(value)
      ? league.filter((r) => r !== value)
      : [...league, value];
    setleague(updated);
    setPage(1);
    updateQueryParams({ country, race, league: updated, page: 1 });
  };

  const clearAll = () => {
    setCountry('');
    setRace('');
    setleague([]);
    setPage(1);
    setRegion('');
    setSearchParams({});
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    updateQueryParams({ country, race, league, page: value });
  };

   const loadPlayers = async () => {
    setLoading(true);
    try {
      const data = await fetchPlayers({ country, race, league, page });
      console.log("Fetched data:", data);
      if (data) {
        setPlayers(data.players || []);
        setTotalCount(data.totalCount || 0);
      } else {
        setPlayers([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error('Failed to load players:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadPlayers();
  }, [country, race, league, page]);
  const paginatedPlayers = players;

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const CustomPopper = (props) => (
    <Popper {...props} modifiers={[{ name: 'offset', options: { offset: [0, 0] } }]} />
  );
    return(
        <div className="container">
          <div className="section-container">
          <div className="section-name-container">
                <h2 className='section-title'>Leaderboards</h2>
                <p className="section-description">Welcome to GGStat, the StarCraft: Remastered ladder leagueings browser. </p>
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
            options={countries}
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
              className="table-cell table-cell-league"
            >
              <div className="select-league-button-container">
            <button className={`select-league-button ${league.includes("S") ? "contained" : ""}`} onClick={() => handleleagueChange("S")}>S</button>
            <button className={`select-league-button ${league.includes("A") ? "contained" : ""}`} onClick={() => handleleagueChange("A")}>A</button>
            <button className={`select-league-button ${league.includes("B") ? "contained" : ""}`} onClick={() => handleleagueChange("B")}>B</button>
            <button className={`select-league-button ${league.includes("C") ? "contained" : ""}`} onClick={() => handleleagueChange("C")}>C</button>
            <button className={`select-league-button ${league.includes("D") ? "contained" : ""}`} onClick={() => handleleagueChange("D")}>D</button>
            <button className={`select-league-button ${league.includes("E") ? "contained" : ""}`} onClick={() => handleleagueChange("E")}>E</button>
            <button className={`select-league-button ${league.includes("F") ? "contained" : ""}`} onClick={() => handleleagueChange("F")}>F</button>
            <button className={`select-league-button ${league.length === 0 ? "contained" : ""}`}onClick={() => clearleagues()}>All</button>
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
                <div className="player-container-flex">     
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
                className="table-cell league-cell"
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
  count={Math.ceil(totalCount / playersPerPage)}
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
            
<p className="select-league-label">Choose league</p>
    <div className="select-league-button-container modal">
            <button className={`select-league-button ${league.includes("S") ? "contained" : ""}`} onClick={() => handleleagueChange("S")}>S</button>
            <button className={`select-league-button ${league.includes("A") ? "contained" : ""}`} onClick={() => handleleagueChange("A")}>A</button>
            <button className={`select-league-button ${league.includes("B") ? "contained" : ""}`} onClick={() => handleleagueChange("B")}>B</button>
            <button className={`select-league-button ${league.includes("C") ? "contained" : ""}`} onClick={() => handleleagueChange("C")}>C</button>
            <button className={`select-league-button ${league.includes("D") ? "contained" : ""}`} onClick={() => handleleagueChange("D")}>D</button>
            <button className={`select-league-button ${league.includes("E") ? "contained" : ""}`} onClick={() => handleleagueChange("E")}>E</button>
            <button className={`select-league-button ${league.includes("F") ? "contained" : ""}`} onClick={() => handleleagueChange("F")}>F</button>
            <button className={`select-league-button ${league.length === 0 ? "contained" : ""}`}onClick={() => clearleagues()}>All</button>
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
