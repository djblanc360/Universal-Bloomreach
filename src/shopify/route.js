/* global shopify_token, shopify_auth, shopify_url, shopify_rest */

const serverless = require('serverless-http');
const express = require('express');

const routes = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var cors = require('cors');
routes.use(cors());

routes.post('/email', (req, res, next) => {
  try {
    console.log(req.body.email,'- in shopify/get',req.body)

    const data = req.body

    const shopify = require('./get.js')
    const response = shopify.email(data, res)
    response.then((response) => {
      if (data.email) {
        console.log(data.email,'- shopify/get response',response)
      }
      // end_response = create_response;
      return res.status(200).json({
        response
      })
    })
    
  } catch (err) {
    console.log('Something went wrong in shopify/get endpoint',err)
    res.status(500).send('Something went wrong in shopify/get endpoint')
  }
})


routes.post('/phone', (req, res, next) => {
  try {
    const data = req.body

    const shopify = require('./get.js')
    const response = shopify.phone(data, res)
    response.then((response) => {
      if (data.phone) {
        console.log(data.phone,'- shopify/get response',response)
      }
      // end_response = create_response;
      return res.status(200).json({
        response
      })
    })

    
  } catch (err) {
    console.log(req.body.phone,'- Something went wrong in shopify/get endpoint',err)
    res.status(500).send('Something went wrong in shopify/get endpoint')
  }
})

routes.post('/update', (req, res, next) => {
  try {
    if (req.body.email) {
      console.log(req.body.email,'- in shopify/update',req.body)
    }

    const data = req.body

    const shopify = require('./update.js')
    const response = shopify.update(data, res)
    response.then((response) => {
      if (data.email) {
        console.log(data.email,'- shopify/update response',response)
      }
      // end_response = create_response;
      return res.status(200).json({
        response
      })
    })
  } catch (err) {
    if (req.body.email) {
      console.log(req.body.email,'- Something went wrong in shopify/update endpoint',err)
    }
    res.status(500).send('Something went wrong in shopify/update endpoint')
  }
})

routes.post('/consent_email', (req, res, next) => {
  try {
    console.log(req.body.email,'- in shopify/consent_email',req.body)

    const data = req.body

    const shopify = require('./get.js')
    const email = shopify.email(data, res)
    email.then((email) => {
      if(!email) {
        const response = 'customer does not exist'
        if (data.email) {
          console.log(data.email,'- shopify/consent_email: customer does not exist',response)
        }
        return res.status(200).json({
          response
        })
      } else {
        if (data.email) {
          console.log(data.email,'- shopify/consent_email: customer does not exist',response)
        }
        const consent_update = require('./consent_update.js')

        const id = email.data.customers.edges[0].node.id // retrieves the first customer in list
  
        const response = consent_update.email(customer, id, res)
        response.then((response) => {
          if (data.email) {
            console.log(data.email,'- shopify/consent_email response',response)
          }
          return res.status(200).json({
            response
          });
        })
      }
    })


    
  } catch (err) {
    console.log(req.body.email,'- Something went wrong in shopify/consent_email endpoint',err)
    res.status(500).send('Something went wrong in shopify/consent_email endpoint')
  }
})

routes.post('/consent_phone', (req, res, next) => {
  try {


    // console.log(req.body.email,'- shopify POST profile: body is ',req.body);

    const data = req.body

    const shopify = require('./get.js');
    const phone = shopify.phone(data, res);
    if(phone === null) {
      const response = 'customer does not exist';
      return res.status(200).json({
        response
      });
    } else {
      let consent_update = require('./consent_update.js');

      const id = phone.data.customers.edges[0].node.id; // retrieves the first customer in list

      const response = consent_update.phone(customer, id, res);
      // console.log(customer.email,'- shopify/get response',response);
      return res.status(200).json({
        response
      });
    }

    
  } catch (err) {
    console.log(req.body.email,'- Something went wrong in shopify/consent_phone endpoint',err)
    res.status(500).send('Something went wrong in shopify/consent_phone endpoint')
  }
})

// merge accounts with the same phone
routes.post('/merge_phone', (req, res, next) => {
  try {
    console.log(req.body.phone,'- in shopify/get',req.body)

    const data = req.body
    const shopify = require('./get.js')
    const phoneList = shopify.phone(data, res)
    // console.log(customer.email,'- shopify/get response',response);
    phoneList.then((phoneList) => {
      if (phoneList) {
        if (data.phone) {
          console.log(data.phone,'- shopify/merge_phone response',response)
        }
        const format = require('../reformatter.js')
        const list = format.shopify(phoneList)
  
        // const hierarchy = require('../hierarchy.js');
        return res.status(200).json({
          list
        });
      } else {
        const response = 'no account with this phone number'
        return res.status(200).json({
          response
        })
      }
    })

    // return res.status(200).json({
    //     response
    // });

    
  } catch (err) {
    console.log(req.body.phone,'- Something went wrong in shopify/merge_phone endpoint',err)
    res.status(500).send('Something went wrong in shopify/merge_phone endpoint')
  }
})


module.exports = routes;