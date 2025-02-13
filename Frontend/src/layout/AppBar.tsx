import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, Tabs, Tab, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 'auto',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = {
    name: 'Narpat',
    role: 'Admin',
    avatarUrl: 'https://i.pravatar.cc/40',
  };

  const getActiveTab = () => {
    if (location.pathname.startsWith('/tasks')) return 1;
    if (location.pathname.startsWith('/projects')) return 0;
    return false;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexShrink: 0 }}>
            TASK TRACKER
          </Typography>
          <Tabs 
            value={getActiveTab()} 
            onChange={(_, newValue) => navigate(newValue === 0 ? '/projects' : '/tasks')}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ marginLeft: 3 }}
          >
            <Tab label="Projects" />
            <Tab label="Tasks" />
          </Tabs>
          <Search sx={{ ml: 'auto', mr: 2 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Avatar src={user.avatarUrl} alt={user.name} sx={{ width: 36, height: 36, mr: 1 }} />
            <Box sx = {{mr:1}}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 12, color: 'grey.300' }}>
                {user.role}
              </Typography>
            </Box>
            
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
