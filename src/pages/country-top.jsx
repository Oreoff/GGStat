import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import  Typography  from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
const rows = [
    {player: {name: "FlaShWkdWkdman",region: "Europe",alias: "/flash/",avatar: "https://via.placeholder.com/20", },
      country: {name: "South Korea",flag: "https://flagcdn.com/w40/kr.png", }, rank: {points: 9999,icon: "https://via.placeholder.com/20", },
      MMR: "2876",
    },
    {player: {name: "Marwin",region: "Europe",alias: "/marwin/",avatar: "https://via.placeholder.com/20", },
      country: {name: "Ukraine",flag: "https://flagcdn.com/w40/ua.png", }, rank: {points: 9999,icon: "https://via.placeholder.com/20", },
      MMR: "2376",
    },
  ];
export default function CountryTop()
{
    return (
        <div className="container">
          <h2 className="page-title">Top 1 for each country</h2>
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
          {rows.map((row, index) => (
            <TableRow key={index}>
              
                <TableCell>
                <Box display="flex" alignItems="center">
                  <img
                    src={row.country.flag}
                    alt="Flag"
                    width="20"
                    height="20"
                    style={{ marginRight: 8 }}
                  />
                  <Typography variant="body2">{row.country.name}</Typography>
                </Box>
              </TableCell>
              
              <TableCell>
              <Link to="/player-page" className="player-link">
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
              <TableCell>{row.MMR}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
        </div>
        
    );
}