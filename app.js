const { request } = require('express');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

//express app
const app = express();


// Connect to mongodb 
const dbURI = "mongodb+srv://uniqueman:uniquemandb@nodetut.5t9jw.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');


//Using Morgan Middleware and Static files
app.use(express.static('public'));


// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})


//routes
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Never Give Up', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias'},
        {title: 'There was a State', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias'},
        {title: 'Naughty Little Brother ', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias'}
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
}); 

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})