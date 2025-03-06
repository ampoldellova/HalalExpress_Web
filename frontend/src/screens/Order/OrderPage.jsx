import { Box, Container, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
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

const OrderPage = () => {
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchUserOrders = async () => {
        try {
            const token = await sessionStorage.getItem('token');
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                }

                const response = await axios.get('http://localhost:6002/api/orders/', config);
                setOrders(response.data.orders);
            } else {
                toast.error('You must be logged in to view your orders');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchUserOrders();
    }, []);

    const pendingOrders = orders.filter(order => order.orderStatus === 'Pending');
    console.log(pendingOrders);

    return (
        <Container maxWidth='md'>
            <Typography sx={{ fontFamily: 'bold', fontSize: 24, mt: 3 }}>Active Orders</Typography>

            {pendingOrders.length === 0 ? (
                <>
                    <Typography sx={{ fontFamily: 'regular', fontSize: 18, mt: 3 }}>
                        You have no active orders.
                    </Typography>
                </>
            ) : (
                <>
                    {pendingOrders.map(order => (
                        <Box key={order._id} sx={{ mt: 3, p: 2, borderRadius: 5, bgcolor: COLORS.offwhite }}>
                            <Box sx={{ display: 'flex' }}>
                                <Box component='img' src={order.restaurant.logoUrl.url} sx={{ height: 100, width: 100, objectFit: 'cover', borderRadius: 3 }} />
                                <Box sx={{ ml: 2 }}>
                                    <Typography sx={{ fontFamily: 'bold', fontSize: 18, mb: 0.5 }}>{order.restaurant.title}</Typography>
                                    <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>
                                        Ordered #: {order._id}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, mb: 0.5 }}>
                                        Ordered At: {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, {new Date(order.createdAt).toLocaleTimeString()}
                                    </Typography>
                                    {order.orderItems.map(item => (
                                        <>
                                            <Typography key={item._id} sx={{ fontFamily: 'regular', fontSize: 16 }}>{item.quantity}x {item.foodId.title}</Typography>
                                            {/* {item.additives.map(additive => (
                                                <Typography key={additive._id} sx={{ fontFamily: 'regular', fontSize: 14, ml: 2 }}>- {additive.title}</Typography>
                                            ))} */}
                                        </>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </>
            )}
        </Container>
    )
};



export default OrderPage
