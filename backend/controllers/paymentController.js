const stripe = require('stripe')(process.env.STRIPE_KEY)
const { StatusCodes } = require('http-status-codes')

const stripeController = async (req, res) => {
  const { amount, id } = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount : 10000,
      currency: 'usd',
      payment_method: id, 
      confirm: true
     
    })
    console.log("Payment", payment)
    res.status(StatusCodes.OK).json({ message: 'Payment successful', success: true})
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }  
}


module.exports = stripeController