const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path');
const createError = require('http-errors')
const helmet = require('helmet')
const cors = require('cors')
const { Connection } = require('./models')

const {
    PostRouter,
    CommentRouter,
    UserRouter,
    SecurityRouter,
    ProfileRouter,
    FeedRouter
  } = require('./routes')

/* const defaultOptions = require('./swagger.json'); //swagger
const options = Object,assign(defaultOptions, {basedir: __dirname}) //swagger */


/* const expressSwagger = esg(app);
expressSwagger(opitions); */

app.use((req, res, next) =>
  Connection.then(() => next()).catch((err) => next(err))
)

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

// create connection with mongo
app.use((req, res, next) =>
  Connection.then(() => next()).catch((err) => next(err))
)

app.use('/v1/users', UserRouter)

app.use(function (req, res, next) {
    const err = createError(404)
    next(err)
})

module.exports = app