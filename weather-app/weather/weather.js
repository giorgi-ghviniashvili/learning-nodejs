const request = require('request')

var getWeather = (lat, lng, callback) => {
  
  request({
    url: `https://api.darksky.net/forecast/f4232a6a356a3815e43b08c8e44edcb5/${lat},${lng}`,
    json: true
  }, (err, res, body) => {
    if (err) {
      callback('unable to connect to the server')
    } else if (res.statusCode === 400) {
      callback('unable to fetch the weather')
    } else {
      callback(null, body.currently.temperature)
    }
  })

}

module.exports = {
  getWeather
}
