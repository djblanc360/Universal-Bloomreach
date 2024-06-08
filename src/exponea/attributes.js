/* global exponea_token, exponea_auth */
const util = require('util') // to inspect objects in console log

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    get: async function (customer, res) {
        try {
            var body = {
                'customer_ids': {},
                'attributes': [
                    {
                        'type': 'id',
                        'id': 'registered'
                    },
                    {
                        'type': 'id',
                        'id': 'cookie'
                    }  
                ]
            }

            // IF COOKIE IS NOT PART OF PAYLOAD
            if(customer.cookie !== undefined) {
                body.customer_ids.cookie = customer.cookie
            } else {
                let userid = {
                    'type': 'id',
                    'id':'cookie'

                }

                let attr = body.attributes
                attr.push(userid)
            }

            // IF EMAIL IS NOT PART OF PAYLOAD
            if(customer.email !== undefined) {
                body.customer_ids.email_id = customer.email
            } else {
                let userid = {
                    'type': 'id',
                    'id':'email_id'

                }

                let attr = body.attributes
                attr.push(userid)
            }
            // IF PHONE IS NOT PART OF PAYLOAD
            if(customer.phone !== undefined) {
                body.customer_ids.phone_id = customer.phone
            } else {
                let userid = {
                    'type': 'id',
                    'id':'phone_id'

                }

                let attr = body.attributes
                attr.push(userid)
            }

            // CUSTOM PAYLOAD PROPERTIES
            if(customer.hasOwnProperty('properties') && customer.properties) {
                let attr = body.attributes
                customer.properties.forEach(function (property) {
                    let userid = {
                        'type': 'property',
                        'property':property
                    }
                    attr.push(userid)
                })
            } else {
                const all = require('./all.js')
                const properties = await all.properties()
                // console.log('propertyCategories ', propertyCategories)
                let attr = body.attributes
                properties.forEach(function (property) {
                    let userid = {
                        'type': 'property',
                        'property': property
                    }
                    attr.push(userid)
                })
            }
            // END CUSTOM PAYLOAD PROPERTIES

            // CUSTOM PAYLOAD CONSENTS
            if(customer.hasOwnProperty('consents') && customer.consents) {
                let attr = body.attributes
                customer.consents.forEach(function (consent) {
                    let userid = {
                        'type': 'consent',
                        'category':consent,
                        'mode': 'valid'
                    }
                    attr.push(userid)
                })
            } else {
                const all = require('./all.js')
                const consents = await all.consents()
                // console.log('consentCategories ', consentCategories)
                let attr = body.attributes
                consents.forEach(function (consent) {
                    let userid = {
                        'type': 'consent',
                        'category': consent,
                        'mode': 'valid'
                    }
                    attr.push(userid)
                })
            }
            // END CUSTOM PAYLOAD CONSENTS

            customer.email ? 
            console.log(customer.email,'- in customer attributes/get: body is ',body) 
            : console.log('in customer attributes/get: body is ',body)

            // const buf = new Buffer(exponea_auth);
   
            const buff = Buffer.from(exponea_auth)
            const auth = buff.toString('base64')

            const response = await fetch('https://api.exponea.com/data/v2/projects/'+exponea_token+'/customers/attributes', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'accept': 'application/json',
                    'authorization': 'Basic '+ auth,
                    'Content-type': 'application/json'
                }
            })
            let customerAttributesData = await response.json();

            customer.email ? 
            console.log(customer.email,'- success in exponea/get: ',customerAttributesData) 
            : console.log('success in exponea/get: ',customerAttributesData)

            // reformat json
            if(customerAttributesData.errors) {
                let status = {
                    'status': 'error',
                    'message': customerAttributesData.errors
                }
                customerAttributesData = status
            } else {
                const reformat = require('../reformatter.js')
                customerAttributesData = reformat.exponea(body.attributes,customerAttributesData.results)
            }
            

            return customerAttributesData;


          } catch (err) {
            customer.email ? 
            console.log(customer.email,'- Something went wrong in exponea/get: ',err) 
            : console.log('Something went wrong in exponea/get: ',err) 
            let error = {
                'exponea/get error': err
            }
            res.status(500).send(error)
          }
    },
    get_backup: async function (customer, res) {
        try {
            var body = {
                'customer_ids': {},
                'attributes': [
                    {
                        'type': 'id',
                        'id': 'registered'
                    },
                    {
                        'type': 'id',
                        'id': 'cookie'
                    },
                    {
                        'type': 'consent',
                        'category': 'back-in-stock',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'cart-notifications',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'news-and-offers',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'sms-cart-notifications',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'sms-launches',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'sms-stock-notifications',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'sms-surveys',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'surveys',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'text-join',
                        'mode': 'until'
                    },
                    {
                        'type': 'consent',
                        'category': 'loyalty',
                        'mode': 'valid'
                    }   
                ]
            }

            // IF COOKIE IS NOT PART OF PAYLOAD
            if(customer.cookie !== undefined) {
                body.customer_ids.cookie = customer.cookie
            } else {
                let userid = {
                    'type': 'id',
                    'id':'cookie'

                }

                let attr = body.attributes
                attr.push(userid)
            }

            // IF EMAIL IS NOT PART OF PAYLOAD
            if(customer.email !== undefined) {
                body.customer_ids.email_id = customer.email
            } else {
                let userid = {
                    'type': 'id',
                    'id':'email_id'

                }

                let attr = body.attributes
                attr.push(userid)
            }
            // IF PHONE IS NOT PART OF PAYLOAD
            if(customer.phone !== undefined) {
                body.customer_ids.phone_id = customer.phone
            } else {
                let userid = {
                    'type': 'id',
                    'id':'phone_id'

                }

                let attr = body.attributes
                attr.push(userid)
            }

            // CUSTOM PAYLOAD PROPERTIES
            if(customer.properties !== undefined) {

                let attr = body.attributes
                customer.properties.forEach(function (property) {
                    let userid = {
                        'type': 'property',
                        'property':property
                    }
                    attr.push(userid)
                })
            }
            // END CUSTOM PAYLOAD PROPERTIES

            // CUSTOM PAYLOAD CONSENTS
            if(customer.consents !== undefined) {

                let attr = body.attributes
                customer.properties.forEach(function (property) {
                    let userid = {
                        'type': 'consent',
                        'property':property
                    }
                    attr.push(userid)
                })
            }
            // END CUSTOM PAYLOAD CONSENTS

            customer.email ? 
            console.log(customer.email,'- in customer attributes/get_backup: body is ',body) 
            : console.log('in customer attributes/get_backup: body is ',body)

            // const buf = new Buffer(exponea_auth);
   
            const buff = Buffer.from(exponea_auth)
            const auth = buff.toString('base64');

            const response = await fetch('https://api.exponea.com/data/v2/projects/'+exponea_token+'/customers/attributes', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'accept': 'application/json',
                    'authorization': 'Basic '+ auth,
                    'Content-type': 'application/json'
                }
            });
            let customerAttributesData = await response.json()

            customer.email ? 
            console.log(customer.email,'- Something went wrong in exponea/get: ',customerAttributesData) 
            : console.log('Something went wrong in exponea/get: ',customerAttributesData)

            // reformat json
            if(customerAttributesData.error === undefined) {
                const reformat = require('../reformatter.js')
                customerAttributesData = reformat.exponea(body.attributes,customerAttributesData.results)
            }
            

            return customerAttributesData;


          } catch (err) {
            customer.email ? 
            console.log(customer.email,'- Something went wrong in exponea/get: ',err) 
            : console.log('Something went wrong in exponea/get: ',err) 
            res.status(500).send('Something went wrong in exponea/attributes')
          }
    },
    set: async function (customer, res) {
        try {
            // TRACK TIMESTAMP
            const timestamp = Math.floor(Date.now() / 1000)
            // 'update_timestamp': 1614941503
            // END TRACK TIMESTAMP

            let payload = {
                'customer_ids': {},
                'update_timestamp': timestamp
            }
            let batch = {
                'commands': []
            }
            let hardId = {}
            if ( customer.hasOwnProperty('email') && customer.email) {
                hardId = {'email_id': customer.email}
            } else if ( customer.hasOwnProperty('phone') && customer.phone) {
                hardId = {'phone_id': customer.phone}
            } else if ( customer.hasOwnProperty('cookie') && customer.cookie) {
                hardId = {'registered': customer.cookie}
            } 

            if(customer.hasOwnProperty('properties') && customer.properties) {

                batch.commands.push({
                    'name': 'customers',
                    'data': {
                        'customer_ids': hardId,
                        'properties': customer.properties
                    }
                })
            }

            if(customer.hasOwnProperty('consents') && customer.consents) {
                Object.entries(customer.consents).forEach(([key, value]) => {
                    batch.commands.push({
                        'name': 'customers/events',
                        'data': {
                            'customer_ids': hardId,
                            'event_type': 'consent',
                            'timestamp': timestamp,
                            'properties': {
                                'action': value ? 'accept' : 'reject',
                                'category': key,
                                'source': customer.source,
                                'valid_until': 'unlimited',
                            }
                        }
                    })
                })
            }
            // customer.email ? 
            // console.log(customer.email,' - in exponea/set: payload is ',payload) 
            // : console.log('in exponea/set: payload is ',payload)

            customer.email ? 
            console.log(customer.email,' - in exponea/set: batch is ',util.inspect(batch, { showHidden: false, depth: null })) 
            : console.log('in exponea/set: batch is ',util.inspect(batch, { showHidden: false, depth: null })) 
   
            const buff = Buffer.from(exponea_auth)
            const auth = buff.toString('base64')

            const response = await fetch('https://api.exponea.com/track/v2/projects/'+exponea_token+'/batch', {
                method: 'post',
                body: JSON.stringify(batch),
                headers: {
                    'authorization': 'Basic '+ auth,
                    'Content-type': 'application/json'
                }
            });

            const data = await response.json()
            // console.log(customer.email,'- success in exponea/attributes.js',customerAttributesData);
            customer.email ? 
            console.log(customer.email,' - in exponea/set: data is ',data) 
            : console.log('in exponea/set: data is ',data)

            // reformat json
            /*
            if(data.error === undefined) {
                const reformat = require('../reformatter.js')
                data = reformat.exponea(body.attributes,data.results)
            }
            */
            return data


          } catch (err) {
            customer.email ? 
            console.log(customer.email,'- Something went wrong in exponea/attributes set: ',err) 
            : console.log('Something went wrong in exponea/attributes set: ',err)
            res.status(500).send('Something went wrong in exponea/attributes')
          }
    },
    properties: async function (customer, res) {
        try {
            var body = {
                'customer_ids': {},
                'attributes': [
                    {
                        'type': 'id',
                        'id': 'registered'
                    },
                    {
                        'type': 'id',
                        'id': 'cookie'
                    }  
                ]
            }

            // IF COOKIE IS NOT PART OF PAYLOAD
            if(customer.cookie !== undefined) {
                body.customer_ids.cookie = customer.cookie
            } else {
                let userid = {
                    'type': 'id',
                    'id':'cookie'

                }

                let attr = body.attributes
                attr.push(userid)
            }

            // IF EMAIL IS NOT PART OF PAYLOAD
            if(customer.email !== undefined) {
                body.customer_ids.email_id = customer.email
            } else {
                let userid = {
                    'type': 'id',
                    'id':'email_id'

                }

                let attr = body.attributes
                attr.push(userid)
            }
            // IF PHONE IS NOT PART OF PAYLOAD
            if(customer.phone !== undefined) {
                body.customer_ids.phone_id = customer.phone
            } else {
                let userid = {
                    'type': 'id',
                    'id':'phone_id'

                }

                let attr = body.attributes
                attr.push(userid)
            }

            // CUSTOM PAYLOAD PROPERTIES
            if(customer.properties !== undefined) {
                let attr = body.attributes
                customer.properties.forEach(function (property) {
                    let userid = {
                        'type': 'property',
                        'property':property
                    }
                    attr.push(userid)
                })
            }
            // END CUSTOM PAYLOAD PROPERTIES

            customer.email ? 
            console.log(customer.email,'- in customer attributes: body is ',body) 
            : console.log('in customer attributes: body is ',body)

            // const buf = new Buffer(exponea_auth);
   
            const buff = Buffer.from(exponea_auth)
            const auth = buff.toString('base64');

            const response = await fetch('https://api.exponea.com/data/v2/projects/'+exponea_token+'/customers/attributes', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'accept': 'application/json',
                    'authorization': 'Basic '+ auth,
                    'Content-type': 'application/json'
                }
            });
            let customerAttributesData = await response.json();
            console.log('customer.email,'- 'success in exponea/properties',customerAttributesData);

            // reformat json
            if(customerAttributesData.error === undefined) {
                const reformat = require('../reformatter.js')
                customerAttributesData = reformat.exponea(body.attributes,customerAttributesData.results)
                customerAttributesData = customerAttributesData[2].properties
            }
            return customerAttributesData;

          } catch (err) {
            customer.email ? 
            console.log(customer.email,'- Something went wrong in exponea/properties: ',err) 
            : console.log('Something went wrong in exponea/properties: ',err)
            res.status(500).send('Something went wrong in exponea/properties')
          }
    },
    consents: async function (customer, res) {
        try {
            var body = {
                'customer_ids': {},
                'attributes': [
                    {
                        'type': 'id',
                        'id': 'registered'
                    },
                    {
                        'type': 'id',
                        'id': 'cookie'
                    },
                    {
                        'type': 'consent',
                        'category': 'back-in-stock',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'cart-notifications',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'news-and-offers',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'sms-cart-notifications',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'sms-launches',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'sms-stock-notifications',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'sms-surveys',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'surveys',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'text-join',
                        'mode': 'valid'
                    },
                    {
                        'type': 'consent',
                        'category': 'loyalty',
                        'mode': 'valid'
                    }   
                ]
            }

            // IF COOKIE IS NOT PART OF PAYLOAD
            if(customer.cookie !== undefined) {
                body.customer_ids.cookie = customer.cookie
            } else {
                let userid = {
                    'type': 'id',
                    'id':'cookie'

                }

                let attr = body.attributes
                attr.push(userid)
            }

            // IF EMAIL IS NOT PART OF PAYLOAD
            if(customer.email !== undefined) {
                body.customer_ids.email_id = customer.email
            } else {
                let userid = {
                    'type': 'id',
                    'id':'email_id'

                }

                let attr = body.attributes
                attr.push(userid)
            }
            // IF PHONE IS NOT PART OF PAYLOAD
            if(customer.phone !== undefined) {
                body.customer_ids.phone_id = customer.phone
            } else {
                let userid = {
                    'type': 'id',
                    'id':'phone_id'

                }

                let attr = body.attributes
                attr.push(userid)
            }

            // CUSTOM PAYLOAD CONSENTS
            if(customer.consents !== undefined) {
                let attr = body.attributes
                customer.consents.forEach(function (consent) {
                    // if consent does not already exist in attributes[]
                    if (attr.indexOf(consent) === -1) {
                        let userid = {
                            'type': 'consent',
                            'category':consent,
                            'mode': 'valid'
                        }
                        attr.push(userid)
                    }
                })
            }
            // END CUSTOM PAYLOAD CONSENTS

            customer.email ? 
            console.log(customer.email,'- in customer attributes: body is ',body) 
            : console.log('in customer attributes: body is ',body)

            // const buf = new Buffer(exponea_auth);
   
            const buff = Buffer.from(exponea_auth)
            const auth = buff.toString('base64');

            const response = await fetch('https://api.exponea.com/data/v2/projects/'+exponea_token+'/customers/attributes', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'accept': 'application/json',
                    'authorization': 'Basic '+ auth,
                    'Content-type': 'application/json'
                }
            });
            let customerAttributesData = await response.json();
            console.log('customer.email,'- 'success in exponea/consents',customerAttributesData);

            // reformat json
            if(customerAttributesData.error === undefined) {
                const reformat = require('../reformatter.js')
                customerAttributesData = reformat.exponea(body.attributes,customerAttributesData.results)
                customerAttributesData = customerAttributesData[1].consents
            }
            return customerAttributesData;

          } catch (err) {
            customer.email ? 
            console.log(customer.email,'- Something went wrong in exponea/consents: ',err) 
            : console.log('Something went wrong in exponea/consents: ',err)
            res.status(500).send('Something went wrong in exponea/consents')
          }
    },
    registered: async function (customer, res) {
        try {
            var body = {
                'customer_ids': {},
                'attributes': []
            }

            if(customer.registered !== undefined) {
                body.customer_ids.registered = customer.registered
            }


            // CUSTOM PAYLOAD PROPERTIES
            if(customer.hasOwnProperty('properties') && customer.properties) {
                let attr = body.attributes
                customer.properties.forEach(function (property) {
                    let userid = {
                        'type': 'property',
                        'property':property
                    }
                    attr.push(userid)
                })
            } else {
                const all = require('./all.js')
                const properties = await all.properties()
                // console.log('propertyCategories ', propertyCategories)
                let attr = body.attributes
                properties.forEach(function (property) {
                    let userid = {
                        'type': 'property',
                        'property': property
                    }
                    attr.push(userid)
                })
            }
            // END CUSTOM PAYLOAD PROPERTIES

            // CUSTOM PAYLOAD CONSENTS
            if(customer.hasOwnProperty('consents') && customer.consents) {
                let attr = body.attributes
                customer.consents.forEach(function (consent) {
                    let userid = {
                        'type': 'consent',
                        'category':consent,
                        'mode': 'valid'
                    }
                    attr.push(userid)
                })
            } else {
                const all = require('./all.js')
                const consents = await all.consents()
                // console.log('consentCategories ', consentCategories)
                let attr = body.attributes
                consents.forEach(function (consent) {
                    let userid = {
                        'type': 'consent',
                        'category': consent,
                        'mode': 'valid'
                    }
                    attr.push(userid)
                })
            }
            // END CUSTOM PAYLOAD CONSENTS

            customer.email ? 
            console.log(customer.email,'- in customer attributes/get: body is ',body) 
            : console.log('in customer attributes/get: body is ',body)

            // const buf = new Buffer(exponea_auth);
   
            const buff = Buffer.from(exponea_auth)
            const auth = buff.toString('base64')

            const response = await fetch('https://api.exponea.com/data/v2/projects/'+exponea_token+'/customers/attributes', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'accept': 'application/json',
                    'authorization': 'Basic '+ auth,
                    'Content-type': 'application/json'
                }
            })
            let customerAttributesData = await response.json();

            customer.email ? 
            console.log(customer.email,'- success in exponea/get: ',customerAttributesData) 
            : console.log('success in exponea/get: ',customerAttributesData)

            // reformat json
            if(customerAttributesData.errors) {
                let status = {
                    'status': 'error',
                    'message': customerAttributesData.errors
                }
                customerAttributesData = status
            } else {
                const reformat = require('../reformatter.js')
                customerAttributesData = reformat.exponea(body.attributes,customerAttributesData.results)
            }

            return customerAttributesData

          } catch (err) {

            customer.email ? 
            console.log(customer.email,'- Something went wrong in exponea/get: ',err) 
            : console.log('Something went wrong in exponea/get: ',err) 
            let error = {
                'exponea/get error': err
            }
            res.status(500).send(error)
          }
    },
}



