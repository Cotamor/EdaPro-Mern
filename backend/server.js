import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import orderRoute from './routes/orderRoute.js'
import uploadRoute from './routes/uploadRoute.js'
// import morgan from 'morgan'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

const port = process.env.PORT || 5000
const db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(`Error: ${err.message}`)
    process.exit(1)
  }
}
const app = express()

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true)
//   next()
// })

// app.use(
//   cors({
//     origin: [
//       'http://localhost:5000',
//       'https://edapro.onrender.com',
//       'https://edasaki.net',
//     ],
//     credentials: true,
//   })
// )

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use(morgan('dev'))

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/upload', uploadRoute)

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// TODO: not sure what the code below means... need to check on the internet later..
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.use((req, res, next) => {
  const err = new Error(`Not found - ${req.originalUrl}`)
  err.status = 404
  next(err)
})

app.use(notFound)
app.use(errorHandler)

app.listen(port, async () => {
  await db()
  console.log(`server is running on port ${port}`)
})
