const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 6002

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const restaurantRouter = require('./routes/restaurant')
const categoryRouter = require('./routes/category')
const foodRouter = require('./routes/food')
const cartRouter = require('./routes/cart')
const vendorCartRouter = require('./routes/vendorCart')
const supplierRouter = require('./routes/supplier')
const supplyCategoryRouter = require('./routes/supplyCategory')
const ingredientController = require('./routes/ingredient')

dotenv.config()
require('./cloudinary')

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Database Connected')).catch((err) => console.log(err))

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use('/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/category', categoryRouter);
app.use('/api/foods', foodRouter)
app.use('/api/cart/vendor', vendorCartRouter)
app.use('/api/cart', cartRouter)
app.use('/api/supplier', supplierRouter)
app.use('/api/supplyCategory', supplyCategoryRouter)
app.use('/api/ingredients', ingredientController)

app.post('/webhook', (req, res) => {
    const event = req.body;

    // Verify the webhook signature here (optional but recommended)

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.attributes;
        // Handle successful payment here
        console.log('Payment succeeded:', paymentIntent);
        // Update your database or perform other actions
    }

    res.status(200).send('Received');
});

app.listen(process.env.PORT || port, () => console.log(`HalalExpress app listening on port ${process.env.PORT}!`))