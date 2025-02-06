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

  const handleRankChange = (event) => {
    setRank(event.target.value);
  };
  const handleCountryChange = (event, value) => {
    setCountry(value ? value.code : '');
  };
  const handleRaceChange = (event) => {
    setRace(event.target.value);
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
            <div className="section-name-container">
                <h2>Leaderboards</h2>
            </div>
            <div className="buttons-container">
                <button className="buttons-container-item" onClick={setGlobal}>Global</button>
                <button className="buttons-container-item" onClick={SetKoreans} >Korea</button>
                <button className="buttons-container-item" onClick={setNonKoreans}>Non-Korea</button>
            </div>
            <div className="selectors-container">
            <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      className="selector-item"
      onChange={handleCountryChange}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', 
            },
          }}
        />
      )}
    />
<FormControl fullWidth className="selector-item rank">
  <InputLabel id="rank-label">Rank</InputLabel>
  <Select
    labelId="rank-label"
    id="rank-select"
    value={rank}
    label="Rank"
    onChange={handleRankChange}
  >
    <MenuItem value={"S"}>S</MenuItem>
    <MenuItem value={"A"}>A</MenuItem>
    <MenuItem value={"B"}>B</MenuItem>
    <MenuItem value={"C"}>C</MenuItem>
    <MenuItem value={"D"}>D</MenuItem>
    <MenuItem value={"E"}>E</MenuItem>
    <MenuItem value={"F"}>F</MenuItem>
    <MenuItem value={""}>All</MenuItem>
  </Select>
</FormControl>
<FormControl fullWidth className="selector-item race">
  <InputLabel id="rank-label">Race</InputLabel>
  <Select
    labelId="rank-label"
    id="rank-select"
    value={race}
    label="Race"
    onChange={handleRaceChange}
  >
    <MenuItem value={"T"}>Terran</MenuItem>
    <MenuItem value={"Z"}>Zerg</MenuItem>
    <MenuItem value={"P"}>Protoss</MenuItem>
    <MenuItem value={""}>All</MenuItem>
  </Select>
</FormControl>
<FormControl fullWidth className="selector-item players">
  <InputLabel id="rank-label">Players</InputLabel>
  <Select
    labelId="players-label"
    id="players-select"
    value={playersPerPage}

    label="Players"
    onChange={handlePlayersChange}
  >
    <MenuItem value={25}>25</MenuItem>
    <MenuItem value={50}>50</MenuItem>
    <MenuItem value={75}>75</MenuItem>
    <MenuItem value={100}>100</MenuItem>
  </Select>
</FormControl>
            </div>
            <div className="table-container">
            <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Standing</TableCell>
            <TableCell>Player</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell>Race</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedPlayers.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.standing}</TableCell>
              <TableCell>
              <Link to={`/player-page/${encodeURIComponent(row.player.name)}`}className="player-link">
                <Box display="flex" alignItems="center">
                  <img
                    src={row.player.avatar}
                    alt="Avatar"
                    width="20"
                    height="20"
                    style={{ marginRight: 8 }}
                  />
                  
                  <Box>
                    <Typography variant="body2" >{row.player.name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {row.player.region} {row.player.alias}
                    </Typography>
                  </Box>
                  
                </Box>
                </Link>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <img
                    src={row.country.flag}
                    alt="Flag"
                    width="20"
                    height="20"
                    style={{ marginRight: 8 }}
                  />
                  <Typography variant="body2">{row.country.code}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                 
                  <League text={row.rank.league}MMR={row.rank.points} />
                </Box>
              </TableCell>
              <TableCell><Race text = {row.race}/></TableCell>
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
