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

