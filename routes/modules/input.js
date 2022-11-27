const express = require('express')
const linksSet = require('../../models/links')
const router = express.Router()

// Home Page
router.get('/', (req, res) => {
  res.render('input.hbs')
})

// If user use the shorten link
router.get('/:short_link', (req, res) => {
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

module.exports = router