/* global exponea_token, exponea_auth */

const express = require('express')
const routes = express.Router()
var cors = require('cors')
routes.use(cors())

// get properties and consent for a customer account
routes.post('/get', (req, res, next) => {
  if (req.body.email) {
    console.log(req.body.email,'- in exponea/get: body is ',req.body);
  }
  const data = req.body;

  const exponea = require('./attributes.js');
  const response = exponea.get(data, res);
  response.then((response) => {
    if (data.email) {
      console.log(data.email,'- exponea/get response',response)
    }
    // end_response = create_response;
    return res.status(200).json({
      response
    })
  })
});

// set properties and consent for a customer account
routes.post('/set', (req, res, next) => {
  if (req.body.email) {
    console.log(req.body.email,'- in exponea/set: body is ',req.body);
  }
  const data = req.body;

  const exponea = require('./attributes.js');
  const response = exponea.set(data, res);
  response.then((response) => {
    if (data.email) {
      console.log(data.email,'- exponea/set response',response)
    }
    return res.status(200).json({
      response
    })
  })
});

// get properties for a customer account in a streamlined structure
routes.post('/properties', (req, res, next) => {
  if (req.body.email) {
    console.log(req.body.email,'- in exponea/properties: body is ',req.body);
  }
  const data = req.body;

  const exponea = require('./attributes.js');
  const properties = exponea.properties(data, res);
  properties.then((properties) => {
    if (data.email) {
      console.log(data.email,'- exponea/properties response',properties)
    }
    // end_response = create_response;
    return res.status(200).json({
      properties
    })
  })
});

// get all available consents for a customer account in a streamlined structure
routes.post('/consents', (req, res, next) => {
  if (req.body.email) {
    console.log(req.body.email,'- in exponea/consents: body is ',req.body);
  }
  const data = req.body;

  const exponea = require('./attributes.js');
  const consents = exponea.consents(data, res);
  consents.then((consents) => {
    if (data.email) {
      console.log(data.email,'- exponea/consents response',consents)
    }
    // end_response = create_response;
    return res.status(200).json({
      consents
    })
  })
});


// retrieve the last instance of a particular event in a customer's timeline
routes.post('/event', (req, res, next) => {
  if (req.body.email) {
    console.log(req.body.email,'- in exponea/event: body is ',req.body);
  }
  const data = req.body;

  const exponea = require('./events.js');
  const response = exponea.event(data, res);
  response.then((response) => {
    if (data.email) {
      console.log(data.email,'- exponea/event response',response)
    }
    // end_response = create_response;
    return res.status(200).json({
      response
    })
  })
})

// track events for a customer account
routes.post('/track', (req, res, next) => {
  if (req.body.email) {
    console.log(req.body.email, '- in exponea/track: body is ', req.body);
  }
  const data = req.body;

  // Include credentials in the call to exponea.track
  const exponea = require('./events.js');
 //  const credentials = req.credentials; // This assumes your middleware correctly attached credentials to req
  const response = exponea.track(data, res); // Pass credentials as an argument
  response.then(response => {
    if (data.email) {
      console.log(data.email, '- exponea/track response', response);
    }
    return res.status(200).json({ response });
  }).catch(err => {
    console.error("Failed to process track event:", err);
    res.status(500).send("Internal Server Error");
  });
});

// retrieve product recommendations for a customer
routes.post('/recommendations', (req, res, next) => {
  try {
    console.log(req.body.email,'- in exponea/attributes',req.body);

    const data = req.body;

    const exponea = require('./recommendations.js');
    const recommendations = exponea.get(data, res);
    recommendations.then((recommendations) => {
      if (data.email) {
        console.log(data.email,'- exponea/recommendations response',recommendations)
      }
      // end_response = create_response;
      return res.status(200).json({
        recommendations
      })
    })
    
  } catch (err) {
    console.log('Something went wrong in exponea/recommendations endpoint',err)
    res.status(500).send('Something went wrong in  exponea/recommendations endpoint')
  }
});

/** ==================================== */


// gets all attributes for a customer DEPRECATED
routes.post('/attributes', async (req, res, next) => {
  try {
    // console.log(req.body.email,'- in exponea/attributes',req.body);

    const data = req.body;

    const exponea = require('./attributes.js');
    const response = await exponea.get(data, res);
    // console.log(data.email,'- /attributes response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    // console.log(req.body.email,'- Something went wrong in exponea/attributes endpoint',err)
    console.log('Something went wrong in exponea/attributes endpoint',err)
    res.status(500).send('Something went wrong in  exponea/attributes endpoint')
  }
});

routes.post('/set-attributes', (req, res, next) => {
  try {
    console.log(req.body.email,'- in exponea/set-attributes',req.body);

    const data = req.body;

    const exponea = require('./attributes.js');
    const response = exponea.post(data, res);
    // console.log(data.email,'- /set-attributes response',response);

    response.then((response) => {
      console.log(data.email,'- exponea/set-attributes response', response);
      return res.status(200).json({
        response
      })
    })
    
  } catch (err) {
    // console.log(req.body.email,'- Something went wrong in exponea/set-attributes endpoint',err)
    console.log('Something went wrong in exponea/set-attributes endpoint',err)
    res.status(500).send('Something went wrong in  exponea/set-attributes endpoint')
  }
});


routes.post('/news_and_offers', async (req, res, next) => {
  try {
    // console.log(req.body.email,'- in exponea/news_and_offers',req.body);

    const data = req.body;

    const exponea = require('./news_and_offers.js');
    const response = await exponea.attributes(data, res);
    // console.log(data.email,'- /news_and_offers response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    console.log(req.body.email,'- Something went wrong in exponea/news_and_offers endpoint',err)
    res.status(500).send('Something went wrong in  exponea/news_and_offers endpoint')
  }
});

routes.post('/sms_marketing', async (req, res, next) => {
  try {
    // console.log(req.body.email,'- in exponea/sms_marketing',req.body);

    const data = req.body;

    const exponea = require('./sms_marketing.js');
    const response = await exponea.attributes(data, res);
    // console.log(data.email,'- /sms_marketing response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    console.log(req.body.email,'- Something went wrong in exponea/sms_marketing endpoint',err)
    res.status(500).send('Something went wrong in  exponea/sms_marketings endpoint')
  }
});

// get user email with cookie
routes.post('/find_email', async (req, res, next) => {
  try {
    // console.log(req.body.email,'- in exponea/attributes',req.body);

    const data = req.body;

    const exponea = require('./cookie.js');
    const response = await exponea.attributes(data, res);
    // console.log(data.email,'- /attributes response',response);

    return res.status(200).json({
      response
    });
    
  } catch (err) {
    // console.log(req.body.email,'- Something went wrong in exponea/attributes endpoint',err)
    console.log('Something went wrong in exponea/attributes endpoint',err)
    res.status(500).send('Something went wrong in  exponea/attributes endpoint')
  }
});

// track 


// get properties and consent for a customer account using registered 
routes.post('/registered', (req, res, next) => {
  if (req.body.email) {
    console.log(req.body.email,'- in exponea/registered: body is ',req.body);
  }
  const data = req.body;

  const exponea = require('./attributes.js');
  const response = exponea.registered(data, res);
  response.then((response) => {
    if (data.email) {
      console.log(data.email,'- exponea/registered response',response)
    }
    return res.status(200).json({
      response
    })
  })
});

module.exports = routes;