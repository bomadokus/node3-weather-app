const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a87669f3d27e83d77c5cd7a62bb684f5&query=' + latitude + ',' + longitude + '.&units=f'
    request({ url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, body.current.weather_description[0] + '. it is currenty ' + body.currently.temparature + ' degrees out. There is a' + body.currently.precipProbability + ' % chance of rain.')
        }
    })
}
module.exports = forecast
