const request = require('request')

var getAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address)

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=zWI1FB0AO8iMPNRE9BFK0WAGfL80PIkn&location=${encodedAddress}`,
    json: true
  }, (err, res, body) => {
    if (err) {
      callback('Could not connect to google servers.')
    } else if (body.results.length) {
      callback(null, {
        lat: body.results[0].locations[0].latLng.lat,
        lng: body.results[0].locations[0].latLng.lng,
        address: body.results[0].providedLocation.location
      })
    }
  })
}

module.exports = {
  getAddress
}
