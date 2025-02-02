import { Box, Button, Fade, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

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

const SignUpModal = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Fade in={open}>
                <Box sx={styles.modal} component="form" onSubmit={() => { }}>
                    <Typography sx={styles.signUpText}>
                        Sign Up!
                    </Typography>
                    <Typography sx={styles.signUpSubText}>
                        Register your details to get started
                    </Typography>
                    <Box sx={styles.formContainer}>
                        <TextField
                            label="Enter Username"
                            variant="outlined"
                            name="username"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Enter Email"
                            variant="outlined"
                            name="password"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="Enter Phone Number"
                            variant="outlined"
                            name="password"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="Enter Password"
                            variant="outlined"
                            name="password"
                            type='password'
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" sx={styles.modalLoginBtn}>S U B M I T</Button>

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
    signUpText: {
        fontFamily: 'bold',
        color: COLORS.black,
        textAlign: 'left',
        fontSize: 24
    },
    signUpSubText: {
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
    modalSignUpBtn: {
        color: COLORS.gray,
        textTransform: 'none',
        fontFamily: 'regular',
        fontSize: 14,
        textAlign: 'center'
    },
    link: {
        color: COLORS.primary,
        textTransform: 'none',
        fontFamily: 'regular'
    }
};

export default SignUpModal
