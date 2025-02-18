import { Box, Container, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getToken, getUser } from '../../utils/helpers'
import cartImage from '../../assets/images/cart.png'

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

const CartDrawer = ({ onClick }) => {
    const [cartItems, setCartItems] = useState([])
    const token = getToken();
    const user = getUser();

    const getCartItems = async () => {
        try {
            const token = await sessionStorage.getItem('token')
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                }

                const response = await axios.get(`http://localhost:6002/api/cart/`, config)
                setCartItems(response.data.cartItems)
            } else {
                console.log('No token found')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getCartItems()
    }, []);

    return (
        <Box sx={{ width: 500 }} onClick={onClick}>
            <Container maxWidth='sm'>
                {token && user ? (
                    <>
                        <Typography sx={{ fontFamily: 'bold', textAlign: 'center', mt: 3, fontSize: 24 }} >Your Cart</Typography>
                        {cartItems.map((item) => (
                            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                                <Box component='img' src={item.foodId.imageUrl.url} sx={{ height: 100, width: 100, borderRadius: 5, objectFit: 'cover' }} />
                                <Typography sx={{ fontFamily: 'regular', fontSize: 18, ml: 2 }}>{item.foodId.title}</Typography>
                            </Box>
                        ))}
                    </>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
                            <Box component='img' src={cartImage} sx={{ height: 200, width: 200 }} />
                            <Typography sx={{ fontFamily: 'regular', textAlign: 'center', fontSize: 14, color: COLORS.gray, mt: 2 }}>Please login first to continue.</Typography>
                        </Box>
                    </>
                )}
            </Container>
        </Box >
    )
}

export default CartDrawer
