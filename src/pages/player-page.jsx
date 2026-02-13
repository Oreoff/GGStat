
import League from './league';
import * as React from 'react';
import Race from './race';
import playerPageFetch from './services/playerPageFetch.js';
import { fetchReplayLink } from './services/replayLinkFetch.js';
import { useParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import Icons from "./img/icons.svg";
import logo from './img/logo.png';
export default function PlayerPage() {
  const { name } = useParams();
  const [openChatIndex, setOpenChatIndex] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [replayLink, setReplayLink] = React.useState(null);
  const [Info, setInfo] = React.useState(null);
  const [openAboutIndex, setOpenAboutIndex] = React.useState(null);
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
  const loadPlayer = async () => {
    try {
      const data = await playerPageFetch(name);
      
      setInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (name) {
    loadPlayer();
  }
}, [name]);
  if (loading) return <div className="loader-container">
   <div class="loader"></div> </div>;
  if (error) return <p>Error: {error}</p>;
  const handlePageChange = (event, value) => {
    setPage(value);
    setOpenChatIndex(null);
  };
function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}
const alters = Info ? Info.accounts.split('|').map(acc => acc.trim()) : [];
  const toggleChat = (index) => {
    setOpenChatIndex(prevIndex => (prevIndex === index ? null : index));
  };
  const toggleAbout = (index) => {
    setOpenAboutIndex(prev => (prev === index ? null : index));
  };
  const handleClick = (target) =>
  {
    window.location.href = target;
  }
  
  const playerName = name ? decodeURIComponent(name).toLowerCase() : '';
const setPlayer = Info;
const matches = setPlayer ? setPlayer.matches : [];
  if (!setPlayer) {
    return <p>Player not found</p>;
  }
function ReplaceFlag(countryCode) {
  if(countryCode == 'RU'){
    return '/src/pages/img/free russia.png';
  }

  else if(countryCode == 'BY'){
    return '/src/pages/img/free-belarus.png';
    }
    else return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}
  const paginatedMatches = matches.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="container">
      <div className="player-page-container">
        
        <div className="player-container">
        
          <div className="player-data">
          <img
                    src={setPlayer.avatar}
                    alt="Avatar"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = logo;
                    }}
                    width="100"
                    height="100"
                    className="player-avatar player-page-avatar"
                  />
                  <div className="player-stats-container">
            <div className="name-container">
              <p className="name">{setPlayer.name}</p>
              <p className="tag">/{setPlayer.alias}/</p>
            </div>
            <div className="info-container">
              <p className="standing">#{setPlayer.standing}</p>
              <Race text={setPlayer.race} ClassName="player-page-race"/>
              <League text={setPlayer.league} MMR={setPlayer.points} className="player-page-league"/>
              
              <p className="wins"><span className='wins-span'>W</span>{setPlayer.wins}</p>
              <p className="loses"><span className='loses-span'>L</span>{setPlayer.loses}</p>
            </div>
                  </div>
                  
                  </div>

                  <div className="refresh-container">
<div className="country-container">
        <img src={ReplaceFlag(setPlayer.code)} alt="country-flag" className="country-flag player-page-flag"/>
        <p className="country-description">{setPlayer.code}</p>
      </div>
          <div className="update-stats-container">
            <svg width={15} height={15} className="clock-svg">
                <use href={`${Icons}#clock`} />
              </svg>
          <p className="refresh-stats-text">Last updated<span className='refresh-time'>99999 mins ago</span></p>
        <svg width={15} height={15} className="refresh-svg">
                <use href={`${Icons}#refresh`} />
              </svg>
        </div>
                  </div>
            
      </div>
          </div>
          
                        <div className="alter-accounts-container">
        <h3 className="alter-accounts-title">Accounts</h3>
        <ul className="alter-accounts-list">
{alters.map((alter, index) => (
          <li key={index} className="alter-account-item">
            <Link to={`/player/${encodeURIComponent(alter)}`} className="alter-account-link">{alter}</Link>
          </li>
        ))}
        </ul>
        
      </div>
      <div className="recent-matches-table-container">
        <h2 className="recent-matches-logo">Recent ranked matches</h2>
        <h2 className="recent-matches-logo">(not available yet)</h2>
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
                      <p className="player-race-text">{capitalize(match.player_race)} vs {capitalize(match.opponent_race)}</p>
                      </div>
                    </td>
                    <td className="opponent-cell"><Link to={`/player/${encodeURIComponent(match.opponent.trim())}`} className="player-link">{match.opponent}</Link></td>
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
                  <tr className={`about-row ${openAboutIndex === index ? 'about-visible' : ''}`}>
  <td colSpan={8} className="about-cell">
    <div className={`about-container ${openAboutIndex === index ? 'expand' : ''}`}>
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
        <p className="player-race-text">{capitalize(match.player_race)} vs {capitalize(match.opponent_race)}</p>
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
  );
}