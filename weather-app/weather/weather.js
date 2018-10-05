const request = require('request')

var getWeather = (lat, lng) => {

  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/f4232a6a356a3815e43b08c8e44edcb5/${lat},${lng}`,
      json: true
    }, (err, res, body) => {
      if (err) {
        reject('unable to connect to the server')
      } else if (res.statusCode === 400) {
        reject('unable to fetch the weather')
      } else {
        resolve(body.currently.temperature)
      }
    })
  })

}

module.exports = {
  getWeather
}
