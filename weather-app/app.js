const yargs = require('yargs')

const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

var addressPromise = geocode.getAddress(argv.address)

addressPromise.then((result) => {
  console.log(JSON.stringify(result, null, 2));
  var weatherPromise = weather.getWeather(result.lat, result.lng)

  weatherPromise.then((r) => {
    console.log("Temperature is: " + r)
  }, (e) => {
    console.log(e)
  })
}, (errorMessage) => {
  console.log(errorMessage);
})
