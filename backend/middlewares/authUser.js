const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const JWT_PASS = process.env.JWT_PASS || 'acessq1w2e3r4password'
const { User } = require('../models')

module.exports = (req, res, next) => {

	if (!req.headers.authorization) { return next(createError(401))	}

	const token = req.headers.authorization.split(' ')[1]

	return jwt.verify(token, JWT_PASS, (err, decoded) => {

		if (err) { return next(createError(403)) }

		const username = decoded.username
		
		return User.findOne({ username: username }, (userErr, user) => {

			if (userErr) { return next(createError(500))}

			if (!user) { return next(createError(401))}

			User.findOne(user).populate('profile')
			  .then(u => {
				req.user = u
				next()
			  })
			/* return next() */
		})
	})
}


