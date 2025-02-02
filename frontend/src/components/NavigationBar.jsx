import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/images/icon.png';
import { theme } from '../styles/theme';
import { Avatar, Fade, Modal, TextField } from '@mui/material';
import { authenticate, getToken, getUser, logout } from '../utils/helpers';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 8,
    p: 4,
};

export default function NavigationBar() {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const token = getToken();
    const user = getUser();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const loginUser = async () => {
        try {
            const { data } = await axios.post(`http://localhost:6002/login`, { email, password });

            console.log(data);
            authenticate(data, () => { });
            handleClose();

        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = async () => {
        logout(() => { });
        window.location.reload();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main, boxShadow: 'none' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Avatar src={logo} />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        HALALEXPRESS
                    </Typography>
                    {token && user ? (
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button color="inherit" onClick={handleOpen}>Login</Button>
                    )}
                </Toolbar>
            </AppBar>

            <Modal open={open}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6" component="h2">
                        Login
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                            id="outlined-email"
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            id="outlined-password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained">Login</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
