import { Box, Button, Container, Divider, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getToken, getUser } from '../../utils/helpers'
import cartImage from '../../assets/images/cart.png'
import empty from '../../assets/images/empty.png'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [vendorCart, setVendorCart] = useState([])
    const [vendorCartItems, setVendorCartItems] = useState([])
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

                const response = await axios.get(`http://localhost:6003/api/cart/`, config)
                setCartItems(response.data.cartItems)
                setCart(response.data.cart)
            } else {
                console.log('No token found')
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    const getVendorCartItems = async () => {
        try {
            const token = await sessionStorage.getItem('token')
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                }

                const response = await axios.get(`http://localhost:6003/api/cart/vendor/`, config)
                setVendorCartItems(response.data.cartItems)
                setVendorCart(response.data.vendorCart)
            } else {
                console.log('No token found')
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    const removeFoodFromCart = async (foodId) => {
        try {
            const token = await sessionStorage.getItem('token');
            if (token) {
                await axios.delete(`http://localhost:6003/api/cart/remove-food?userId=${user._id}&foodId=${foodId}`, {
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

    const removeProductFromCart = async (productId) => {
        try {
            const token = await sessionStorage.getItem('token');
            if (token) {
                await axios.delete(`http://localhost:6003/api/cart/vendor/remove-product?userId=${user._id}&productId=${productId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                });
                toast.success('Product removed from cart');
                getVendorCartItems();
            } else {
                console.log('No token found');
            }
        } catch (error) {
            toast.error('Failed to remove product from cart');
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

                await axios.patch(`http://localhost:6003/api/cart/increment/${foodId}`, {}, config);
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

    const incrementProductQuantity = async (productId) => {
        try {
            const token = await sessionStorage.getItem('token');
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                }

                await axios.patch(`http://localhost:6003/api/cart/vendor/increment/${productId}`, {}, config);
                toast.success('Product quantity incremented');
                getVendorCartItems();
            } else {
                console.log('No token found');
            }
        } catch (error) {
            toast.error('Failed to increment product quantity');
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

                await axios.patch(`http://localhost:6003/api/cart/decrement/${foodId}`, {}, config);
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

    const decrementProductQuantity = async (productId) => {
        try {
            const token = await sessionStorage.getItem('token');
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                }

                await axios.patch(`http://localhost:6003/api/cart/vendor/decrement/${productId}`, {}, config);
                toast.success('Product quantity decremented');
                getVendorCartItems();
            } else {
                console.log('No token found');
            }
        } catch (error) {
            toast.error('Failed to decrement product quantity');
            console.log(error.message);
        }
    };

    useEffect(() => {
        { user && user.userType === 'Vendor' ? getVendorCartItems() : getCartItems() }
    }, [cartItems, vendorCartItems]);

    return (
        <Box sx={{ width: 500 }}>
            <Container maxWidth='sm'>
                {token && user ? (
                    <>
                        {user.userType === 'Vendor' ? (
                            <>
                                {vendorCartItems.length > 0 ? (
                                    <>
                                        <Box sx={{ position: 'relative' }}>
                                            <CancelIcon onClick={onClick} sx={{ position: 'absolute', left: 5, cursor: 'pointer', color: COLORS.primary, fontSize: 34 }} />
                                            <Typography sx={{ fontFamily: 'bold', textAlign: 'center', mt: 3, fontSize: 24 }} >Your Cart</Typography>
                                        </Box>
                                        {vendorCartItems.map((item) => (
                                            <Box sx={{ display: 'flex', mt: 5 }} key={item.productId._id}>
                                                <Box component='img' src={item.productId.imageUrl.url} sx={{ height: 100, width: 100, borderRadius: 5, objectFit: 'cover', mr: 2 }} />
                                                <Box>
                                                    <Typography sx={{ fontFamily: 'bold', fontSize: 18 }}>{item.productId.title}</Typography>
                                                    {item.instructions === '' ? (
                                                        <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>No instructions</Typography>
                                                    ) : (
                                                        <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>{item.instructions}</Typography>
                                                    )}
                                                    <Box sx={{ display: 'flex', mt: 2, borderWidth: 1, borderColor: COLORS.gray, borderRadius: 8, borderStyle: 'solid', padding: 0.5, width: 90, justifyContent: 'center' }}>
                                                        {item.quantity === 1 ? (
                                                            <IconButton sx={{ padding: 0 }} onClick={() => { removeProductFromCart(item.productId._id) }}>
                                                                <DeleteOutlineOutlinedIcon />
                                                            </IconButton>
                                                        ) : (
                                                            <IconButton sx={{ padding: 0 }} onClick={() => { decrementProductQuantity(item.productId._id) }}>
                                                                <RemoveCircleOutlineOutlinedIcon />
                                                            </IconButton>
                                                        )}
                                                        <Typography sx={{ fontFamily: 'regular', fontSize: 18, mx: 2 }}>{item.quantity}</Typography>
                                                        <IconButton sx={{ padding: 0 }} onClick={() => { incrementProductQuantity(item.productId._id) }}>
                                                            <AddCircleOutlineIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))}
                                        <Divider sx={{ mt: 5 }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                            <Typography sx={{ fontFamily: 'bold', fontSize: 18 }}>Total: </Typography>
                                            <Typography sx={{ fontFamily: 'bold', fontSize: 18 }}>₱ {vendorCart.totalAmount.toFixed(2)}</Typography>
                                        </Box>
                                        <Button onClick={() => { navigate(`/checkout/${vendorCart._id}`, { state: { vendorCart } }); onClick() }} variant='contained' sx={{ width: '100%', mt: 2, backgroundColor: COLORS.primary, color: COLORS.white, fontFamily: 'bold', borderRadius: 8, height: 50, fontSize: 18 }}>
                                            C H E C K O U T
                                        </Button>
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
                                {cartItems.length > 0 ? (
                                    <>
                                        <Box sx={{ position: 'relative' }}>
                                            <CancelIcon onClick={onClick} sx={{ position: 'absolute', left: 5, cursor: 'pointer', color: COLORS.primary, fontSize: 34 }} />
                                            <Typography sx={{ fontFamily: 'bold', textAlign: 'center', mt: 3, fontSize: 24 }} >Your Cart</Typography>
                                        </Box>
                                        {cartItems.map((item) => (
                                            <Box sx={{ display: 'flex', mt: 5 }} key={item.foodId._id}>
                                                <Box component='img' src={item.foodId.imageUrl.url} sx={{ height: 100, width: 100, borderRadius: 5, objectFit: 'cover', mr: 2 }} />
                                                <Box width='100%'>
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
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                                                        <Box>
                                                            <Typography sx={{ fontFamily: 'bold', fontSize: 18, mt: 2 }}>₱ {item.totalPrice.toFixed(2)}</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))}
                                        <Divider sx={{ mt: 5 }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                            <Typography sx={{ fontFamily: 'bold', fontSize: 18 }}>Total: </Typography>
                                            <Typography sx={{ fontFamily: 'bold', fontSize: 18 }}>₱ {cart.totalAmount.toFixed(2)}</Typography>
                                        </Box>
                                        <Button onClick={() => { navigate(`/checkout/${cart._id}`, { state: { cart } }); onClick() }} variant='contained' sx={{ width: '100%', mt: 2, backgroundColor: COLORS.primary, color: COLORS.white, fontFamily: 'bold', borderRadius: 8, height: 50, fontSize: 18 }}>
                                            C H E C K O U T
                                        </Button>
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
                        )}
                    </>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
                            <Box component='img' src={empty} sx={{ height: 200, width: 200 }} />
                            <Typography sx={{ fontFamily: 'regular', textAlign: 'center', fontSize: 14, color: COLORS.gray, mt: 2 }}>Please login first to continue.</Typography>
                        </Box>
                    </>
                )}
            </Container>
        </Box >
    )
}

export default CartDrawer
