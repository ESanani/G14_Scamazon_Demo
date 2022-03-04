/* Requirements */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
/* Model requirements */
const Product = require('./models/product');
const User = require('./models/user');
/* Routes requirements */
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

/* Connect to mongDB */
mongoose.connect('mongodb://localhost:27017/scamazon-demo', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
//Check if connection is successful
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
	console.log('Database Connected');
});

const app = express();

//set engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//define use routes
app.use('/', userRoutes);
app.use('/products', productRoutes);

/* #### BEGIN ROUTE DEFINITIONS #### */
//home page route
app.get('/', (req, res) => {
	res.render('home');
});

/* #### END ROUTE DEFINITIONS #### */

//port the app is listening on
app.listen(3000, () => {
	console.log('APP IS LISTENING ON PORT 3000!');
});
