import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'

import videoRoutes from'./routes/videos.routes'

const app = express()

app.set('port', config.MONGO_PORT)

app.use(morgan('dev'))
app.use(cors());
app.use(express.json())// para que entienda los json que les llegan
app.use(express.urlencoded({extended:false}))

app.use(videoRoutes)

export default app;