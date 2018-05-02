const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
    next()
})

app.use(bodyParser.json())

const inMemoryDatabase = {
    shows: [
        {
            name: 'Walking Dead',
            rating: 5,
            imagePreview: 'http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/01/the-walking-dead-season-8.jpg?itok=wE0cjlWr'
        },
        {
            name: 'Walking Dead',
            rating: 4,
            imagePreview: 'http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/01/the-walking-dead-season-8.jpg?itok=wE0cjlWr'
        },
        {
            name: 'Walking Dead',
            rating: 3,
            imagePreview: 'http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/01/the-walking-dead-season-8.jpg?itok=wE0cjlWr'
        },
        {
            name: 'Walking Dead',
            rating: 2,
            imagePreview: 'http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/01/the-walking-dead-season-8.jpg?itok=wE0cjlWr'
        },
    ]
}

app.get('/shows', (req, res) => {
    res.send(inMemoryDatabase.shows)

})

app.post('/shows', (req, res) => {
    const newShow = req.body
    inMemoryDatabase.shows.push(newShow)
    res.send('Added new Show: ' + newShow.name)
})

app.listen("3001", () => console.log('Running on port 3001'))