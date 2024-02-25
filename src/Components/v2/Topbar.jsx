import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../redux/userRedux'
import { removeAll } from '../../redux/papersRedux'
import { removeAllRecord } from '../../redux/recordsRedux'

const Container=styled.div`
    z-index:800;
    width:100%;
    height:3rem;
    background-color: #053B50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#EEEEEE;
    background: linear-gradient(45deg, rgba(61,88,230,1) 0%, rgba(111,179,228,1) 33%);

`
const Right=styled.div`
    margin:2rem;
    font-size: 2rem;
    font-family: math;
`
const Left=styled.div`
    margin:2rem;
    display:flex;
    align-items:center;
    font-size:1.5rem;
`
const Topbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const user=useSelector(state=>state.user.currentUser);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleLogout=()=>{
        dispatch(logoutSuccess())
        dispatch(removeAll())
        dispatch(removeAllRecord())
        navigate('/login')
      }
  return (

    <Container>
        <Right onClick={()=>navigate('/')}>Prudent Pinnacle</Right>
       <Left>
            Hi, {user?user.name:''}
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>{user.name.slice(0,1)}</Avatar>
                </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={()=>navigate('/profile')}>
                    <Avatar src={user.avatar} /> Profile
                </MenuItem>
                
                <Divider />
               
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
       </Left>
    </Container>
  )
}

export default Topbar