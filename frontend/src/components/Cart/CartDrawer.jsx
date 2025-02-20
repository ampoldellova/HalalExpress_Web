import { Box, Container, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getToken, getUser } from '../../utils/helpers'
import cartImage from '../../assets/images/cart.png'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify'

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

    const removeFoodFromCart = async (foodId) => {
        try {
            const token = await sessionStorage.getItem('token');
            if (token) {
                await axios.delete(`http://localhost:6002/api/cart/remove-food?userId=${user._id}&foodId=${foodId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                });
                toast.success('Item removed from cart');
                getCartItems();
            } else {
                console.log('No token found');
            }
        } catch (error) {
            toast.error('Failed to remove item from cart');
            console.log(error.message);
        }
    };

    const incrementFoodQuantity = async (foodId) => {
        try {
            const token = await sessionStorage.getItem('token');
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                }

                await axios.patch(`http://localhost:6002/api/cart/increment/${foodId}`, {}, config);
                toast.success('Item quantity incremented');
                getCartItems();
            } else {
                console.log('No token found');
            }
        } catch (error) {
            toast.error('Failed to increment item quantity');
            console.log(error.message);
        }
    };

    const decrementFoodQuantity = async (foodId) => {
        try {
            const token = await sessionStorage.getItem('token');
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                }

                await axios.patch(`http://localhost:6002/api/cart/decrement/${foodId}`, {}, config);
                toast.success('Item quantity decremented');
                getCartItems();
            } else {
                console.log('No token found');
            }
        } catch (error) {
            toast.error('Failed to decrement item quantity');
            console.log(error.message);
        }
    };

    useEffect(() => {
        getCartItems()
    }, []);

    return (
        <Box sx={{ width: 500 }}>
            <Container maxWidth='sm'>
                {token && user ? (
                    <>
                        {cartItems.length > 0 ? (
                            <>
                                <Box sx={{ position: 'relative' }}>
                                    <CancelIcon onClick={onClick} sx={{ position: 'absolute', left: 5, cursor: 'pointer', color: COLORS.primary, fontSize: 34 }} />
                                    <Typography sx={{ fontFamily: 'bold', textAlign: 'center', mt: 3, fontSize: 24 }} >Your Cart</Typography>
                                </Box>
                                {cartItems.map((item) => (
                                    <Box sx={{ display: 'flex', mt: 5 }}>
                                        <Box component='img' src={item.foodId.imageUrl.url} sx={{ height: 100, width: 100, borderRadius: 5, objectFit: 'cover', mr: 2 }} />
                                        <Box>
                                            <Typography sx={{ fontFamily: 'bold', fontSize: 18 }}>{item.foodId.title}</Typography>
                                            {item.additives.length > 0 ? (
                                                <>
                                                    <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>
                                                        {item.additives.map((additive) => additive.title).join(', ')}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <>
                                                    <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>No additives</Typography>
                                                </>
                                            )}
                                            <Box sx={{ display: 'flex', mt: 2, borderWidth: 1, borderColor: COLORS.gray, borderRadius: 8, borderStyle: 'solid', padding: 0.5, width: 90, justifyContent: 'center' }}>
                                                {item.quantity === 1 ? (
                                                    <IconButton sx={{ padding: 0 }} onClick={() => removeFoodFromCart(item.foodId._id)}>
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton sx={{ padding: 0 }} onClick={() => decrementFoodQuantity(item.foodId._id)}>
                                                        <RemoveCircleOutlineOutlinedIcon />
                                                    </IconButton>
                                                )}
                                                <Typography sx={{ fontFamily: 'regular', fontSize: 18, mx: 2 }}>{item.quantity}</Typography>
                                                <IconButton sx={{ padding: 0 }} onClick={() => incrementFoodQuantity(item.foodId._id)}>
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </>
                        ) : (
                            <>
                                <CancelIcon onClick={onClick} sx={{ position: 'absolute', left: 10, top: 10, cursor: 'pointer', color: COLORS.primary, fontSize: 34 }} />
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
                                    <Box component='img' src={cartImage} sx={{ height: 200, width: 200 }} />
                                    <Typography sx={{ fontFamily: 'regular', textAlign: 'center', fontSize: 14, color: COLORS.gray, mt: 2, width: 215 }}>You haven't added anything to your cart.</Typography>
                                </Box>
                            </>
                        )}
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
