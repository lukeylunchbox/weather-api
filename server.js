const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const fetch = require('node-fetch')
const app = express()
// const apiKey = process.env.KEY
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')


app.get('/', (req,res) => {
    res.render('index')
})


// +++++++ Method #1 using Request ++++++++++

// app.post('/', (req, res) => {
//     let city = req.body.city
//      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.APIKEY}`
//      let url2 = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes'
//      fetch(url)
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(json){
//             let details = json.main 
//             let weatherString = `It's ${details.temp} degrees celsius in ${city} with a humidity of ${details.humidity}%.`
//             let weatherString2 = `Today in ${city}, there's a high of ${details.temp_max}, and a low of ${details.temp_min}.`
//             let weatherString3 = `Currently, wind is blowing at ${json.wind.speed} km/h ${json.wind.deg} degrees`
//                 console.log(json.main.temp)
//                 res.render('index', {details, weatherString, weatherString2, weatherString3, error: null});
//      }) 
   
//     })


// +++++++ Method #2 using Async Await ++++++++++

app.post('/', async (req, res) => {
    const {city} = req.body
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.APIKEY}`
    const quoteURL = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes'
    const pokeURL = 'https://pokeapi.bastionbot.org/v1/pokemon/'+ Math.floor(Math.random() * 500)
    const weatherResponse = await fetch(weatherURL)
    const quoteResponse = await fetch(quoteURL)
    const pokeResponse = await fetch(pokeURL)
    const weather = await weatherResponse.json()
    const quote = await quoteResponse.json()
    const pokemon = await pokeResponse.json()
    console.log(pokemon)
            let weatherString = `It's ${weather.main.temp} degrees celsius in ${city} with a humidity of ${weather.main.humidity}%.`
            let weatherString2 = `Today in ${city}, there's a high of ${weather.main.temp_max}, and a low of ${weather.main.temp_min}.`
            let weatherString3 = `Currently, wind is blowing at ${weather.wind.speed} km/h ${weather.wind.deg} degrees`
            let pokemonImage = pokemon[0].sprite
            let pokemonName =  `${pokemon[0].name} is a ${pokemon[0].types[0]} type.`
                res.render('index', {pokemonName, pokemonImage, quote, weather, weatherString, weatherString2, weatherString3, error: null});


    res.status(200).json({weather, quote, pokemonName, pokemonImage})

})


    // +++++++Method #3 using without Node-fetch using request++++++++++

//      request(url, (err, response, body) => {
//     let details = JSON.parse(body).main 
//     if (!err && res.statusCode == 200) {
//         if(details !== undefined){
//             console.log(JSON.parse(body))
//             let weatherString = `It's ${details.temp} degrees celsius in ${city} with a humidity of ${details.humidity}%.`
//             let weatherString2 = `Today in ${city}, there's a high of ${details.temp_max}, and a low of ${details.temp_min}.`
//             let weatherString3 = `Currently, wind is blowing at ${JSON.parse(body).wind.speed} km/h ${JSON.parse(body).wind.deg} degrees`
//               res.render('index', {details, weatherString, weatherString2, weatherString3, error: null});
//              }
//             }
//     res.render('index', {details: null, weatherString: null, weatherString2: null, error: "Something went wrong, please try again."});
//       })
//   })

    
    
    

  app.listen(process.env.PORT, () => {
    console.log(`Listening On Port ${process.env.PORT}`)
})
