import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { retrievePaymentIntent } from '../hook/paymongoService';
import { getUser } from '../utils/helpers';
import axios from 'axios';

const PaymentConfirmation = () => {
    const user = getUser();
    const location = useLocation();
    const navigate = useNavigate();
    let parsedData = {};

    const retrievePayment = async () => {
        const queryParams = new URLSearchParams(location.search);
        const paymentIntentId = queryParams.get('payment_intent_id');
        const data = queryParams.get('data');
        parsedData = JSON.parse(data);

        if (paymentIntentId) {
            const response = await retrievePaymentIntent(paymentIntentId);

            if (response.data.attributes.status === 'succeeded') {
                const token = await sessionStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                }

                if (user?.userType === 'Vendor') {
                    const response = await axios.post(`http://localhost:6002/api/vendor/orders/check-out`, parsedData, config);
                    if (response.status === 200) {
                        toast.success('Order placed successfully');
                        // navigate(`/order-page/${user._id}`);
                    } else {
                        toast.error('Failed to place order');
                    }
                } else {
                    const response = await axios.post(`http://localhost:6002/api/orders/check-out`, parsedData, config);
                    if (response.status === 200) {
                        toast.success('Order placed successfully');
                        navigate('/');
                    } else {
                        toast.error('Failed to place order');
                    }
                }
                
            } else {
                toast.error('Payment failed. Please try again.');
            }
        } else {
            toast.error('Payment failed. Please try again.');
        }
    }

    useEffect(() => {
        retrievePayment();
    }, []); // Add an empty dependency array here

    return (
        <Loader />
    );
};

export default PaymentConfirmation;