import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import League from './league';
import * as React from 'react';
import Race from './race';
import fetchPlayers from './services/playersFetch.js';
import { fetchReplayLink } from './services/replayLinkFetch.js';
import { useParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
export default function PlayerPage() {
  const { name } = useParams();
  const [openChatIndex, setOpenChatIndex] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [players, setPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [replayLink, setReplayLink] = React.useState(null);
  const [Info, setInfo] = React.useState(null);
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


  const toggleChat = (index) => {
    setOpenChatIndex(prevIndex => (prevIndex === index ? null : index));
  };
  const toggleAbout = (index) => {
    setInfo(prevIndex => (prevIndex === index ? null : index));
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
        
        <div className="player-container">
        <img
                    src={setPlayer.player.avatar}
                    alt="Avatar"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://p1.hiclipart.com/preview/716/196/996/blizzard-flat-iconset-starcraft-remastered-png-clipart.jpg';
                    }}
                    width="100"
                    height="100"
                    className="player-avatar player-page-avatar"
                  />
          <div className="player-data">
          
            <div className="name-container">
              <p className="name">{setPlayer.player.name}</p>
              <p className="tag">/{setPlayer.player.alias}/</p>
            </div>
            <div className="info-container">
              <Race text={setPlayer.race} />
              <League text={setPlayer.rank.league} MMR={setPlayer.rank.points} />
              <p className="standing">#{setPlayer.standing}</p>
              <p className="wins">{setPlayer.wins} wins</p>
              <p className="loses">{setPlayer.loses} loses</p>
              <p className="server">{setPlayer.player.region}</p>
            </div>
          </div>
          <div className="country-container">
        <img src={setPlayer.country.flag} alt="country-flag" className="country-flag player-page-flag"/>
        <p className="country-description">{setPlayer.country.code}</p>
      </div>
          <div className="update-stats-container">
          <button className="refresh-stats-button">Refresh stats</button>
          <p className="refresh-stats-text">Last updated 99999 mins ago</p>
        </div>
        </div>
      </div>
      
      <div className="recent-matches-table-container">
        <h2 className="recent-matches-logo">Recent ranked matches</h2>
      </div>
      <div className="table-container">
        <div className="table-wrapper">
          <table className="matches-table">
            <thead>
              <tr>
                <th className="result-cell">Result</th>
                <th className="points-cell">Points</th>
                <th className="timeAgo-cell">Time Ago</th>
                <th className="map-cell">Map</th>
                <th className="duration-cell">Duration</th>
                <th className="matchup-cell">Race</th>
                <th  className="opponent-cell">Opponent</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMatches.map((match, index) => (
                <React.Fragment key={index}>
                  <tr className={match.result === 'win' ? 'match-row-win' : 'match-row-loss'}>
                    <td className="result-cell">{match.result}</td>
                    <td className="points-cell">{match.points}</td>
                    <td className="timeAgo-cell">{match.timeAgo}</td>
                    <td className="map-cell">{match.map}</td>
                    <td className="duration-cell">{match.duration}</td>
                    <td className="matchup-cell">
                      <div className="matchup-container">
                        <Race text={match.player_race[0]} /> vs <Race text={match.opponent_race[0]} />
                      </div>
                    </td>
                    <td className="opponent-cell">{match.opponent}</td>
                    <td className='actions-cell'>
                      <div className="action-buttons">
                        <button className="info-button" onClick={() => toggleChat(index)}>View chat</button>
                        <button className="info-button about-button" onClick={() => toggleAbout(index)}>About</button>
                        <button className="replay-button" onClick={() => handleFetchReplay(match)}>Replay</button>
                      </div>
                    </td>
                  </tr>
                  <tr className={`chat-row ${openChatIndex === index ? 'chat-visible' : ''}`}>
                    <td colSpan={8} className="chat-cell">
                      <div className={`chat-container ${openChatIndex === index ? 'expand' : ''}`}>
                         <div className="chat-content">
                             <h4>Chat:</h4>
                                  {match.chat && match.chat.length > 0 ? (
                                    match.chat.map((line, i) => (
            <p key={i} className="chat-message">
              <strong>{line.time} {line.player}:</strong> {line.message}
            </p>
          ))
        ) : (
          <p className="no-chat-message">No chat available.</p>
        )}
      </div>
    </div>
  </td>
</tr>
                  <tr className={`about-row ${Info === index ? 'about-visible' : ''}`}>
  <td colSpan={8} className="about-cell">
    <div className={`about-container ${Info === index ? 'expand' : ''}`}>
      <h3 className="about-logo">Replay info</h3>

      <div className="points-container">
        <p className="points-text">Points:</p>
        <p className="points-number">{match.points}</p>
      </div>
      <div className="timeAgo-container">
        <p className="timeAgo-text">Time ago:</p>
        <p className="time-ago-number">{match.timeAgo}</p>
      </div>
      <div className="map-container">
        <p className="map-text">Map:</p>
        <p className="map-number">{match.map}</p>
      </div>
      <div className="duration-container">
        <p className="duration-text">Duration:</p>
        <p className="duration-number">{match.duration}</p>
      </div>
      <div className="matchup-sidebar-container">
        <p className="map-text">Matchup:</p>
        <Race text={match.player_race[0]} /> vs <Race text={match.opponent_race[0]} />
      </div>
      <div className="opponent-container">
        <p className="opponent-text">Opponent:</p>
        <p className="opponent-number">{match.opponent}</p>
      </div>
    </div>
  </td>
</tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          <Pagination
            count={Math.ceil(matches.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
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
  );
}