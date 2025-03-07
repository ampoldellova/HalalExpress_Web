import { Box, Container, Divider, Grid2, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Gcash from '../../assets/images/gcash.png';
import cash from '../../assets/images/COD.png';

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

const OrderDetails = () => {
    const location = useLocation();
    const { order } = location.state;
    console.log(order);
    return (
        <Container maxWidth='lg'>
            <Typography variant='h4' sx={{ mt: 3, fontFamily: 'bold' }}>Order Details</Typography>
            <Grid2 container spacing={2} sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Grid2 item xs={12} md={6}>
                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite, width: { xs: 435, md: 650 }, mb: 5 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box component='img' src={order.restaurant.logoUrl.url} sx={{ height: 100, width: 100, objectFit: 'cover', borderRadius: 3 }} />
                            <Box sx={{ ml: 2 }}>
                                <Typography sx={{ fontFamily: 'bold', fontSize: 20, mb: 1 }}>{order.restaurant.title}</Typography>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 14, color: COLORS.gray }}>
                                    Ordered on: {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, {new Date(order.createdAt).toLocaleTimeString()}
                                </Typography>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 14, color: COLORS.gray }}>
                                    Order #: {order._id}
                                </Typography>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 14, color: COLORS.gray }}>
                                    Order for: {order.deliveryOption === 'standard' ? 'Delivery' : 'Pickup'}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <PlaceOutlinedIcon sx={{ color: COLORS.gray, fontSize: 24, mr: 1 }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 16, color: COLORS.gray }}>
                                        Order from:
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'medium', fontSize: 16, width: 500 }}>
                                        {order.restaurant.title} - {order.restaurant.coords.address}
                                    </Typography>
                                </Box>
                            </Box>
                            {order.deliveryOption === "standard" ? (
                                <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3 }}>
                                    <PlaceOutlinedIcon sx={{ color: COLORS.gray, fontSize: 24, mr: 1 }} />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontFamily: 'regular', fontSize: 16, color: COLORS.gray }}>
                                            To be delivered at:
                                        </Typography>
                                        <Typography sx={{ fontFamily: 'medium', fontSize: 16, width: 500 }}>
                                            {order.deliveryAddress}
                                        </Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <>
                                </>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite, width: { xs: 435, md: 650 }, mb: 5 }}>
                        <Typography sx={{ fontFamily: 'bold', fontSize: 20, mb: 2 }}>Order Summary</Typography>

                        {order.orderItems.map(item => (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box key={item._id} sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>{item.quantity}x {item.foodId.title}</Typography>
                                    {item.additives.length > 0 ? (
                                        <>
                                            {item.additives.map(additive => (
                                                <Typography sx={{ fontFamily: 'regular', fontSize: 16, ml: 3, color: COLORS.gray }}>+ {additive.title}</Typography>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <Typography sx={{ fontFamily: 'regular', fontSize: 16, ml: 3, color: COLORS.gray }}>- No additives</Typography>
                                        </>
                                    )}
                                </Box>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>₱ {item.totalPrice.toFixed(2)}</Typography>
                            </Box>
                        ))}

                        <Box sx={{ mt: 5, mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>Subtotal: </Typography>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>₱ {order.subTotal.toFixed(2)} </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>Delivery Fee: </Typography>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>₱ {order.deliveryFee.toFixed(2)} </Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontFamily: 'bold', fontSize: 20 }}>Total Amount: </Typography>
                                <Typography sx={{ fontFamily: 'bold', fontSize: 20 }}>₱ {order.totalAmount.toFixed(2)} </Typography>
                            </Box>
                        </Box>

                        <Typography sx={{ fontFamily: 'bold', fontSize: 20 }}>Payment method: </Typography>
                        {order.paymentMethod === 'cod' && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Box component='img' src={cash} sx={{ height: 30, width: 30, objectFit: 'cover', borderRadius: 3 }} />
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 16, ml: 1 }}>Cash On Delivery</Typography>
                                </Box>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>₱ {order.totalAmount.toFixed(2)} </Typography>
                            </Box>
                        )}
                        {order.paymentMethod === 'Pay at the counter' && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Box component='img' src={cash} sx={{ height: 30, width: 30, objectFit: 'cover', borderRadius: 3 }} />
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 16, ml: 1 }}>Pay at the counter</Typography>
                                </Box>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>₱ {order.totalAmount.toFixed(2)} </Typography>
                            </Box>
                        )}
                        {order.paymentMethod === 'gcash' && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Box component='img' src={Gcash} sx={{ height: 30, width: 30, objectFit: 'cover', borderRadius: 3 }} />
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 16, ml: 1 }}>GCash</Typography>
                                </Box>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>₱ {order.totalAmount.toFixed(2)} </Typography>
                            </Box>
                        )}
                    </Box>
                </Grid2>
                <Grid2 item xs={12} md={6}>
                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite, width: { xs: 435, md: 400 } }}>

                    </Box>
                </Grid2>
            </Grid2 >
        </Container >
    )
}

export default OrderDetails
