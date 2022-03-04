/* Requirements */
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

//products page route: will display all products
router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products })
});

//new product route: page to create a new product
router.get('/new', (req, res) => {
    res.render('products/new');
})

//post route for new product: adds the new product to the database 
//and will redirect the user to the newly created product
router.post('/', async (req, res) => {
    const product = new Product(req.body.product);
    await product.save();
    res.redirect(`/products/${product._id}`)
});

//product details route: will display a product's details
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.render('products/show', { product });
});

//edit product route: page to edit a product
router.get('/:id/edit', async (req,res) => {
    const product = await Product.findById(req.params.id)
    res.render('products/edit', { product });
});

//put route for editing product: updates the product in the database
//and will redirect the user to the updated product
router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { ...req.body.product });
    res.redirect(`/products/${product._id}`)
});

//delete route: deletes the product
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});

module.exports = router;