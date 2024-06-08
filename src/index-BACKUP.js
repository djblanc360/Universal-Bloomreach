const express = require("express")
const cors = require('cors')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

/** bloomreach  */
const exponeaRoutes = require('./exponea/route')
/** shopify  */
const shopifyRoutes = require('./shopify/route')

/** webhooks  */

/** get store-specific API credentials  */
/** exponea  */
app.use(function (req, res, next) {
    // if (req.body.email) {
    //     console.log(req.body.email,'- in exponea credentials')
    // }
    const credentials = require('./credentials.js')
    let exponea = credentials.exponea_authenticate(req, res, next)
    
    const exponea_token = exponea.token
    const exponea_auth = exponea.auth
    console.log('exponea_token in index.js: ' + exponea_token) // this returns the correct token
    console.log('exponea_auth in index.js: ' + exponea_auth) // this returns the correct auth
    // app.locals.api_key = key
    global.exponea_token = exponea_token
    global.exponea_auth = exponea_auth
    next()
})
/** shopify  */
app.use(function (req, res, next) {
    // if (req.body.email) {
    //     console.log(req.body.email,'- in shopify credentials')
    // }
    const credentials = require('./credentials.js')
    let shopify = credentials.shopify_authenticate(req, res, next)
    // console.log('shopify: ' + shopify)
    const shopify_token = shopify.token
    const shopify_auth = shopify.auth
    const shopify_url = shopify.url
    const shopify_rest = shopify.rest
    // console.log('shopify_token: ' + shopify_token)
    // console.log('shopify_auth: ' + shopify_auth)
    // console.log('shopify_url: ' + shopify_url)
    // console.log('shopify_rest: ' + shopify_rest)
    // app.locals.api_key = key
    global.shopify_token = shopify_token
    global.shopify_auth = shopify_auth
    global.shopify_url = shopify_url
    global.shopify_rest = shopify_rest
    next()
})

app.use('/exponea', exponeaRoutes)
app.use('/shopify', shopifyRoutes)

app.use(function (err, req, res, next) {
    console.log(req.body.email,'- in error handling')
    console.error('err stack',err.stack) // Logs error stack trace to the console.
    res.status(500).send('Internal Server Error in index.js')
})

module.exports = app