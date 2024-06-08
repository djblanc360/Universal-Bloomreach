/* global exponea_token, exponea_auth */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    attributes: async function (customer, res) {
        try {
            // console.log(customer.email,'- in customer attributes');
            // "birth_date":customer.birth_date
        
            // var body = {
            //     "customer_ids": {
            //         "email_id": customer.email,
            //     },

            var body = {
                "customer_ids": {},
                "attributes": [
                    {
                        "type": "property",
                        "property": "first_name"
                    },
                    {
                        "type": "property",
                        "property": "last_name"
                    },
                    {
                        "type": "id",
                        "id": "registered"
                    },
                    {
                        "type": "id",
                        "id": "cookie"
                    },
                    {
                        "type": "consent",
                        "category": "back-in-stock",
                        "mode": "valid"
                    },
                    {
                        "type": "consent",
                        "category": "cart-notifications",
                        "mode": "valid"
                    },
                    {
                        "type": "consent",
                        "category": "news-and-offers",
                        "mode": "valid"
                    },
                    {
                        "type": "consent",
                        "category": "sms-cart-notifications",
                        "mode": "valid"
                    },
                    {
                        "type": "consent",
                        "category": "sms-launches",
                        "mode": "valid"
                    },
                    {
                        "type": "consent",
                        "category": "sms-stock-notifications",
                        "mode": "valid"
                    },
                    {
                        "type": "consent",
                        "category": "sms-surveys",
                        "mode": "valid"
                    },
                    {
                        "type": "consent",
                        "category": "surveys",
                        "mode": "valid"
                    },
                    {
                        "type": "consent",
                        "category": "text-join",
                        "mode": "until"
                    },
                    {
                        "type": "consent",
                        "category": "loyalty",
                        "mode": "valid"
                    }                      
                ]
            }
            // IF COOKIE IS NOT PART OF PAYLOAD
            if(customer.cookie !== undefined) {
                body.customer_ids.cookie = customer.cookie
            } else {
                let userid = {
                    "type": "id",
                    "id":"cookie"

                }

                let attr = body.attributes
                attr.push(userid)
            }

            // IF EMAIL IS NOT PART OF PAYLOAD
            if(customer.email !== undefined) {
                body.customer_ids.email_id = customer.email
            } else {
                let userid = {
                    "type": "id",
                    "id":"email_id"

                }

                let attr = body.attributes
                attr.push(userid)
            }
            // IF PHONE IS NOT PART OF PAYLOAD
            if(customer.phone !== undefined) {
                body.customer_ids.phone_id = customer.phone
            } else {
                let userid = {
                    "type": "id",
                    "id":"phone_id"

                }

                let attr = body.attributes
                attr.push(userid)
            }

            // CUSTOM PAYLOAD PROPERTIES
            if(customer.properties !== undefined) {

                let attr = body.attributes
                customer.properties.forEach(function (property) {
                    let userid = {
                        "type": "property",
                        "property":property
                    }
                    attr.push(userid)
                })
            }
            // END CUSTOM PAYLOAD PROPERTIES

            // console.log(customer.email,'- in customer attributes: body is ',body)
            console.log('in customer attributes: body is ',body)

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
            // console.log(customer.email,'- success in exponea/attributes.js',customerAttributesData);
            console.log('customer.email,'- 'success in exponea/attributes.js',customerAttributesData);

            // reformat json
            if(customerAttributesData.error === undefined) {
                const reformat = require('../reformatter.js')
                customerAttributesData = reformat.exponea(body.attributes,customerAttributesData.results)
            }
            

            return customerAttributesData;


          } catch (err) {
            // console.log(customer.email,'- Something went wrong in exponea/attributes',err)
            console.log('customer.email,'- 'Something went wrong in exponea/attributes',err)
            res.status(500).send('Something went wrong in exponea/attributes')
          }
          
          
    }
}
