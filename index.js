const express = require('express')
const app = express()
const axios = require('axios');
const mongoose = require('mongoose')
const myShows = require('./models/myShows.js')
var cors = require('cors')
require('dotenv').config()
const dbUri = `${process.env.MONGODB}`
//==================MIDDLEWARES=====================
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT||3050
app.use(cors())

app.get('/',(req,res)=>{
    res.redirect('/all/1')
})

app.get('/all/:page', (req, res) => { //All Popular
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=${req.params.page}`)
        .then(function (response) {
            // handle success
            console.log(response.data.results);
            res.render('index.ejs', {movies: response.data.results,page:Number(req.params.page)})
           
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
})

app.get('/detail/:id', (req, res) => { //Detail
    
        myShows.findById(req.params.id)
        .then(result=>{
            axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US`)
        
        .then(function(response){

            res.render('detail.ejs', {movie:response.data,result:result})
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    })
})

app.get(`/search/:genre/:page`, (req, res) => { //Kategorie
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&page=${req.params.page}&with_genres=${req.params.genre}`)
        .then(function (response) {
            // handle success
            console.log(response.data.results);
            res.render('search.ejs', {movies: response.data.results,page:Number(req.params.page),genre:Number(req.params.genre)})
           
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
})

app.post('/ursearch', (req, res) => { //search-Funktion
    res.redirect(`/ursearch/${req.body.search}/1`)
})

app.get('/ursearch/:search/:page', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${req.params.search}&page=${req.params.page}&include_adult=false`)
        .then(function (response) {
            res.render('ursearch.ejs', { search: req.params.search, movies: response.data.results, max: response.data.total_pages, page: req.params.page })
        })
        .catch(function (error) {
            console.log(error);
        })
})

app.get('/myShows',(req,res)=>{ //mySHows
    myShows.find()
    .then(results => {
        console.log(results)
        res.render('myShows.ejs',{results})
    })
    .catch(err => console.log(err))
})
//=====================CRUD======================================================
app.post('/new', (req, res) => { //POST METHOD
    console.log(req.body)
    let shows = new myShows(req.body)
    shows.save()
        .then(result => res.redirect(`/detail/${req.body.id}`))
        .catch(err => console.log(err))
})

//delete
app.get('/delete/:id', (req, res) => {
    console.log('delete',req.params.id)
    // res.send(req.params.id)
    // myShows.findByIdAndDelete(req.params.id)
    myShows.findOneAndRemove({ _id: req.params.id })
        .then(result => {
            console.log('deleted:', result)
            res.redirect(`/detail/${req.params.id}`)
        }).catch(err => console.log(err))
})

//Update
app.get('/update/:id', (req, res) => {
    // Quering:Native MongoDb
    console.log(req.params.id)

    //  Quering:mongoose
    myShows.findById(req.params.id)
        .then(result => res.render('update', { result: result }))
        .catch(err => console.log(err))
})

app.post('/update', (req, res) => {
    console.log(req.body)
    myShows.findByIdAndUpdate(req.body._id, req.body)
        .then(result => res.redirect(`/details/${req.body.id}`))
        .catch(err => console.log(err))
})

//=====================BROWSE THE SERVER WITH MONGOOSE===========================

mongoose.connect(dbUri, () => {
    console.log('Database is connected')
    app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`)
    })
})

