const express = require('express')
const router = express.Router()
const usersRouter = require('./users/users')
const countryRouter = require('./country/country')

router.use('/users', usersRouter)
router.use('/country', countryRouter)

module.exports = router