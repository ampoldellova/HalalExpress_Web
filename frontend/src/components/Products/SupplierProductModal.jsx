import { Box, Button, Checkbox, Grid2, IconButton, Modal, TextField, Typography } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getToken, getUser } from '../../utils/helpers';
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
    black: "#242424",
    red: "#e81e4d",
    green: " #00C135",
    lightWhite: "#FAFAFC",
};

const SupplierProductModal = ({ open, onClose, productId }) => {
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const [preference, setPreference] = useState('');

    const getProduct = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }

            const response = await axios.get(`http://localhost:6003/api/ingredients/${productId}`, config);
            setProduct(response.data);
        } catch (error) {
            console.log("Error fetching product:", error);
        }
    };

    const addProductToCart = async () => {
        const cartItem = {
            productId: productId,
            totalPrice: product.price * count,
            quantity: count,
            instructions: preference,
            supplierId: product.supplier
        }

        try {
            const token = sessionStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }

            const response = await axios.post('http://localhost:6003/api/cart/vendor/', cartItem, config);
            setCount(1);
            setPreference('');
            onClose();
            toast.success('Product added to cart');
        } catch (error) {
            console.log("Error adding product to cart:", error);
            toast.error(error.message);
        }
    }

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    useEffect(() => {
        getProduct();
    }, [productId]);

    return (
        <Modal
            open={open}
            onClose={() => { onClose(); setCount(1) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box component='img' src={product?.imageUrl?.url} sx={{ height: 200, width: '100%', objectFit: 'cover', borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
                <Box sx={{ px: 3, py: 2 }}>
                    <Grid2 container sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: 24, fontFamily: 'bold' }}>
                            {product?.title}
                        </Typography>
                        <Typography sx={{ fontSize: 24, fontFamily: 'bold' }}>
                            ₱ {(product?.price * count).toFixed(2)}
                        </Typography>
                    </Grid2>
                    <Typography sx={{ fontSize: 16, fontFamily: 'regular', color: COLORS.gray, mt: 2 }}>
                        {product?.description}
                    </Typography>
                    <Typography sx={{ fontSize: 24, fontFamily: 'bold', mt: 4, mb: 1 }}>
                        Preferences
                    </Typography>
                    <TextField
                        multiline
                        fullWidth
                        rows={4}
                        placeholder='Add your preferences here...'
                        sx={{ bgcolor: COLORS.offwhite, fontFamily: 'regular', fontSize: 16, textTransform: 'none' }}
                        InputProps={{
                            sx: {
                                fontFamily: 'regular',
                                fontSize: 16,
                            },
                        }}
                        onChange={(e) => setPreference(e.target.value)}
                    />
                    <Grid2 container sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', mt: 4 }}>
                        <Grid2 container spacing={1} sx={{ justifyContent: 'space-between' }}>
                            <Grid2 container sx={{ alignItems: 'center' }}>
                                <IconButton onClick={decrement}>
                                    <RemoveCircleOutlineOutlinedIcon sx={{ fontSize: 30, color: COLORS.primary }} />
                                </IconButton>
                                <Typography sx={{ fontSize: 24, fontFamily: 'medium', width: 50, textAlign: 'center' }}>
                                    {count}
                                </Typography>
                                <IconButton onClick={increment}>
                                    <AddCircleOutlineOutlinedIcon sx={{ fontSize: 30, color: COLORS.primary }} />
                                </IconButton>
                            </Grid2>
                        </Grid2>
                        <Button onClick={addProductToCart} sx={{ width: '70%', textTransform: 'none', fontFamily: 'regular', fontSize: 16, backgroundColor: COLORS.primary, borderRadius: 3, color: COLORS.white }}>
                            Add to Cart
                        </Button>
                    </Grid2>
                </Box>
            </Box>
        </Modal>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    borderRadius: 5,
    maxHeight: '80vh',
    overflow: 'auto'
};

export default SupplierProductModal
