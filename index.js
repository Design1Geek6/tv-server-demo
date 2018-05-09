const config = require('./config.js')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('monk')(config.mongoConnString)
const showsCollection = db.get('shows')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
    next()
})

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(req.body)
    next()
})

// const inMemoryDatabase = {
//     shows: [
//         {
//             name: 'Walking Dead',
//             rating: 5,
//             imagePreview: 'http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/01/the-walking-dead-season-8.jpg?itok=wE0cjlWr'
//         },
//         {
//             name: 'Walking Dead',
//             rating: 4,
//             imagePreview: 'http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/01/the-walking-dead-season-8.jpg?itok=wE0cjlWr'
//         },
//         {
//             name: 'Walking Dead',
//             rating: 3,
//             imagePreview: 'http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/01/the-walking-dead-season-8.jpg?itok=wE0cjlWr'
//         },
//         {
//             name: 'Walking Dead',
//             rating: 2,
//             imagePreview: 'http://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2018/01/the-walking-dead-season-8.jpg?itok=wE0cjlWr'
//         },
//     ]
// }

app.get('/shows', async (req, res) => {
    const shows = await showsCollection.find({})
    res.send(shows)

})

app.post('/shows', async (req, res) => {
    try{

    
    const newShow = req.body
    console.log('got new show')
    const savedShow = await showsCollection.insert(newShow)
    console.log('got here')
    res.send(savedShow)
    } catch(err){
        console.log(err)
    }
})

app.listen("3001", () => console.log('Running on port 3001'))