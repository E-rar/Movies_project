const express = require('express')
const app = express()
const axios = require('axios');
app.use(express.static('public'))
app.set('view engine', 'ejs')
var cors = require('cors')
const port = process.env.PORT||3000
app.use(cors())

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

app.get('/news', (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/76341?api_key=${process.env.API_KEYY}`)
        .then(function (response) {
            // handle success
            console.log(response.data.articles);
            res.render('news.ejs', { articles: response.data.articles })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
})