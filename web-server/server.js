const express = require('express')
const hbs = require('hbs')

const port = process.env.PORT || 3000
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);

  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'My cool website using node!'
  })
})

app.listen(port, () => {
  console.log(`Server is litening on port ${port}`);
})
