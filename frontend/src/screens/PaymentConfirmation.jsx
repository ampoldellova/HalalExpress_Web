import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { retrievePaymentIntent } from '../hook/paymongoService';
import { getUser } from '../utils/helpers';
import axios from 'axios';

const PaymentConfirmation = () => {
    const user = getUser();
    const navigate = useNavigate();
    const location = useLocation();
    let parsedData = {};
    const hasFetchedPayment = useRef(false);

    const retrievePayment = async () => {
        const queryParams = new URLSearchParams(location.search);
        const paymentIntentId = queryParams.get('payment_intent_id');
        const data = queryParams.get('data');
        parsedData = JSON.parse(data);

        if (paymentIntentId) {
            const response = await retrievePaymentIntent(paymentIntentId);
            parsedData.paymentId = response.data.attributes.payments[0].id;

            if (response.data.attributes.status === 'succeeded') {
                const token = sessionStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    }
                }

                if (user.userType === 'Vendor') {
                    const response = await axios.post(`http://localhost:6003/api/vendor/orders/check-out`, parsedData, config);
                    if (response.status === 200) {
                        navigate(`/order-page/${user._id}`)
                        toast.success('Order placed successfully');

                    }
                } else {
                    const response = await axios.post(`http://localhost:6003/api/orders/check-out`, parsedData, config);
                    if (response.status === 200) {
                        navigate(`/order-page/${user._id}`)
                        toast.success('Order placed successfully');
                    }
                }
            } else {
                navigate('/');
                toast.error('Payment failed. Please try again.');
            }
        } else {
            toast.error('Payment failed. Please try again.');
        }
        console.log(parsedData);
    }

    useEffect(() => {
        if (!hasFetchedPayment.current) {
            retrievePayment();
            hasFetchedPayment.current = true; // Set the ref to true after the function is called
        }
    }, []);

    return (
        <Loader />
    );
};

export default PaymentConfirmation;