import express from 'express'
import { createUser } from './routes/User/createUser'
import { createProduct } from './routes/Product/createProduct';
import { getProducts } from './routes/Product/getProducts';
import { createReview } from './routes/Review/createReview';
import { getAllReviews } from './routes/Review/getAllReviews';
import { getUser } from './routes/User/getUser';
import cors from 'cors'
const bodyParserErrorHandler = require('express-body-parser-error-handler')

const app = express()
const port = process.env.PORT || 3001
const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000', 'http://127.0.0.1:3001'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
// app.use(bodyParserErrorHandler());
app.use(cors(options));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})

// user routes
app.post('/user/create', createUser)
app.post('/user/get', getUser)

// product routes
app.post('/product/create', createProduct)
app.post('/product/get', getProducts)

// review routes
app.post('/review/create', createReview)
app.post('/review/getAll', getAllReviews)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})