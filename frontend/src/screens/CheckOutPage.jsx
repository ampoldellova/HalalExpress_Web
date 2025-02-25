import { Box, Button, Card, CardActions, CardContent, Container, Divider, Grid2, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrderSummary from '../components/Order/OrderSummary';

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

const CheckOutPage = () => {
    const location = useLocation();
    const { cart } = location.state;
    const [restaurant, setRestaurant] = useState(null);

    // console.log(cart.cartItems[0].foodId.restaurant)

    const fetchRestaurant = async () => {
        if (cart?.cartItems.length > 0) {
            const restaurantId = cart.cartItems[0].foodId.restaurant;
            try {
                const response = await axios.get(`http://localhost:6002/api/restaurant/byId/${restaurantId}`);
                setRestaurant(response.data.data);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        }
    };

    useEffect(() => {
        fetchRestaurant();
    }, [cart]);

    return (
        <Container maxWidth='lg'>
            <Grid2 container spacing={2} sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Grid2 item xs={12} md={7}>
                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite }}>
                        <Typography sx={{ fontFamily: 'bold', fontSize: 24, mb: 2 }}>Delivery Address</Typography>
                    </Box>
                </Grid2>
                <Grid2 item xs={12} md={5} >
                    <OrderSummary restaurant={restaurant} cart={cart} />
                </Grid2>
            </Grid2>
        </Container >
    );
};

export default CheckOutPage;