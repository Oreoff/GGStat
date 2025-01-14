import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    Button,
    Collapse,
    Pagination,
  } from '@mui/material';
  const matches = [
    { result: 'Victory', points: '+99', timeAgo: '2 days ago', map: 'Deja Vu 1.1', duration: '12m 5s', race: 'T vs P', opponent: 'lllllllll', chat: [] },
    { result: 'Defeat', points: '-99', timeAgo: '2 days ago', map: 'Deja Vu 1.1', duration: '12m 5s', race: 'T vs Z', opponent: 'lllllllll', chat: [] },
    { result: 'Victory', points: '+99', timeAgo: '2 days ago', map: 'Deja Vu 1.1', duration: '12m 5s', race: 'T vs P', opponent: 'lllllllll', chat: [] },
    {
      result: 'Victory',
      points: '+99',
      timeAgo: '2 days ago',
      map: 'Deja Vu 1.1',
      duration: '12m 5s',
      race: 'T vs P',
      opponent: 'lllllllll',
      chat: [
        { time: '0:32', player: 'FlaShWkdWkdman', message: '잠재?' },
        { time: '0:35', player: 'lllllllll', message: '아뇨' },
        { time: '0:37', player: 'lllllllll', message: '영혼님?' },
        { time: '0:39', player: 'FlaShWkdWkdman', message: '야' },
        { time: '0:40', player: 'FlaShWkdWkdman', message: '너' },
        { time: '0:44', player: 'FlaShWkdWkdman', message: '잠깐' },
        { time: '0:45', player: 'FlaShWkdWkdman', message: '좋은데' },
      ],
    },
  ];
  
export default function PlayerPage()
{
    const handlePageChange = (event, value) => {
        setPage(value);
        setOpenChatIndex(null); 
      };
    const [openChatIndex, setOpenChatIndex] = React.useState(null);
     const [page, setPage] = React.useState(1);
      const [rowsPerPage,setRowsPerPage] = React.useState(25);
      const handleRowsChange = (event) => {
        setRowsPerPage(event.target.value);
      };
      const toggleChat = (index) => {
        setOpenChatIndex(openChatIndex === index ? null : index);
      };
    
    return (
        <div className="container">
            <div className="player-page-container">
            <div className="update-stats-container">
                <button className="refresh-stats-button">Refresh stats </button>
                <p className="refresh-stats-text">Last updated 99999 mins ago</p>
            </div>
            <div className="player-container">
                <img src="https://scrassets.classic.blizzard.com/avatar-icons/S1/580e4f797aacffcf5cda5e3ec0bfbaee.png" alt="portrait" width={100}/>
                <div className="player-data">
                    <div className="name-container">
                      <p className="name">FlashWkdWkdMan</p>
                    <p className="tag">/flash/</p>  
                    </div>
                    <div className="info-container">
                        <p className="race">terran</p>
                    <p className="rank">S <span>2506</span></p> 
                    <p className="standing">2</p>
                    <p className="wins">50</p>
                    <p className="loses">2</p>
                    <p className="server">korea</p>
                    </div>
                    
                    </div>
            </div>
            
            </div>
            <div className="country-container">
                <p className="country-name">Country</p>
                <img src="https://flagcdn.com/w40/kr.png" alt="country-flag" width={100}/>
                <p className="country-description">South Korea</p>
            </div>
            <div className="recent-matches-table-container">
                <h2 className="recent-matches-logo">
                    Recent ranked matches
                </h2>
                <FormControl fullWidth className="selector-item players">
  <InputLabel id="rank-label">Players</InputLabel>
  <Select
    labelId="players-label"
    id="players-select"
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
          {matches.map((match, index) => (
            <React.Fragment key={index}>
              <TableRow
                sx={{
                  backgroundColor: match.result === 'Victory' ? '#d4edda' : '#f8d7da',
                  border: `2px solid ${match.result === 'Victory' ? '#28a745' : '#dc3545'}`,
                }}
              >
                <TableCell>{match.result}</TableCell>
                <TableCell>{match.points}</TableCell>
                <TableCell>{match.timeAgo}</TableCell>
                <TableCell>{match.map}</TableCell>
                <TableCell>{match.duration}</TableCell>
                <TableCell>{match.race}</TableCell>
                <TableCell>{match.opponent}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="outlined" size="small" onClick={() => toggleChat(index)}>Info</Button>
                    <Button variant="outlined" size="small" >
                      Replay
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={8} sx={{ padding: 0 }}>
                  <Collapse in={openChatIndex === index} timeout="auto" unmountOnExit>
                    <Box sx={{ padding: 2, backgroundColor: '#f9f9f9' }}>
                      <Typography variant="subtitle1">Chat:</Typography>
                      {match.chat.length > 0 ? (
                        match.chat.map((line, i) => (
                          <Typography key={i} variant="body2">
                            <strong>{line.time} {line.player}:</strong> {line.message}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body2">No chat available.</Typography>
                      )}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(matches.length / rowsPerPage)} 
          page={page}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Box>
       
            </div>
        </div>
        
    );
}
