import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import Logo from "../../assets/QuickBookrs.png"
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../../helpers/GetInitials';



export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const userData = localStorage.getItem("userData");
  const fullname = userData ? JSON.parse(userData).fullname : "";
  const initials = getInitials(fullname);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsed = JSON.parse(userData);
      setRole(parsed.role);
    }
  }, []);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/signin')
  }


  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right,rgb(12, 122, 241), #00C6FF)",
        color: "#fff",
        boxShadow: 2,
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.1rem', display: 'flex', alignItems: 'center' }}>
          <img src={Logo} alt='logo' style={{ height: 50, marginRight: 12, borderRadius: "10px" }} />
          QuickBookrs
        </Typography>
        <Button color="inherit" sx={{ mx: 1 }} onClick={()=> navigate('/dashboard')}>Home</Button>
        {role === 'admin' && <Button color="inherit" sx={{ mx: 1 }}>Manage Slots</Button>}
        {role === 'user' && <Button color="inherit" sx={{ mx: 1 }} onClick={()=> navigate('/dashboard/book-appointment')}>  Book Appointment</Button>}
        <Box sx={{ flexGrow: 0, ml: 2 }}>
          <Tooltip title="Account settings">
            <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
              <Avatar alt="User" src="" sx={{padding:.5, bgcolor: "white", color:"black"}}>{initials}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
