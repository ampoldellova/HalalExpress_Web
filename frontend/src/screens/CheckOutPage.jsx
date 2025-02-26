import { Box, Button, Card, CardActions, CardContent, Container, Divider, Grid2, Radio, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrderSummary from '../components/Order/OrderSummary';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import locationImage from '../assets/images/location.png';
import { getUser } from '../utils/helpers';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

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
    const user = getUser();
    const location = useLocation();
    const { cart } = location.state;
    const [restaurant, setRestaurant] = useState(null);
    const [addresses, setAddresses] = useState([]);

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

    const fetchUserAddresses = async () => {
        try {
            const token = await sessionStorage.getItem('token');
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                }

                const response = await axios.get(`http://localhost:6002/api/users/address/list`, config);
                setAddresses(response.data.addresses);
            }
        } catch (error) {
            console.error('Error fetching user addresses:', error);
        }
    };
    console.log(addresses);
    useEffect(() => {
        fetchUserAddresses();
        fetchRestaurant();
    }, [cart]);

    return (
        <Container maxWidth='lg'>
            <Grid2 container spacing={2} sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Grid2 item xs={12} md={6}>
                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite, width: { xs: 435, md: 650 }, mb: 5 }}>
                        <Typography sx={{ fontFamily: 'bold', fontSize: 24, mb: 2 }}>Delivery Address</Typography>
                        <Typography sx={{ fontFamily: 'bold', fontSize: 16, mb: 2 }}>Saved addresses: </Typography>
                        {addresses.map((address) => (
                            <Box sx={{ mb: 2, border: 1, borderRadius: 3, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderColor: COLORS.gray2, '&:hover': { borderColor: COLORS.black } }}>

                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Radio sx={{ p: 0 }} />
                                    <Box component='img' src={locationImage} sx={{ width: 20, height: 20, mx: 1 }} />
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 14 }}>{address.address}</Typography>
                                </Box>
                                <Box>
                                    <EditOutlinedIcon sx={{ mr: 1 }} />
                                    <DeleteOutlineOutlinedIcon />
                                </Box>
                            </Box>
                        ))}
                        <TextField
                            multiline
                            fullWidth
                            rows={4}
                            placeholder='Add your note here...'
                            InputProps={{
                                sx: {
                                    fontFamily: 'regular',
                                    fontSize: 16,
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: COLORS.offwhite,
                                    borderRadius: 3,
                                    '& fieldset': {
                                        borderColor: COLORS.gray2,
                                    },
                                    '&:hover fieldset': {
                                        borderColor: COLORS.secondary,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: COLORS.secondary,
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    fontFamily: 'regular',
                                    fontSize: 16,
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite, width: { xs: 435, md: 650 }, mb: 5 }}>
                        <Typography sx={{ fontFamily: 'bold', fontSize: 24, mb: 2 }}>Delivery Options</Typography>
                        <Box sx={{ mb: 2, border: 1, borderRadius: 3, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderColor: COLORS.gray2, '&:hover': { borderColor: COLORS.black } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Radio sx={{ p: 0, mr: 2 }} />
                                <Typography sx={{ fontFamily: 'medium', fontSize: 16, mr: 1 }}>Standard </Typography>
                                <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 16 }}>({restaurant?.time})</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mb: 2, border: 1, borderRadius: 3, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderColor: COLORS.gray2, '&:hover': { borderColor: COLORS.black } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Radio sx={{ p: 0, mr: 2 }} />
                                <Typography sx={{ fontFamily: 'medium', fontSize: 16 }}>Pickup</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite, width: { xs: 435, md: 650 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontFamily: 'bold', fontSize: 24 }}>Personal Details</Typography>
                            <Button sx={{ ml: 'auto', textTransform: 'none', fontFamily: 'regular', fontSize: 16, color: COLORS.black }} startIcon={<EditOutlinedIcon />} >Edit</Button>

                        </Box>
                        <Box sx={{ mt: 2, flexDirection: 'row', display: 'flex', alignItems: 'center' }} >
                            <Person2OutlinedIcon sx={{ color: COLORS.gray, mr: 1  }} />
                            <Typography sx={{ fontFamily: 'regular', fontSize: 14 }}> {user?.username}</Typography>
                        </Box>
                        <Box sx={{ mt: 1, flexDirection: 'row', display: 'flex', alignItems: 'center' }} >

                            <EmailOutlinedIcon sx={{ color: COLORS.gray, mr: 1  }} />
                            <Typography sx={{ fontFamily: 'regular', fontSize: 14 }}>{user?.email}</Typography>
                        </Box>
                        <Box sx={{ mt: 1, flexDirection: 'row', display: 'flex', alignItems: 'center' }} >
                            <LocalPhoneOutlinedIcon sx={{ color: COLORS.gray, mr: 1 }} />
                            <Typography sx={{ fontFamily: 'regular', fontSize: 14 }}>+{user?.phone}</Typography>
                        </Box>
                    </Box>

                </Grid2>
                <Grid2 item xs={12} md={6} >
                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite, width: { xs: 435, md: 400 } }}>
                        <Typography sx={{ fontFamily: 'bold', fontSize: 24 }}>Your order from</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box component='img' src={restaurant?.logoUrl.url} sx={{ width: 20, height: 20, objectFit: 'cover', borderRadius: 1 }} />
                            <Typography sx={{ fontFamily: 'medium', fontSize: 16, ml: 1 }}>{restaurant?.title}</Typography>
                        </Box>

                        <Box sx={{ my: 4 }}>
                            {cart?.cartItems.map((item) => (
                                <>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontFamily: 'regular', fontSize: 14, color: COLORS.gray }}>{item.quantity}x {item.foodId.title}</Typography>
                                        <Typography sx={{ fontFamily: 'regular', fontSize: 14, color: COLORS.gray }}>₱ {item.totalPrice.toFixed(2)}</Typography>
                                    </Box>
                                    <Box>
                                        {item.additives.length > 0 ? (
                                            <>
                                                {item.additives.map((additive) => (
                                                    < Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, ml: 2 }}>
                                                        + {additive.title}
                                                    </Typography>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                < Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, ml: 2 }}>
                                                    - No additives
                                                </Typography>
                                            </>
                                        )}
                                    </Box>
                                </>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>Subtotal:</Typography>
                            <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>₱ {cart?.totalAmount.toFixed(2)}</Typography>

                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                            <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>Delivery Fee:</Typography>
                            <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>₱ {cart?.totalAmount.toFixed(2)}</Typography>

                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Typography sx={{ fontFamily: 'bold', fontSize: 24 }}>Total:</Typography>
                            <Typography sx={{ fontFamily: 'bold', fontSize: 24 }}>₱ 0.00</Typography>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2 >
        </Container >
    );
};

export default CheckOutPage;