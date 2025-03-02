import { Box, Button, Card, CardActions, CardContent, Container, Divider, Grid, Grid2, InputAdornment, Radio, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cash from '../assets/images/COD.png';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { getUser } from '../utils/helpers';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Gcash from '../assets/images/gcash.png';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddAddressModal from '../components/Users/AddAddressModal';
import locationImage from '../assets/images/location.png';
import DeleteAddressModal from '../components/Users/DeleteAddressModal';
import EditAddressModal from '../components/Users/EditAddressModal';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CircularProgress from '@mui/material/CircularProgress';
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

const CheckOutPage = () => {
    const user = getUser();
    const location = useLocation();
    const { cart } = location.state;
    const [username, setUsername] = useState(user?.username);
    const [image, setImage] = useState(user.profile.url);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [restaurant, setRestaurant] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [editUserDetails, setEditUserDetails] = useState(false);
    const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpenAddAddressModal = () => setOpenAddAddressModal(true);
    const handleCloseAddAddressModal = () => setOpenAddAddressModal(false);

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

    const handleSubmitForm = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                toast.error('User is not authenticated.');
                setLoading(false);
                return;
            }

            const formData = new FormData();
            if (image) {
                const response = await fetch(image);
                const file = await response.blob();
                formData.append('profile', file, 'profile.jpg');
            }

            formData.append('username', username);
            formData.append('email', email);
            formData.append('phone', phone);

            const response = await axios.put(`http://localhost:6002/api/users/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            });

            if (response.status === 201) {
                const updatedUser = response.data.data;
                await sessionStorage.removeItem('user');
                await sessionStorage.setItem('user', JSON.stringify(updatedUser));
                setUsername(updatedUser.username);
                setEmail(updatedUser.email);
                setPhone(updatedUser.phone);
                setImage(updatedUser.profile.url);
                setEditUserDetails(false);
                toast.success('Profile updated successfully');
                setLoading(false);
            } else {
                toast.error('Failed to update profile');
                setLoading(false);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserAddresses();
        fetchRestaurant();
    }, [cart]);

    const isUserDetailsChanged = () => {
        return username !== user?.username || email !== user?.email || phone !== user?.phone || image !== user.profile.url;
    };

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
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 14, width: 450 }}>{address.address}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <EditAddressModal userAddress={address} fetchUserAddresses={fetchUserAddresses} />
                                    <DeleteAddressModal address={address} fetchUserAddresses={fetchUserAddresses} />
                                </Box>
                            </Box>
                        ))}

                        <Box
                            sx={{
                                mb: 2,
                                border: 1,
                                borderRadius: 3,
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                borderColor: COLORS.gray2,
                                color: COLORS.gray,
                                cursor: 'pointer',
                                '&:hover': {
                                    borderColor: COLORS.black,
                                    color: COLORS.black,
                                    '& .icon, & .text': {
                                        color: COLORS.black,
                                    },
                                },
                            }}
                            onClick={handleOpenAddAddressModal}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AddCircleOutlineIcon className='icon' sx={{ mr: 1, color: COLORS.gray }} />
                                <Typography className='text' sx={{ fontFamily: 'regular', fontSize: 14, color: COLORS.gray }}>Add address</Typography>
                            </Box>
                        </Box>

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

                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite, width: { xs: 435, md: 650 }, mb: 5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontFamily: 'bold', fontSize: 24 }}>Personal Details</Typography>

                            {editUserDetails ? (
                                <Button
                                    sx={{
                                        ml: 'auto',
                                        textTransform: 'none',
                                        fontFamily: 'regular',
                                        fontSize: 16,
                                        color: COLORS.black,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            color: COLORS.black,
                                        },
                                    }}
                                    startIcon={<CloseOutlinedIcon />}
                                    onClick={() => setEditUserDetails(false)}
                                    disableRipple
                                >
                                    Cancel
                                </Button>
                            ) : (
                                <Button
                                    sx={{
                                        ml: 'auto',
                                        textTransform: 'none',
                                        fontFamily: 'regular',
                                        fontSize: 16,
                                        color: COLORS.black,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            color: COLORS.black,
                                        },
                                    }}
                                    startIcon={<EditOutlinedIcon />}
                                    onClick={() => setEditUserDetails(true)}
                                    disableRipple
                                >
                                    Edit
                                </Button>
                            )}
                        </Box>

                        {editUserDetails ? (
                            <>
                                <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, mt: 2 }}>
                                    Username
                                </Typography>
                                <TextField
                                    placeholder='Enter Username'
                                    variant="outlined"
                                    name="email"
                                    autoComplete="off"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person2OutlinedIcon />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            '& input': {
                                                fontFamily: 'regular',
                                                fontSize: 16,
                                                '&::placeholder': {
                                                    fontFamily: 'regular',
                                                    fontSize: 16
                                                },
                                            },
                                        },
                                    }}
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: COLORS.white,
                                            borderRadius: 8,
                                            '& fieldset': {
                                                borderColor: COLORS.offwhite,
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

                                <Box sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }} >
                                    <Box sx={{ width: '49%' }}>
                                        <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, mt: 3 }}>
                                            Email
                                        </Typography>
                                        <TextField
                                            placeholder='Enter Email'
                                            variant="outlined"
                                            name="email"
                                            autoComplete="off"
                                            fullWidth
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailOutlinedIcon />
                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    '& input': {
                                                        fontFamily: 'regular',
                                                        fontSize: 16,
                                                        '&::placeholder': {
                                                            fontFamily: 'regular',
                                                            fontSize: 16
                                                        },
                                                    },
                                                },
                                            }}
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    bgcolor: COLORS.white,
                                                    borderRadius: 8,
                                                    '& fieldset': {
                                                        borderColor: COLORS.offwhite,
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

                                    <Box sx={{ width: '49%' }}>
                                        <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, mt: 3 }}>
                                            Phone Number
                                        </Typography>
                                        <TextField
                                            placeholder='Enter Phone Number'
                                            variant="outlined"
                                            name="email"
                                            autoComplete="off"
                                            fullWidth
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocalPhoneOutlinedIcon />
                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    '& input': {
                                                        fontFamily: 'regular',
                                                        fontSize: 16,
                                                        '&::placeholder': {
                                                            fontFamily: 'regular',
                                                            fontSize: 16
                                                        },
                                                    },
                                                },
                                            }}
                                            InputLabelProps={{
                                                shrink: false,
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    bgcolor: COLORS.white,
                                                    borderRadius: 8,
                                                    '& fieldset': {
                                                        borderColor: COLORS.offwhite,
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

                                </Box>
                                <Button
                                    onClick={handleSubmitForm}
                                    variant='contained'
                                    sx={{
                                        my: 4,
                                        width: '100%',
                                        bgcolor: isUserDetailsChanged() ? COLORS.primary : COLORS.gray2,
                                        color: COLORS.white,
                                        textTransform: 'none',
                                        fontFamily: 'bold',
                                        fontSize: 16,
                                        height: 50,
                                        borderRadius: 8,
                                        cursor: isUserDetailsChanged() ? 'pointer' : 'not-allowed',
                                    }}
                                    disabled={!isUserDetailsChanged()}
                                >
                                    {loading ? (<CircularProgress sx={{ color: COLORS.white }} size={24} />) : ('S U B M I T')}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Box sx={{ mt: 2, flexDirection: 'row', display: 'flex', alignItems: 'center' }} >
                                    <Person2OutlinedIcon sx={{ color: COLORS.gray, mr: 1 }} />
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 14 }}> {user?.username}</Typography>
                                </Box>
                                <Box sx={{ mt: 1, flexDirection: 'row', display: 'flex', alignItems: 'center' }} >

                                    <EmailOutlinedIcon sx={{ color: COLORS.gray, mr: 1 }} />
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 14 }}>{user?.email}</Typography>
                                </Box>
                                <Box sx={{ mt: 1, flexDirection: 'row', display: 'flex', alignItems: 'center' }} >
                                    <LocalPhoneOutlinedIcon sx={{ color: COLORS.gray, mr: 1 }} />
                                    <Typography sx={{ fontFamily: 'regular', fontSize: 14 }}>+{user?.phone}</Typography>
                                </Box>
                            </>
                        )}
                    </Box>

                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite, width: { xs: 435, md: 650 } }}>
                        <Typography sx={{ fontFamily: 'bold', fontSize: 24, mb: 2 }}>Payment Options</Typography>
                        <Box sx={{ mb: 2, border: 1, borderRadius: 3, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderColor: COLORS.gray2, '&:hover': { borderColor: COLORS.black } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Radio sx={{ p: 0 }} />
                                <Box component='img' src={cash} sx={{ width: 30, height: 30, mx: 1 }} />
                                <Typography sx={{ fontFamily: 'regular', fontSize: 14 }}>Cash On Delivery</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mb: 2, border: 1, borderRadius: 3, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderColor: COLORS.gray2, '&:hover': { borderColor: COLORS.black } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Radio sx={{ p: 0 }} />
                                <Box component='img' src={Gcash} sx={{ width: 35, height: 30, mx: 1 }} />
                                <Typography sx={{ fontFamily: 'regular', fontSize: 14 }}>GCash</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Button variant='contained' sx={{ my: 4, width: '100%', bgcolor: COLORS.primary, color: COLORS.white, textTransform: 'none', fontFamily: 'bold', fontSize: 16, height: 50, borderRadius: 8 }}>
                        {'P L A C E   O R D E R'.split(' ').join('\u00A0\u00A0\u00A0')}
                    </Button>
                </Grid2>

                <Grid2 item xs={12} md={6} >
                    <Box sx={{ borderRadius: 3, p: 2, bgcolor: COLORS.offwhite, width: { xs: 435, md: 400 } }}>
                        <Typography sx={{ fontFamily: 'bold', fontSize: 24 }}>Your order from:</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box component='img' src={restaurant?.logoUrl.url} sx={{ width: 20, height: 20, objectFit: 'cover', borderRadius: 1 }} />
                            <Typography sx={{ fontFamily: 'medium', fontSize: 16, ml: 1 }}>{restaurant?.title}</Typography>
                        </Box>

                        <Box sx={{ my: 4 }}>
                            {cart?.cartItems.map((item) => (
                                <>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
                                        <Box component='img' src={item.foodId.imageUrl.url} sx={{ height: 50, width: 50, objectFit: 'cover', borderRadius: 3, mr: 1 }} />
                                        <Box>
                                            <Typography sx={{ fontFamily: 'regular', fontSize: 14, color: COLORS.gray }}>{item.quantity}x {item.foodId.title}</Typography>
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
                                        <Box sx={{ ml: 'auto' }}>
                                            <Typography sx={{ fontFamily: 'regular', fontSize: 14, color: COLORS.gray }}>₱ {item.totalPrice.toFixed(2)}</Typography>
                                        </Box>
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
                            <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14 }}>₱ 0.00</Typography>

                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Typography sx={{ fontFamily: 'bold', fontSize: 24 }}>Total:</Typography>
                            <Typography sx={{ fontFamily: 'bold', fontSize: 24 }}>₱ 0.00</Typography>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2 >
            <AddAddressModal open={openAddAddressModal} onClose={handleCloseAddAddressModal} fetchUserAddresses={fetchUserAddresses} />
        </Container >
    );
};

export default CheckOutPage;