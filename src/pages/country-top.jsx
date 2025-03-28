import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import  Typography  from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { countries } from './data/countries.js';
import fetchPlayers from './services/playersFetch.js';
export default function CountryTop()
{
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
          <h2 className="page-title">Top 1 for each country</h2>
          <div className="filters-container">
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
          </div>
          <div className="table-container">
          <TableContainer component={Paper}>
          <Table>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Player</TableCell>
            <TableCell>MMR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPlayers.map((row, index) => (
            <TableRow key={index}>
              
                <TableCell>
                <Box display="flex" alignItems="center">
                  <img
                    src={row.country.flag}
                    alt="Flag"
                    width="40"
                    height="20"
                    style={{ marginRight: 8 }}
                  />
                  <Typography variant="body2">{row.country.code}</Typography>
                </Box>
              </TableCell>
              
              <TableCell>
              <Link to={`/player-page/${encodeURIComponent(row.player.name)}`} className="player-link">
                <Box display="flex" alignItems="center">
                  <img
                    src={row.player.avatar}
                    alt="Avatar"
                    width="20"
                    height="20"
                    style={{ marginRight: 8 }}
                  />
                  <Box>
                  <Typography variant="body2">{row.player.name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {row.player.region} {row.player.alias}
                    </Typography>
                  </Box>
                </Box>
                </Link>
              </TableCell>
              <TableCell>{row.rank.points}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
        </div>
        
    );
}