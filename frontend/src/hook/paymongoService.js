import axios from 'axios';

const PAYMONGO_SECRET_KEY = 'sk_test_5Ach5aZsrXzFmdv1MDaPiaVc';
const PAYMONGO_API_URL = 'https://api.paymongo.com/v1';

export const createPaymentIntent = async (amount) => {
    console.log(amount)
    try {
        const response = await axios.post(
            `${PAYMONGO_API_URL}/payment_intents`,
            {
                data: {
                    attributes: {
                        amount: amount * 100,
                        payment_method_allowed: ['gcash'],
                        currency: 'PHP',
                    },
                },
            },
            {
                headers: {
                    Authorization: `Basic ${btoa(PAYMONGO_SECRET_KEY)}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const paymentIntent = response.data.data;

        // Step 2: Create a GCash payment method
        const paymentMethodResponse = await axios.post(
            `${PAYMONGO_API_URL}/payment_methods`,
            {
                data: {
                    attributes: {
                        type: 'gcash',
                        billing: {
                            name: 'Customer Name',
                            email: 'customer@example.com',
                            // Optional: address and phone
                        },
                    },
                },
            },
            {
                headers: {
                    Authorization: `Basic ${btoa(PAYMONGO_SECRET_KEY)}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const paymentMethod = paymentMethodResponse.data.data;

        // Step 3: Attach the payment method to the created payment intent
        const attachResponse = await axios.post(
            `${PAYMONGO_API_URL}/payment_intents/${paymentIntent.id}/attach`,
            {
                data: {
                    attributes: {
                        payment_method: paymentMethod.id,
                    },
                },
            },
            {
                headers: {
                    Authorization: `Basic ${btoa(PAYMONGO_SECRET_KEY)}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Step 4: Display the dynamic GCash code on your front-end or checkout
        const qrCode = attachResponse.data.data.attributes.next_action.code;
        console.log('GCash Code Image URL:', qrCode.image_url);

        return attachResponse.data.data;

    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
};