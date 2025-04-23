import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import League from './league';
import * as React from 'react';
import Race from './race';
import fetchPlayers from './services/playersFetch.js';
import { fetchReplayLink } from './services/replayLinkFetch.js';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  Pagination,
} from '@mui/material';
import { useParams } from 'react-router-dom';

export default function PlayerPage() {
  const { name } = useParams();
  const [openChatIndex, setOpenChatIndex] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
const [players, setPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [replayLink, setReplayLink] = React.useState(null);
  const handleFetchReplay = async (match) => {
    setLoading(true);
    const link = await fetchReplayLink(match.match_id);
    setReplayLink(link);
    setLoading(false);
  
    if (link) {
      window.open(link, '_blank');
    } else {
      alert("Replay link not available");
    }
  };
  React.useEffect(() => {
    const loadPlayers = async (match) => {
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
  const handlePageChange = (event, value) => {
    setPage(value);
    setOpenChatIndex(null);
  };

  const handleRowsChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const toggleChat = (index) => {
    setOpenChatIndex(prevIndex => (prevIndex === index ? null : index));
  };
const handleClick = (target) =>
{
  window.location.href = target;
}
  const playerName = name ? decodeURIComponent(name).toLowerCase() : '';
  const setPlayer = players.find(p => p.player.name.toLowerCase() === playerName);
  const matches = setPlayer ? setPlayer.matches : [];

  if (!setPlayer) {
    return <p>Player not found</p>;
  }

  const paginatedMatches = matches.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="container">
      <div className="player-page-container">
        <div className="update-stats-container">
          <button className="refresh-stats-button">Refresh stats</button>
          <p className="refresh-stats-text">Last updated 99999 mins ago</p>
        </div>
        <div className="player-container">
          <img src={setPlayer.player.avatar} alt="portrait" width={100} />
          <div className="player-data">
            <div className="name-container">
              <p className="name">{setPlayer.player.name}</p>
              <p className="tag">{setPlayer.player.alias}</p>
            </div>
            <div className="info-container">
              <Race text={setPlayer.race} />
              <League text={setPlayer.rank.league} MMR={setPlayer.rank.points} />
              <p className="standing">#{setPlayer.standing}</p>
              <p className="wins">{setPlayer.wins}W</p>
              <p className="loses">{setPlayer.loses}L</p>
              <p className="server">{setPlayer.player.region}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="country-container">
        <p className="country-name">Country</p>
        <img src={setPlayer.country.flag} alt="country-flag" width={100} />
        <p className="country-description">{setPlayer.country.code}</p>
      </div>
      <div className="recent-matches-table-container">
        <h2 className="recent-matches-logo">Recent ranked matches</h2>
        <FormControl fullWidth className="selector-item players">
          <InputLabel id="matches-label">Matches</InputLabel>
          <Select
            labelId="matches-label"
            id="matches-select"
            value={rowsPerPage}
            label="Players"
            onChange={handleRowsChange}
          >
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={75}>75</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Result</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Time Ago</TableCell>
                <TableCell>Map</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Race</TableCell>
                <TableCell>Opponent</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMatches.map((match, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    sx={{
                      backgroundColor: match.result === 'win' ? '#d4edda' : '#f8d7da',
                      border: `2px solid ${match.result === 'win' ? '#28a745' : '#dc3545'}`,
                    }}
                  >
                    <TableCell>{match.result}</TableCell>
                    <TableCell>{match.points}</TableCell>
                    <TableCell>{match.timeAgo}</TableCell>
                    <TableCell>{match.map}</TableCell>
                    <TableCell>{match.duration}</TableCell>
                    <TableCell>
                      <div className="matchup-container">
                        <Race text={match.player_race} /> vs <Race text={match.opponent_race} />
                      </div>
                    </TableCell>
                    <TableCell>{match.opponent}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Button variant="outlined" size="small" onClick={() => toggleChat(index)}>Info</Button>
                        <Button variant="outlined" size="small" onClick={() => handleFetchReplay(match)}>Replay</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={8} sx={{ padding: 0 }}>
                      <Collapse in={openChatIndex === index} timeout="auto" unmountOnExit>
                        <div style={{ padding: "16px", backgroundColor: '#f9f9f9' }}>
                          <h4 style={{ margin: "0 0 8px 0" }}>Chat:</h4>
                          {match.chat && match.chat.length > 0  ? (
                            match.chat.map((line, i) => (
                              <p key={i} style={{ margin: "4px 0", fontSize: "0.875rem" }}>
                                <strong>{line.time} {line.player}:</strong> {line.message}
                              </p>
                            ))
                          ) : (
                            <p style={{ margin: "4px 0", fontSize: "0.875rem" }}>No chat available.</p>
                          )}
                        </div>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
          <Pagination
            count={Math.ceil(matches.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            shape="square"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: '8px', // ← ось тут твій кут!
                border: '1px solid #ccc',
                width: '40px',
                height: '40px',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#333',
                '&:hover': {
                  backgroundColor: '#555',
                },
                '&.Mui-selected': {
                  backgroundColor: '#2196f3',
                  color: '#fff',
                  borderColor: '#2196f3',
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}