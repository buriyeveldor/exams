const authRoute = require('./auth-route')
const clientRoute = require('./client-route')
const dicRoute = require('./dic-route')
const dicuserRoute = require('./dicuser-route')
const vdicuserRoute = require('./vdicuser-route')

module.exports = [
    authRoute,
    clientRoute,
    dicRoute,
    dicuserRoute,
    vdicuserRoute
]
