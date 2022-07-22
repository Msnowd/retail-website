const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.js')
require('dotenv').config({path: __dirname + '/.env'})

const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json({ limit: "30mb" }));
app.set('view engine', 'ejs')

// connect to DB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("Connection to database was successful");
    })
    .catch(error => {
        console.log("An error occured connecting to database")
        console.log(error)
    })

// start app on port 8080
app.listen(8080, function () {
    console.log('Application Started')
})

app.get('/home', async function (req, res) {
    const products = await Product.find({})
    res.render('index', {
        products
    })
})

app.post('/add-to-db', function (req, res) {

    const product1 = new Product({
        name: req.body.productName,
        price: req.body.productPrice,
        description: req.body.productDescription
    })

    Product.create(product1);

    res.redirect('/home');
})