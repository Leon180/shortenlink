const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const linksSet = require('./models/links')

const tenTo62 = require('./10to62')

// Setting express handlebars
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('input.hbs')
})

app.get('/shortenlink', (req, res) => {
  const origin_link = req.query.link
  linksSet.findOne({ origin_link: origin_link }, function (err, links) {
    if (err) { console.log(err) }
    if (links !== null) {
      res.render('output', { origin: req.headers.host, short_link: links.short_link })
    } else {
      linksSet.count((err, count) => {
        const short_link = tenTo62(count)
        linksSet.create({
          origin_link: origin_link,
          short_link: short_link
        }).then(() => res.render('output', { origin: req.headers.host, short_link }))
      })
    }
  })
})

app.get('/:short_link', (req, res) => {
  const short_link = req.params.short_link
  linksSet.findOne({ short_link: short_link }, function (err, links) {
    if (err) { console.log(err) }
    if (links !== null) {
      res.redirect(links.origin_link)
    }
    else {
      res.redirect('/')
    }
  })
})

app.listen(PORT, () => {
  console.log(`Running at port: ${PORT}`)
})