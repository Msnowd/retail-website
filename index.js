const { response } = require('express')
const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.listen(8080, function () {
    console.log('Application Started')
})
app.get('/?', function (req, res) {
    console.log('i');
    res.render('index', {
        num: 5
    })
})
