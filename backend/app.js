const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path');
const createError = require('http-errors')
const helmet = require('helmet')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerDOC = require('./swagger.json')
const { AuthUser, ErrorHandler } = require('./middlewares')
const { Connection } = require('./models')

const { PostRouter, CommentRouter, UserRouter, SecurityRouter, ProfileRouter, FeedRouter } = require('./routes');

app.use((req, res, next) =>
  Connection.then(() => next()).catch((err) => next(err))
)

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDOC))

app.use((req, res, next) =>
  Connection.then(() => next()).catch((err) => next(err))
)

PostRouter.use('/', AuthUser, CommentRouter)
app.use('/v1/security', SecurityRouter)
app.use('/v1/feed', AuthUser, FeedRouter)
app.use('/v1/users', AuthUser, UserRouter)
app.use('/v1/posts', AuthUser, PostRouter)
app.use('/v1/profiles', AuthUser, ProfileRouter)

app.use(function (req, res, next) {
    const err = createError(404)
    next(err)
})

app.use(ErrorHandler)

module.exports = app