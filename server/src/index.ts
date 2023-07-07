import express from 'express'
import { createUser } from './routes/User/createUser'

const app = express()
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})

app.get('/user/create', createUser)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})