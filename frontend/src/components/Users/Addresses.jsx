import { Box, Radio, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import locationImage from '../../assets/images/location.png'
import axios from 'axios';
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

const Addresses = ({ address }) => {

    return (
        <Box sx={{ mb: 2, border: 1, borderRadius: 3, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderColor: COLORS.gray2, '&:hover': { borderColor: COLORS.black } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Radio sx={{ p: 0 }} />
                <Box component='img' src={locationImage} sx={{ width: 20, height: 20, mx: 1 }} />
                <Typography sx={{ fontFamily: 'regular', fontSize: 14, width: 450 }}>{address.address}</Typography>
            </Box>
            <Box>
                <EditOutlinedIcon sx={{ mr: 1 }} />
                <DeleteOutlineOutlinedIcon />
            </Box>
        </Box>
    )
}

export default Addresses
