const express = require('express');
const articleRouter = require("./routes/aricles.js");
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const { log } = require('console');

const app = express();

app.use(express.static("public"));

mongoose.connect('mongodb+srv://admin:jaisudharsan@authentication.h810n.mongodb.net/?retryWrites=true&w=majority&appName=authentication')
app.set("views", "./view")
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('index', { articles: articles })
})
app.use('/articles', articleRouter)

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
  });