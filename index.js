const express = require('express')
const app = express()
const axios = require('axios');
var cors = require('cors')
require('dotenv').config()
app.use(express.static('public'))
app.set('view engine', 'ejs')


const port = process.env.PORT||3000
app.use(cors())

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

app.get('/all/:page', (req, res) => {
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

app.get('/detail/:id', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US`)
        .then(function (response) {
            // handle success
            console.log(response.data);
            res.render('detail.ejs', {movie:response.data})
           
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
})

app.get(`/search/:genre/:page`, (req, res) => {
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



