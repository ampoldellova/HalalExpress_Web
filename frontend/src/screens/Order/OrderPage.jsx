import { Box, Container, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
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
    const pastOrders = orders.filter(order => order.orderStatus === 'Delivered');
    console.log(pendingOrders);

    return (
        <Container maxWidth='sm' >
            <Typography sx={{ fontFamily: 'bold', fontSize: 24, my: 3 }}>Active Orders</Typography>

            {pendingOrders.length === 0 ? (
                <Typography sx={{ fontFamily: 'regular', fontSize: 16, mt: 3 }}>
                    You have no active orders.
                </Typography>
            ) : (
                <>
                    {pendingOrders.map(order => (
                        <Box key={order._id} onClick={() => navigate(`/order-detail/${order._id}`)} sx={{ mb: 3, p: 2, borderRadius: 5, bgcolor: COLORS.offwhite, cursor: 'pointer' }}>
                            <Box sx={{ display: 'flex' }}>
                                <Box component='img' src={order.restaurant.logoUrl.url} sx={{ height: 80, width: 80, objectFit: 'cover', borderRadius: 3 }} />
                                <Box sx={{ ml: 2, width: 800 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography sx={{ fontFamily: 'bold', fontSize: 18, mb: 1 }}>{order.restaurant.title}</Typography>
                                        <Typography sx={{ fontFamily: 'bold', fontSize: 18, mb: 1 }}>₱ {order.totalAmount.toFixed(2)}</Typography>
                                    </Box>
                                    <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>
                                        Ordered #: {order._id}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, mb: 1 }}>
                                        Ordered At: {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, {new Date(order.createdAt).toLocaleTimeString()}
                                    </Typography>
                                    {order.orderItems.map(item => (
                                        <>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Box component='img' src={item.foodId.imageUrl.url} sx={{ height: 40, width: 40, objectFit: 'cover', borderRadius: 3 }} />
                                                <Typography key={item._id} sx={{ fontFamily: 'regular', fontSize: 16, ml: 1 }}>{item.quantity}x {item.foodId.title}</Typography>
                                            </Box>
                                        </>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </>
            )}

            <Typography sx={{ fontFamily: 'bold', fontSize: 24, my: 3 }}>Past Orders</Typography>

            {pastOrders.length === 0 ? (
                <Typography sx={{ fontFamily: 'regular', fontSize: 16, my: 3 }}>
                    You have no past orders.
                </Typography>
            ) : (
                <>
                </>
            )}
        </Container>
    )
};



export default OrderPage
