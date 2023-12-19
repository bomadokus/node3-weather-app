const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Expressconfig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => 
    res.render('index', {
        title: 'Weather',
        name: 'Boma Dokus '
    }) 
)


app.get('/about', (req, res) => 
    res.render('about', {
        title: 'About Me',
        name: 'Boma Dokus'
    })
)
  
app.get('/help', (req, res) => 
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help Me',
        name: 'Boma Dokus'
    })
)

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address!'
        })
    }

    geocode(req.query.address, (error,{ longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404'),{
        title: '404',
        name: 'Boms Dokus',
        errorMessage: 'Help article not found'
    }
})

app.get('*', (req, res) => {
    res.render('404'),{
        title: '404',
        name: 'Boma Dokus',
        errorMessage: 'Page not found'
    }
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})