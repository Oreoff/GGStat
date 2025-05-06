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
                    className="player-avatar"
                  />
          <div className="player-data">
          
            <div className="name-container">
              <p className="name">{setPlayer.player.name}</p>
              <p className="tag">{setPlayer.player.alias}</p>
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
                <th>Result</th>
                <th>Points</th>
                <th>Time Ago</th>
                <th>Map</th>
                <th>Duration</th>
                <th>Race</th>
                <th>Opponent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMatches.map((match, index) => (
                <React.Fragment key={index}>
                  <tr className={match.result === 'win' ? 'match-row-win' : 'match-row-loss'}>
                    <td>{match.result}</td>
                    <td>{match.points}</td>
                    <td>{match.timeAgo}</td>
                    <td>{match.map}</td>
                    <td>{match.duration}</td>
                    <td>
                      <div className="matchup-container">
                        <Race text={match.player_race[0]} /> vs <Race text={match.opponent_race[0]} />
                      </div>
                    </td>
                    <td>{match.opponent}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="info-button" onClick={() => toggleChat(index)}>Info</button>
                        <button className="replay-button" onClick={() => handleFetchReplay(match)}>Replay</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="chat-row">
                    <td colSpan={8} className="chat-cell">
                      <div className={`chat-container ${openChatIndex === index ? 'chat-open' : 'chat-closed'}`}>
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
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          <div className="pagination">
            {Array.from({ length: Math.ceil(matches.length / rowsPerPage) }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`pagination-button ${pageNum === page ? 'active' : ''}`}
                onClick={(e) => handlePageChange(e, pageNum)}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}