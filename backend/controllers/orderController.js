const Order = require('../model/Order')
const Product = require('../model/Product')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')

const faskeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'someValue'
  return { client_secret, amount }
}

const createOrder = async (req, res) => {

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret })

}

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
  res.status(StatusCodes.OK).send({ orders, count: orders.length })
}

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params
  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id: ${ orderId }`)
  }
  checkPermissions(req.user, order.user)
  res.status(StatusCodes.OK).json({ order })

}

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId })
  res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params
  const { paymentIntentId } = req.body

  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id: ${ orderId }`)
  }
  checkPermissions(req.user, order.user)

  order.paymentIntentId = paymentIntentId
  order.status = 'paid'
  await order.save()

  res.status(StatusCodes.OK).json({ order })
}

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder
}