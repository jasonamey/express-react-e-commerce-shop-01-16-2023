const express = require('express')
const stripeController  = require('../controllers/paymentController')
const { authenticateUser } = require('../middleware/authentication')

const router = express.Router()

router.route('/').post(stripeController)

module.exports = router