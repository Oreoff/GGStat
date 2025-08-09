import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Select, MenuItem, ListItemIcon, ListItemText } from '@mui/material';

import Popper from '@mui/material/Popper';
import { Pagination } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import League from './league.jsx';
import Race from './race.jsx';
import Icons from "./img/icons.svg";
import { countries } from './data/countries.js';
import fetchPlayers from './services/playersFetch.js';
import { Link } from 'react-router-dom';
import countryFetch from './services/countryFetch.js'
export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [players, setPlayers] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [bar, setBar] = React.useState(false);
const [selectedCountryCode, setSelectedCountryCode] = React.useState('');
  const [country, setCountry] = React.useState(searchParams.get('country') || '');
  const [race, setRace] = React.useState(searchParams.get('race') || '');
  const [league, setleague] = React.useState(searchParams.getAll('league') || []);
  const [region, setRegion] = React.useState('');
  const [page, setPage] = React.useState(parseInt(searchParams.get('page')) || 1);
  const [playersPerPage] = React.useState(25);
const [availableCountries, setAvailableCountries] = React.useState([]);
const [inputValue, setInputValue] = React.useState('');
const [showSuggestions, setShowSuggestions] = React.useState(false);
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
     setInputValue(value?.label || '');
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
const closeWindow = () => {
  setBar(false);
  clearAll();
}
  const handleChangePage = (event, value) => {
    setPage(value);
    updateQueryParams({ country, race, league, page: value });
  };
const countryAutocompleteRef = React.useRef(null);

React.useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      countryAutocompleteRef.current &&
      !countryAutocompleteRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const filteredCountries = React.useMemo(
  () => countries.filter((c) => availableCountries.includes(c.code)),
  [availableCountries]
);
const matching = React.useMemo(
  () =>
    filteredCountries.filter((c) =>
      c.label.toLowerCase().includes(inputValue.toLowerCase())
    ),
  [filteredCountries, inputValue]
);
const selectedCountryLabel = React.useMemo(
  () => filteredCountries.find((c) => c.code === country)?.label || '',
  [country, filteredCountries]
);

   const loadPlayers = async () => {
    setLoading(true);
    try {
      const data = await fetchPlayers({ country, race, league, page });
      const fetchedAvailableCountries = await countryFetch();
      setAvailableCountries(fetchedAvailableCountries);
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

  if (loading) return <div className="loader-container">
   <div class="loader"></div>
   <p className="loading-text">Loading....</p> </div>;
  if (error) return <p>Error: {error}</p>;

  const CustomPopper = (props) => (
    <Popper {...props} modifiers={[{ name: 'offset', options: { offset: [0, 0] } }]} />
    
  );
  

  console.log("Filtered countries:", filteredCountries);
 function ReplaceFlag(countryCode) {
  if(countryCode == 'RU'){
    return '/src/pages/img/free russia.png';
  }
  else if(countryCode == 'BY'){
    return '/src/pages/img/free belarus.png';
    }
    else return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}
  return(
        <div className="container">
          <div className="section-container">
          <div className="section-name-container">
                <h2 className='section-title'>Leaderboards</h2>
                <p className="section-description">Welcome to GGStat, the StarCraft: Remastered ladder leagueings browser. </p>
                <div className="filter-buttons-container">
<button className={`filter-button ${isFilterActive ? 'filter-active' : ''}`} onClick={toggleWindow}>
  <p className="filter-button-text">Filter</p>
  <svg width={15} height={15} className='filter-button-svg'>
    <use href={`${Icons}#filter`} />
  </svg>
</button>
<button className={`filter-button clear-button hidden ${isFilterActive ? 'show-up' : ''}`} onClick={clearAll}>
  <svg width={15} height={15} className="filter-button-svg clear-svg">
    <use href={`${Icons}#close`} />
  </svg>
</button>
                </div>
                
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
            > <div
  ref={countryAutocompleteRef}
  className="country-autocomplete-container"
>
  <svg width={20} height={20} className='country-globus-svg'>
          <use href={`${Icons}#team-leader 2`} />
      </svg>
  <input
    id="custom-country-autocomplete"
    type="text"
    className="country-autocomplete-input"
    value={inputValue}
   onChange={(e) => {
  const v = e.target.value;
  setInputValue(v);
  setShowSuggestions(true);
}}
    onFocus={() => setShowSuggestions(true)}
      onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const exact = filteredCountries.find(
        (c) => c.label.toLowerCase() === inputValue.trim().toLowerCase()
      );
      if (exact) {
        handleCountryChange(null, exact);
        setInputValue(exact.label);
      } else if (inputValue.trim() === '') {

        setCountry('');
        updateQueryParams({ country: '', race, league, page: 1 });
      } else {
        if (matching[0]) {
          handleCountryChange(null, matching[0]);
          setInputValue(matching[0].label);
        }
      }
      setShowSuggestions(false);
    }
  }}
    placeholder="All country"
   
    aria-autocomplete="list"
    aria-expanded={showSuggestions}
    aria-controls="country-autocomplete-list"
  />
  {showSuggestions && (
    <ul
      id="country-autocomplete-list"
      role="listbox"
      className='country-list'
    >
      {matching.length === 0 && (
        <li className='no-matches' role="option">
          No matches
        </li>
      )}
      {matching.map((c) => (
        <li
          key={c.code}
          role="option"
          className='country-item'
          onClick={() => {
            handleCountryChange(null, c);
            setInputValue(c.label);
            setShowSuggestions(false);
          }}
        >
          <img
            src={ReplaceFlag(c.code)}
            alt={`${c.label} flag`}
            className='country-selector-flag'
          />
          <span>
            {c.label} ({c.code})
          </span>
        </li>
      ))}
    </ul>
  )}
  <svg width={20} height={20} className='country-play-svg'>
          <use href={`${Icons}#play 1`} />
      </svg>
</div>
              </th>
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
                      e.target.src = '/src/pages/img/logo.png';
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
                    src={ReplaceFlag(row.code)}
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
  shape="rounded"
  sx={{
    '& .MuiPaginationItem-root': {
      color: 'gray',
      borderRadius: '10px',
      backgroundColor: '#1C2026',
      border: '2px solid #1C2026',
      fontSize: '12px',
      '& svg': {
        color: '#00F89F', 
      },
      '&:hover': {
        color: '#00F89F',
        borderColor:' #00F89F',
      },
      '&.Mui-selected': {
        color: '#00F89F',
        borderColor:' #00F89F',
        backgroundColor: '#232B35',
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
             <div
  ref={countryAutocompleteRef}
  className="country-autocomplete-container"
>
  <svg width={20} height={20} className='country-globus-svg'>
          <use href={`${Icons}#team-leader 2`} />
      </svg>
  <input
    id="custom-country-autocomplete"
    type="text"
    className="country-autocomplete-input"
    value={inputValue}
   onChange={(e) => {
  const v = e.target.value;
  setInputValue(v);
  setShowSuggestions(true);
}}
    onFocus={() => setShowSuggestions(true)}
      onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const exact = filteredCountries.find(
        (c) => c.label.toLowerCase() === inputValue.trim().toLowerCase()
      );
      if (exact) {
        handleCountryChange(null, exact);
        setInputValue(exact.label);
      } else if (inputValue.trim() === '') {

        setCountry('');
        updateQueryParams({ country: '', race, league, page: 1 });
      } else {
        if (matching[0]) {
          handleCountryChange(null, matching[0]);
          setInputValue(matching[0].label);
        }
      }
      setShowSuggestions(false);
    }
  }}
    placeholder="All country"
   
    aria-autocomplete="list"
    aria-expanded={showSuggestions}
    aria-controls="country-autocomplete-list"
  />
  {showSuggestions && (
    <ul
      id="country-autocomplete-list"
      role="listbox"
      className='country-list'
    >
      {matching.length === 0 && (
        <li className='no-matches' role="option">
          No matches
        </li>
      )}
      {matching.map((c) => (
        <li
          key={c.code}
          role="option"
          className='country-item'
          onClick={() => {
            handleCountryChange(null, c);
            setInputValue(c.label);
            setShowSuggestions(false);
          }}
        >
          <img
            src={ReplaceFlag(c.code)}
            alt={`${c.label} flag`}
            className='country-selector-flag'
          />
          <span>
            {c.label} ({c.code})
          </span>
        </li>
      ))}
    </ul>
  )}
  <svg width={20} height={20} className='country-play-svg'>
          <use href={`${Icons}#play 1`} />
      </svg>
</div>
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
               
                <button className={`close-button secondary ${isFilterActive ? 'primary' : ''}`} onClick={toggleWindow}>Show results</button>
                
                <div className="reset-button-container">
                  <button className={`close-button hidden ${isFilterActive ? 'show-up' : ''}`}onClick={clearAll}>Reset all</button>
                  <button className="close-button" onClick={closeWindow}>Close</button>
                  </div>
              </div>
        </div>
        </div>
      )}
        </div>
        
    );
}
