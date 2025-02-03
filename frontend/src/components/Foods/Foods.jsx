import { Card, CardActionArea, CardMedia, Container, Grid2, Pagination, Typography } from '@mui/material'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

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

const Foods = () => {
    const [foods, setFoods] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    const handleChange = (event, value) => {
        setPage(value);
    };

    const paginatedFoods = foods.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const getFoods = async () => {
        try {
            const response = await axios.get(`http://localhost:6002/api/foods/list`);
            setFoods(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFoods();
    }, []);

    return (
        <>
            <Grid2 container sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 5 }}>
                <Typography sx={{ color: COLORS.black, fontSize: 24, fontFamily: 'bold' }}>
                    Available Foods
                </Typography>
                <FastfoodIcon sx={{ fontSize: 24, color: COLORS.secondary }} />
            </Grid2>

            <Grid2 container spacing={3} sx={{ mt: 2, justifyContent: 'center', mb: 5 }} >
                {paginatedFoods.map((food) => (
                    <Grid2 xs={12} sm={6} md={4} >
                        <Card sx={{ maxWidth: 165, boxShadow: 'none', cursor: 'pointer' }}>
                            <CardActionArea onClick={() => { }}>
                                <CardMedia
                                    sx={{ height: 165, borderRadius: 5, width: 165, objectFit: 'cover' }}
                                    image={food.imageUrl.url}
                                />
                                <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, mt: 1 }}>
                                    {food.restaurant.title}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'medium',
                                        fontSize: 18,
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                >
                                    {food.title}
                                </Typography>
                                <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, mt: 1 }}>
                                    from ₱ {food.price}
                                </Typography>
                            </CardActionArea>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
            <Pagination
                count={Math.ceil(foods.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
                sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}
            />
        </>
    )
}

export default Foods
