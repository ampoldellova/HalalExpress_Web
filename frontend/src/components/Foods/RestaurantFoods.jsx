import { Box, Card, CardMedia, Grid2, Rating, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

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

const RestaurantFoods = ({ restaurantId }) => {
    const [foods, setFoods] = useState([]);

    const fetchRestaurantFoods = async () => {
        try {
            const response = await axios.patch(`http://localhost:6002/api/foods/restaurant/${restaurantId}`, {});
            setFoods(response.data);
        } catch (error) {
            console.log("Error fetching foods:", error);
        }
    };

    useEffect(() => {
        fetchRestaurantFoods();
    }, []);

    return (
        <Grid2 container spacing={3} sx={{ flexDirection: 'row', justifyContent: 'flex-start', mt: 2, }}>
            {foods.map((food) => (
                <Card sx={{ boxShadow: 'none', cursor: 'pointer', borderRadius: 5, width: 470, bgcolor: COLORS.offwhite, border: 1, borderColor: COLORS.gray2, p: 1 }}>
                    <Grid2 container sx={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5 }}>
                        <CardMedia
                            component="img"
                            image={food.imageUrl.url}
                            sx={{ height: 140, width: 140, borderRadius: 5, objectFit: 'cover' }}
                        />
                        <Grid2 sx={{ flexDirection: 'column', ml: 2, width: 300 }}>
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
                            {food.foodTags.slice(0, 3).map((tag) => (
                                <Box sx={{ display: 'inline-block', bgcolor: COLORS.gray2, px: 1, borderRadius: 2, mt: 1, mr: 1 }}>
                                    <Typography sx={{ fontFamily: 'regular', color: COLORS.white, fontSize: 14 }}>
                                        {tag}
                                    </Typography>
                                </Box>
                            ))}
                            <Typography sx={{ fontFamily: 'regular', color: COLORS.gray, fontSize: 14, mt: 1 }}>
                                {food.ratingCount} Reviews
                            </Typography>
                            <Grid2 container sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                <Rating
                                    name="simple-controlled"
                                    value={food.rating}
                                    precision={0.2}
                                    readOnly
                                    size='medium'
                                    sx={{ color: COLORS.secondary }}
                                />
                                <Box sx={{ bgcolor: COLORS.secondary, px: 1, borderRadius: 2 }}>
                                    <Typography sx={{ fontFamily: 'regular', color: COLORS.white, fontSize: 14 }}>
                                        ₱ {food.price}
                                    </Typography>
                                </Box>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Card>
            ))}
        </Grid2>
    )
}

export default RestaurantFoods
