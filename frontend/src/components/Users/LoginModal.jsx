import { Box, Button, Fade, InputAdornment, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { authenticate } from '../../utils/helpers';
import { toast } from 'react-toastify';

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

const LoginModal = ({ open, onClose, signUp }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const loginUser = async () => {
        try {
            const { data } = await axios.post(`http://localhost:6002/login`, { email, password });

            authenticate(data, () => { });
            onClose();
            toast.success("Login successful!");

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    };

    return (
        <Modal open={open} onClose={onClose}>
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
                            placeholder='Enter Email'
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start"><EmailOutlinedIcon /></InputAdornment>,
                                },
                            }}
                        />
                        <TextField
                            placeholder='Enter Password'
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start"><HttpsOutlinedIcon /></InputAdornment>,
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={styles.modalLoginBtn}
                        >
                            L O G I N
                        </Button>
                        <Box sx={styles.signUpContainer}>
                            <Typography sx={styles.modalSignUpBtn}>
                                Don't have an account? {' '}
                            </Typography>
                            <Typography onClick={() => { signUp(); onClose(); }} sx={styles.link}>
                                Sign up
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
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
        fontSize: 14,
        mt: 1
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 3
    },
    modalLoginBtn: {
        backgroundColor: COLORS.primary,
        textTransform: 'none',
        fontFamily: 'bold',
    },
    signUpContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalSignUpBtn: {
        color: COLORS.gray,
        textTransform: 'none',
        fontFamily: 'regular',
        fontSize: 14,
    },
    link: {
        color: COLORS.primary,
        textTransform: 'none',
        fontFamily: 'regular',
        cursor: 'pointer',
        fontSize: 14,
        ml: 1
    }
};

export default LoginModal
