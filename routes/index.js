const express = require('express')
const router = express.Router()

const output = require('./modules/output')
router.use('/shortenlink', output)
const input = require('./modules/input')
router.use('/', input)

module.exports = router