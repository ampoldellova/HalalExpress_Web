import { Box, Container, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser } from '../../utils/helpers';

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
    const user = getUser();
    const [orders, setOrders] = React.useState([]);
    const [vendorOrders, setVendorOrders] = React.useState([]);

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
    };

    const fetchVendorOrders = async () => {
        try {
            const token = await sessionStorage.getItem('token');
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                }

                const response = await axios.get('http://localhost:6002/api/vendor/orders/', config);
                setVendorOrders(response.data.vendorOrders);
            } else {
                toast.error('You must be logged in to view your orders');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };


    useEffect(() => {
        { user.userType === 'Vendor' ? fetchVendorOrders() : fetchUserOrders() };
    }, []);

    const pendingOrders = (user.userType === 'Vendor' ? vendorOrders : orders)?.filter(order => order.orderStatus === 'Pending') || [];
    const pastOrders = (user.userType === 'Vendor' ? vendorOrders : orders)?.filter(order => order.orderStatus === 'Delivered') || [];
    const cancelledOrders = (user.userType === 'Vendor' ? vendorOrders : orders)?.filter(order => order.orderStatus === 'cancelled by customer') || [];

    return (
        <Container maxWidth='sm' >

            <Typography sx={{ fontFamily: 'bold', fontSize: 24, my: 3 }}>Active Orders</Typography>
            {pendingOrders.length === 0 ? (
                <Typography sx={{ fontFamily: 'regular', fontSize: 16, my: 3 }}>
                    You have no active orders.
                </Typography>
            ) : (
                <>
                    {pendingOrders.map(order => (
                        <>
                            <Box key={order._id} onClick={() => { navigate(`/order-detail/${order._id}`, { state: { order } }) }} sx={{ mb: 3, p: 2, borderRadius: 5, bgcolor: COLORS.offwhite, cursor: 'pointer' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <Box component='img' src={user.userType === 'Vendor' ? order.supplier.logoUrl.url : order.restaurant.logoUrl.url} sx={{ height: 80, width: 80, objectFit: 'cover', borderRadius: 3 }} />
                                    <Box sx={{ ml: 2, width: 800 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography sx={{ fontFamily: 'bold', fontSize: 20, mb: 1 }}>{user.userType === 'Vendor' ? order.supplier.title : order.restaurant.title}</Typography>
                                            <Typography sx={{ fontFamily: 'bold', fontSize: 20, mb: 1 }}>₱ {order.totalAmount.toFixed(2)}</Typography>
                                        </Box>
                                        <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>
                                            Ordered #: {order._id}
                                        </Typography>
                                        <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, mb: 1 }}>
                                            Ordered At: {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, {new Date(order.createdAt).toLocaleTimeString()}
                                        </Typography>
                                        {order.orderItems.map(item => (
                                            <Typography key={item._id} sx={{ fontFamily: 'regular', fontSize: 16, ml: 1 }}>{item.quantity}x {user.userType === 'Vendor' ? item.productId.title : item.foodId.title}</Typography>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </>
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

            <Typography sx={{ fontFamily: 'bold', fontSize: 24, my: 3 }}>Cancelled Orders</Typography>
            {cancelledOrders.length === 0 ? (
                <Typography sx={{ fontFamily: 'regular', fontSize: 16, my: 3 }}>
                    You have no cancelled orders.
                </Typography>
            ) : (
                <>
                    {cancelledOrders.map(order => (
                        <Box key={order._id} onClick={() => { navigate(`/order-detail/${order._id}`, { state: { order } }) }} sx={{ mb: 3, p: 2, borderRadius: 5, bgcolor: COLORS.offwhite, cursor: 'pointer' }}>
                            <Box sx={{ display: 'flex' }}>
                                <Box component='img' src={user.userType === 'Vendor' ? order.supplier.logoUrl.url : order.restaurant.logoUrl.url} sx={{ height: 80, width: 80, objectFit: 'cover', borderRadius: 3 }} />
                                <Box sx={{ ml: 2, width: 800 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography sx={{ fontFamily: 'bold', fontSize: 20, mb: 1 }}>{user.userType === 'Vendor' ? order.supplier.title : order.restaurant.title}</Typography>
                                        <Typography sx={{ fontFamily: 'bold', fontSize: 20, mb: 1 }}>₱ {order.totalAmount.toFixed(2)}</Typography>
                                    </Box>
                                    <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>
                                        Ordered #: {order._id}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, mb: 1 }}>
                                        Ordered At: {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, {new Date(order.createdAt).toLocaleTimeString()}
                                    </Typography>
                                    {order.orderItems.map(item => (
                                        <Typography key={item._id} sx={{ fontFamily: 'regular', fontSize: 16, ml: 1 }}>{item.quantity}x {user.userType === 'Vendor' ? item.productId.title : item.foodId.title}</Typography>
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
