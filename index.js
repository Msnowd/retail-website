const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.js')
const app = express()
const DB_URL = "mongodb+srv://maxretailwebsite:a895UeAC85O6bdVt@cluster0.wjnl7hj.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("Connection to database was successful");
    })
    .catch(error => {
        console.log("An error occured connecting to database")
        console.log(error)
    })
app.set('view engine', 'ejs')
app.listen(8080, function () {
    console.log('Application Started')
})
app.get('/home', function (req, res) {
    console.log('i');
    res.render('index', {
        nums: [3, 4, 5]
    })
})
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json({ limit: "30mb" }));
app.get('/add-to-db', function (req, res) {
    var product1 = new Product({
        name: 'Winter on the water',
        price: 79.99,
        description: 'Imagine you are floating on a sea of wonder and drinking in the wine of luxury. Now, dont.'
    });
    product1.save(function (err, p) {
        console.log(p.name + " saved.")
    });
    res.redirect('/home')
})