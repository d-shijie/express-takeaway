const jwt = require('jsonwebtoken')
const { WHITE_LIST, JWT_KEY } = require('../config/jwt')
const tokens = require('../config/token')
const authenticateJWT = (req, res, next) => {
  const tokenArr = Object.values(tokens)
  const token = req.headers.authorization || req.headers.Authorization
  if (WHITE_LIST.includes(req.originalUrl.split('?')[0])) {
    next()
  } else {
    if (!token) {
      res.status(403).send()
      return
    }
    if (!tokenArr.includes(token)) {
      res.status(403).send({
        message: '无权限'
      })
      return
    }
    jwt.verify(token, JWT_KEY, (err, data) => {
      if (err) {
        res.status(403).send()
        return
      }
      next()
    })
  }
}
module.exports = authenticateJWT