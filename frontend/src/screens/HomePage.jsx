import { Box, Button, Grid2, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react'
import Lottie from "lottie-react";
import vegetables from "../assets/anime/vegetables.json";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Restaurants from '../components/vendor/Restaurants';

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
    black: "#242424",
    red: "#e81e4d",
    green: " #00C135",
    lightWhite: "#FAFAFC",
};

const HomePage = () => {
    return (
        <>
            <Box sx={styles.container}>
                <Grid2 container spacing={5} sx={styles.grid}>
                    <Box>
                        <Typography sx={styles.title}>
                            Welcome to HalalExpress!
                        </Typography>
                        <Typography sx={styles.subTitle}>
                            We deliver certified halal foods and products right to your doorstep. Enjoy a wide variety of halal options, ensuring quality and authenticity in every order.
                        </Typography>
                        <TextField sx={{ mt: 3 }}
                            fullWidth
                            placeholder='Search for food...'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlinedIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                bgcolor: COLORS.primary,
                                                color: COLORS.white,
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                fontFamily: 'regular'
                                            }}
                                        >
                                            Find food
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box sx={styles.vegetables}>
                        <Lottie animationData={vegetables} loop={true} style={{ width: '100%', height: '100%' }} />
                    </Box>
                </Grid2>
            </Box >
            <Restaurants />
        </>
    )
}

export default HomePage

const styles = {
    container: {
        bgcolor: COLORS.offwhite,
        height: 600
    },
    grid: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: COLORS.black,
        textAlign: 'left',
        fontFamily: 'bold',
        fontSize: 35
    },
    subTitle: {
        color: COLORS.gray,
        textAlign: 'left',
        fontFamily: 'regular',
        fontSize: 15,
        width: 500
    },
    vegetables: {
        width: 600,
        height: 600
    }
}
