import Box from '@mui/material/Box';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import  Typography  from '@mui/material/Typography';
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
            <TableContainer component={Paper}>
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell className="table-cell" style={{ padding: 0 }}><p className="table-text table-title">Standing</p></TableCell>
            <TableCell className="table-cell" style={{ padding: 0 }}><p className="table-text table-title">Player</p></TableCell>
            <TableCell className="table-cell" style={{ padding: 5 }}><Autocomplete 
      id="country-select-demo"
      sx={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      className="country-selector"
      onChange={handleCountryChange}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        
        return (
          <Box className='country-box'
          
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
            style={{backgroundColor:"#232B35",
              color:"white",
              fontSize: 16,
              fontFamily: 'TT Firs Neue Trl',}}

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
          </Box>
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
            // Колір рамки
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
            // Колір стрілки (іконки)
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
    /></TableCell>
            <TableCell className="table-cell " style={{ padding: 0 }}>
              <div className="select-rank-button-container">
            <button className="select-rank-button" onClick={() => handleRankChange("S")}>S</button>
            <button className="select-rank-button" onClick={() => handleRankChange("A")}>A</button>
            <button className="select-rank-button" onClick={() => handleRankChange("B")}>B</button>
            <button className="select-rank-button" onClick={() => handleRankChange("C")}>C</button>
            <button className="select-rank-button" onClick={() => handleRankChange("D")}>D</button>
            <button className="select-rank-button" onClick={() => handleRankChange("E")}>E</button>
            <button className="select-rank-button" onClick={() => handleRankChange("F")}>F</button>
            <button className="select-rank-button" onClick={() => handleRankChange("")}>All</button>
            </div></TableCell>
            <TableCell className="table-cell" style={{ padding: 0 }}>
              <div className="select-race-button-container">
                <button className="select-race-button terran-button " onClick={() => handleRaceChange("T")}>T</button>
                <button className="zerg-button select-race-button" onClick={() => handleRaceChange("Z")}>Z</button>
                <button className="protoss-button select-race-button" onClick={() => handleRaceChange("P")}>P</button>
                <button className="select-race-button" onClick={() => handleRaceChange("")}>All</button>
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedPlayers.map((row, index) => (
            <TableRow key={index}className="table-row" style={{ padding: 0 }}>
              <TableCell className="table-cell" style={{ padding: 0 }}><p className="table-text">{row.standing}</p></TableCell>
              <TableCell className="table-cell" style={{ padding: 0 }}>
              <Link to={`/player-page/${encodeURIComponent(row.player.name)}`}className="player-link">
                <Box display="flex" alignItems="center" >
                  <img
                    src={row.player.avatar}
                    alt="Avatar"
                    width="50"
                    height="50"
                    style={{ marginRight: 8 }}
                  />
                  <Box>
                    <Typography variant="body2" className="table-cell"><p className="table-text">{row.player.name}</p></Typography>
                    <Typography variant="caption" color="textSecondary" className="table-cell">
                      <p className="table-text">{row.player.region}</p>
                    </Typography>
                  </Box>
                  
                </Box>
                </Link>
              </TableCell>
              <TableCell className="table-cell" style={{ padding: 0 }}>
                
              <Box display="flex" alignItems="center">
    <Box
      sx={{
        width: 30,         // Розмір "вікна"
        height: 25,
        overflow: 'hidden',
        borderRadius: '5px', // (опціонально)
        marginRight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={row.country.flag}
        alt="Flag"
        style={{
          width: 40,       // реальний розмір прапора (може бути більше)
          height: 'auto',
        }}
      />
    </Box>
    <Typography variant="body2"><p className="table-text">{row.country.code}</p></Typography>
  </Box>
              </TableCell>
              <TableCell className="table-cell" style={{ padding: 0 }}>
                <Box display="flex" alignItems="center">
                 
                  <League text={row.rank.league}MMR={row.rank.points} />
                </Box>
              </TableCell>
              <TableCell className='table-cell'style={{ padding: 0 }}><Race text = {row.race}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(players.length / playersPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
            </div>
        </div>
        
    );
}
