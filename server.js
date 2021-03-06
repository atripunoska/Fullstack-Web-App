if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const bestSellers = require('./routes/best-sellers')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb',extended: false }))


const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))




app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/best-sellers', bestSellers);

app.listen(process.env.PORT || 3000);



// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mybrary");
//   var myquery = { title: 'The Brothers Karamazov' };
//   dbo.collection("books").deleteOne(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted" + myquery);
//     db.close();
//   });
// });


