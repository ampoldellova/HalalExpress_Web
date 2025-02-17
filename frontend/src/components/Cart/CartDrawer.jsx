import { Box, Container, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CartDrawer = ({ onClick }) => {
    const [cartItems, setCartItems] = useState([])

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

    console.log(cartItems)
    return (
        <Box sx={{ width: 500 }} onClick={onClick}>
            <Container maxWidth='sm'>
                <Typography sx={{ fontFamily: 'bold', textAlign: 'center', mt: 3, fontSize: 24 }} >Your Cart</Typography>
                {cartItems.map((item) => (
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                        <Box component='img' src={item.foodId.imageUrl.url} sx={{ height: 100, width: 100, borderRadius: 5, objectFit: 'cover' }} />
                        <Typography sx={{ fontFamily: 'regular', fontSize: 18, ml: 2 }}>{item.foodId.title}</Typography>
                    </Box>
                ))}
            </Container>
        </Box>
    )
}

export default CartDrawer
