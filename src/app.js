const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const dict = require('./../utils/dictionary.js')


const assets_path = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

// use takes arg of static assets path
app.use(express.static(assets_path))
// set up port
const port = process.env.PORT || 3000
// set tells express to look for something.
app.set('view engine', 'hbs')
// used to rename the views directory
app.set('views', viewsPath)

const partialsPath =  path.join(viewsPath, '../partials')
hbs.registerPartials(partialsPath)

app.get('/wordofday', (req, res) => {
    dict((err, data) => {
        if (err) {
            return res.send(err)
        }
        // while no definition, make new http request
        let word = data.word
        let definition = data.definition
        while(!definition || !word) {
            dict((err2, data2) => {
                if (err2) {
                    return res.send(err2)
                }
                word = data2.word
                definition = data2.definition
            })
            
        }
        res.send({word, definition})
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'word of the day',
        name: 'brian salkas'
    })
})

app.get('/about', (req, res) => {
    res.render('other', {
        title: 'my site',
        name: 'brian salkas'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: "my site",
        name: 'brian again'
    })
})

app.listen(port, () => {
    console.log('your server is up and running on port ' + port)
})

