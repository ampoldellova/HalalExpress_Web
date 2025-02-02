import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/images/icon.png';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Container, Fade, Grid2, Link, Menu, MenuItem, Modal, TextField } from '@mui/material';
import { authenticate, getToken, getUser, logout } from '../utils/helpers';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const COLORS = {
    primary: "#30b9b2",
    primary1: "#00fff53c",
    secondary: "#ffa44f",
    secondary1: "#ffe5db",
    tertiary: "#0078a6",
    gray: "#83829A",
    gray2: "#C1C0C8",
    offwhite: "#F3F4F8",
    white: "#FFFFFF",
    black: "#000000",
    red: "#e81e4d",
    green: " #00C135",
    lightWhite: "#FAFAFC",
};

export default function NavigationBar() {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const token = getToken();
    const user = getUser();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


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
            <AppBar position="static" sx={{ backgroundColor: COLORS.white }}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <Box component="img" src={logo} sx={{ height: 40, width: 40 }} />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: COLORS.primary, fontFamily: 'bold' }}>
                            HalalExpress
                        </Typography>
                        {token && user ? (
                            <>
                                <Grid2 container spacing={4}>
                                    <Button color="inherit" onClick={handleOpenUserMenu} sx={{ textTransform: 'none' }}>
                                        <Person2OutlinedIcon sx={styles.userIcon} />
                                        <Typography sx={styles.userName}>John Paul</Typography>
                                    </Button>
                                    <IconButton color="inherit" onClick={() => { }}>
                                        <LocalMallOutlinedIcon sx={styles.cartIcon} />
                                    </IconButton>
                                </Grid2>
                                <Menu
                                    keepMounted
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    sx={{ mt: '45px', borderRadius: 15 }}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <MenuItem onClick={handleLogout}>
                                        <LogoutIcon sx={{ color: COLORS.gray }} />
                                        <Typography sx={styles.menuItemText}>
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Grid2 container spacing={4}>
                                    <Button onClick={handleOpen} variant="outlined" sx={styles.loginBtn}>Log in</Button>
                                    <Button onClick={handleOpen} variant="contained" sx={styles.signUpBtn}>Sign Up</Button>
                                    <IconButton color="inherit" onClick={() => { }}>
                                        <LocalMallOutlinedIcon sx={styles.cartIcon} />
                                    </IconButton>
                                </Grid2>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            <Modal open={open} onClose={handleClose}>
                <Fade in={open}>
                    <Box sx={styles.modal} component="form" onSubmit={handleSubmit}>
                        <Typography sx={styles.welcomeText}>
                            Welcome!
                        </Typography>
                        <Typography sx={styles.welcomeSubText}>
                            Sign up or log in to continue
                        </Typography>
                        <Box sx={styles.formContainer}>
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
                            <Button type="submit" variant="contained" sx={{ backgroundColor: COLORS.primary, textTransform: 'none', fontFamily: 'bold' }}>L O G I N</Button>
                            <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, textAlign: 'center', fontSize: 14 }}>
                                Don't have an account? <Link component='href' href="/register" sx={{ color: COLORS.primary, textTransform: 'none', fontFamily: 'inherit' }}>Sign up</Link>
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

const styles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        borderRadius: 5,
        width: 400,
        p: 4,
    },
    cartIcon: {
        color: COLORS.gray,
    },
    userIcon: {
        color: COLORS.primary,
        mr: 1
    },
    userName: {
        color: COLORS.primary,
        fontFamily: 'regular'
    },
    menuItemText: {
        textAlign: 'left',
        fontFamily: 'regular',
        color: COLORS.gray
    },
    loginBtn: {
        borderColor: COLORS.gray,
        borderRadius: 3,
        textTransform: 'none',
        fontFamily: 'regular',
        color: COLORS.gray
    },
    signUpBtn: {
        borderRadius: 3,
        textTransform: 'none',
        fontFamily: 'regular',
        backgroundColor: COLORS.primary
    },
    welcomeText: {
        fontFamily: 'bold',
        color: COLORS.black,
        textAlign: 'left',
        fontSize: 24
    },
    welcomeSubText: {
        fontFamily: 'regular',
        color: COLORS.gray,
        textAlign: 'left',
        fontSize: 14
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 2
    },
};
