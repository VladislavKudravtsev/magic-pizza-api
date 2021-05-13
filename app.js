const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productsRoute = require('./routes/products');
const ingredientsRoute = require('./routes/ingredients');
const ordersRoute = require('./routes/orders');
const pizzaRoute = require('./routes/pizza');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
app.use('/ingredients', ingredientsRoute);
app.use('/pizza', pizzaRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongodb');
});

app.listen(process.env.PORT);
