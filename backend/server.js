require('dotenv').config()
require('express-async-errors')

const express = require('express')

const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./db/connect')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const orderRouter = require('./routes/orderRoutes')
const paymentRouter = require('./routes/paymentRoutes')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

const app = express()

const port = process.env.PORT || 5000

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'))
app.use(fileUpload())

app.use('/goodtime', (req, res) => {
  res.status(200)
})
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/products', productRouter)
app.use('/reviews', reviewRouter)
app.use('/orders', orderRouter)
app.use('/payment', paymentRouter)

app.get('/test', (req, res) => {
  throw new Error("broken route")
}
)

app.get('/', (req, res, next) => {
  require('fs').readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`app is listening at port ${ port }. horay!`)
    })
    await connectDB(process.env.MONGODB_URL)
      .then(_ => console.log('DB connected!'))
      .catch(error => console.log('DB Error : ', error))
  } catch (error) {
    console.log('Error starting server: ', error)
  }
}

start()
