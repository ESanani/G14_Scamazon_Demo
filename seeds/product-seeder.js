const mongoose = require('mongoose');
const Product = require('../models/product');

var products = [
    new Product({
        title: 'Tesla',
        image: 'https://www.tesla.com/tesla_theme/assets/img/models/v1.0/slideshow/Red_Bay-1440.jpg?20171005',
        price: 950,
        discount: 0,
        quantity: 10,
        description: 'Tesla Product' 
    }),
    new Product({
        title: 'iPhone 7',
        image: 'https://i.ytimg.com/vi/7Jd7P42qaFM/maxresdefault.jpg',
        price: 650,
        discount: 0,
        quantity: 20,
        description: 'New iPhone 7',
    }),
    new Product({
        title: 'Iron',
        image: 'https://images-na.ssl-images-amazon.com/images/I/41BW0yDhVeL._SX355_.jpg',
        price: 50,
        discount: 0,
        quantity: 100,
        description: 'new Iron',
    }),
    new Product({
        title: 'The Kite Runner',
        image: 'https://images.gr-assets.com/books/1484565687l/77203.jpg',
        price: 30,
        discount: 0,
        quantity: 50,
        description: 'Kite Runner',
    }),
    new Product({
        title: 'Tesla Red Bay',
        image: 'https://www.tesla.com/tesla_theme/assets/img/models/v1.0/slideshow/Red_Bay-1440.jpg?20171005',
        price: 950,
        discount: 0,
        quantity: 20,
        description: 'Tesla Red Bay',
    }),
];

/* Connect to mongDB */
mongoose.connect('mongodb://localhost:27017/scamazon-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

const db = mongoose.connection;
//Check if connection is successful
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database Connected");
})

//delete everything in db and add products
const seedDB = async() => {
    await Product.deleteMany({});
    for(let i = 0; i < products.length; i++) {
        await products[i].save();
    }
}

seedDB();