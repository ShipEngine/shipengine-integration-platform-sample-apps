import express from 'express'

import {authRouter} from './routers/auth'
import {carrierRouter} from './routers/carrier'
import {orderRouter} from './routers/order'

const app = express().use(express.json())

app.use('/auth', authRouter)
app.use('/carrier', carrierRouter)
app.use('/order', orderRouter)

const port = process.env.PORT ? process.env.PORT : 9999

app.listen(port)

console.log(`Application started on port: ${port}.`)