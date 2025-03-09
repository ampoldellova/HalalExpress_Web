import { Box, Button, Container, Divider, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Gcash from '../../assets/images/gcash.png';
import cash from '../../assets/images/COD.png';
import { toast } from 'react-toastify';
import { getUser } from '../../utils/helpers';
import axios from 'axios';
import CancelOrderModal from '../../components/Order/CancelOrderModal';

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
    const user = getUser();
    const navigate = useNavigate();
    const location = useLocation();
    const { order } = location.state;
    const [openCancelOrderModal, setOpenCancelOrderModal] = useState(false);

    const handleOpenCancelOrderModal = () => setOpenCancelOrderModal(true);
    const handleCloseCancelOrderModal = () => setOpenCancelOrderModal(false);

    return (
        <Container maxWidth='lg'>
            <Typography variant='h4' sx={{ mt: 3, fontFamily: 'bold' }}>Order Details</Typography>
            <Grid2 container spacing={2} sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Grid2 item xs={12} md={6}>
                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite, width: { xs: 435, md: 650 }, mb: 5 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box component='img' src={user.userType === 'Vendor' ? order.supplier.logoUrl.url : order.restaurant.logoUrl.url} sx={{ height: 100, width: 100, objectFit: 'cover', borderRadius: 3 }} />
                            <Box sx={{ ml: 2 }}>
                                <Typography sx={{ fontFamily: 'bold', fontSize: 20, mb: 1 }}>{user.userType === 'Vendor' ? order.supplier.title : order.restaurant.title}</Typography>
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
                                    <Typography sx={{ fontFamily: 'medium', fontSize: 16, width: { xs: 400, md: 500 } }}>
                                        {user.userType === 'Vendor' ? order.supplier.title : order.restaurant.title} - {user.userType === 'Vendor' ? order.supplier.coords.address : order.restaurant.coords.address}
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
                                        <Typography sx={{ fontFamily: 'medium', fontSize: 16, width: { xs: 400, md: 500 } }}>
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
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>{item.quantity}x {user.userType === 'Vendor' ? item.productId.title : item.foodId.title}</Typography>

                                    {item.instructions ? (
                                        <Typography sx={{ fontFamily: 'regular', fontSize: 16, ml: 3, color: COLORS.gray }}>+ {item.instructions === '' ? 'No instructions' : item.instructions}</Typography>
                                    ) : (
                                        <>
                                            {item.additives.length > 0 ? (
                                                <>
                                                    {item.additives.map(additive => (
                                                        <Typography sx={{ fontFamily: 'regular', fontSize: 16, ml: 3, color: COLORS.gray }}>+ {additive.title}</Typography>
                                                    ))}
                                                </>
                                            ) : (
                                                <Typography sx={{ fontFamily: 'regular', fontSize: 16, ml: 3, color: COLORS.gray }}>- No additives</Typography>
                                            )}
                                        </>
                                    )}

                                </Box>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>₱ {item.totalPrice.toFixed(2)}</Typography>
                            </Box>
                        ))}

                        <Box sx={{ mt: 5, mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>Payment Status: </Typography>
                                <Box sx={{ px: 2, bgcolor: order.paymentStatus === 'Paid' ? COLORS.primary : COLORS.secondary, borderRadius: 3, height: 20 }}>
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 14, color: COLORS.white }}>{order.paymentStatus} </Typography>
                                </Box>
                            </Box>

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
                                    <Box component='img' src={cash} sx={{ height: 30, width: 35, objectFit: 'cover', borderRadius: 3 }} />
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 16, ml: 1 }}>Cash On Delivery</Typography>
                                </Box>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>₱ {order.totalAmount.toFixed(2)} </Typography>
                            </Box>
                        )}
                        {order.paymentMethod === 'Pay at the counter' && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Box component='img' src={cash} sx={{ height: 30, width: 35, objectFit: 'cover', borderRadius: 3 }} />
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 16, ml: 1 }}>Pay at the counter</Typography>
                                </Box>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>₱ {order.totalAmount.toFixed(2)} </Typography>
                            </Box>
                        )}
                        {order.paymentMethod === 'gcash' && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Box component='img' src={Gcash} sx={{ height: 30, width: 35, objectFit: 'cover', borderRadius: 3 }} />
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 16, ml: 1 }}>GCash</Typography>
                                </Box>
                                <Typography sx={{ fontFamily: 'regular', fontSize: 16 }}>₱ {order.totalAmount.toFixed(2)} </Typography>
                            </Box>
                        )}

                    </Box>
                </Grid2>

                <Grid2 item xs={12} md={6}>
                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite, width: { xs: 435, md: 400 } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontFamily: 'bold', fontSize: 20 }}>Order Status:</Typography>
                            <Box sx={{ px: 2, bgcolor: order.orderStatus === 'Pending' || 'cancelled by customer' || 'cancelled by restaurant' ? COLORS.secondary : COLORS.primary, borderRadius: 3 }}>
                                <Typography
                                    sx={{
                                        fontFamily: 'bold',
                                        fontSize: 20,
                                        color: COLORS.white
                                    }}>
                                    {order.orderStatus === 'cancelled by customer' ? 'Cancelled' : order.orderStatus}
                                </Typography>
                            </Box>
                        </Box>
                        {order.orderStatus === 'Pending' && (
                            <>
                                <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, mt: 2 }}>
                                    Your order is pending. Please wait for the restaurant to confirm your order.
                                </Typography>
                                <Button onClick={handleOpenCancelOrderModal} fullWidth sx={{ mt: 2, bgcolor: COLORS.primary, color: COLORS.white, textTransform: 'none', fontFamily: 'bold', borderRadius: 8 }}>
                                    {'C A N C E L   O R D E R'.split(' ').join('\u00A0\u00A0\u00A0')}
                                </Button>
                            </>
                        )}

                        {order.orderStatus === 'cancelled by customer' && (
                            <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, mt: 2 }}>
                                Your have cancelled your order. {order.paymentStatus === 'Paid' ? 'Please wait for the refund to be processed.' : 'No payment has been made.'}
                            </Typography>
                        )}
                    </Box>
                </Grid2>
            </Grid2 >
            <CancelOrderModal open={openCancelOrderModal} onClose={handleCloseCancelOrderModal} order={order} />
        </Container >
    )
}

export default OrderDetails
