const express = require('express')
const app = express()
const path = require('path');
const createError = require('http-errors')
const logger = require('morgan');
const helmet = require('helmet')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerDOC = require('./swagger.json')
const { AuthUser, ErrorHandler } = require('./middlewares')
const { Connection } = require('./models')

const { PostRouter, CommentRouter, UserRouter, SecurityRouter, ProfileRouter, FeedRouter } = require('./routes');
const pubsub = require('./pubsub');
const bodyParser = require('body-parser');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDOC))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(logger('dev'))
/* app.use(express.json()) */
/* app.use(helmet()) */ //Front in React remove comment

app.use((req, res, next) =>
  Connection.then(() => next()).catch((err) => next(err))
)

app.use(express.static(path.join(__dirname, 'public')))

app.use(pubsub.pub)

PostRouter.use('/', AuthUser, CommentRouter)
app.use('/v1/feed', AuthUser, FeedRouter)
app.use('/v1/users', AuthUser, UserRouter)
app.use('/v1/posts', AuthUser, PostRouter)
app.use('/v1/profiles', AuthUser, ProfileRouter)
app.use('/v1/security', SecurityRouter)

app.get('/v1/seed', (req, res) => {
  require('./seed')
})

app.use('/favicon.ico', (req, res) => { res.end() })

app.use(function (req, res, next) {
    const err = createError(404)
    next(err)
})

app.use(ErrorHandler) 

module.exports = app