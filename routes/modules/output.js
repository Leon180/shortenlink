const express = require('express')
const linksSet = require('../../models/links')
const router = express.Router()
const randomAlphanumeric = require('../../functions/randomAlphanumeric')

router.get('/', (req, res) => {
  const origin_link = req.query.link
  // Find all
  linksSet.find({}, function (err, links) {
    // if the input link has already generated shorten link
    let originMatch = false
    let short_link = ''
    links.forEach((link) => {
      if (origin_link === link.origin_link) {
        originMatch = true
        short_link = link.short_link
      }
    })
    if (originMatch) { return res.render('output', { origin: req.headers.host, short_link }) }

    // generate shorten link
    // if the shorten link has been created, re-generate shorten link
    let shortMatch = true
    let randomAlphanumeric5 = randomAlphanumeric(5)
    while (shortMatch) {
      shortMatch = false
      links.forEach((link) => {
        if (randomAlphanumeric5 === link.short_link) {
          match = true
          randomAlphanumeric5 = randomAlphanumeric(5)
        }
      })
    }
    linksSet.create({
      origin_link: origin_link,
      short_link: randomAlphanumeric5
    }).then(() => {
      res.render('output', { origin: req.headers.host, short_link: randomAlphanumeric5 })
    })
  })
})



module.exports = router