/* global exponea_token, exponea_auth */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
module.exports = {
    get: async function (customer, res) {
        try {
            const hardId = data => {
                //  check if a value is neither 'undefined' nor an empty string
                const isValidValue = value => value !== 'undefined' && value !== '';
            
                // data fields mapping to respective keys and in order of precedence
                const fieldMappings = {
                    'email': 'email_id',
                    'id': 'registered',
                    'cookie': 'cookie',
                    'phone': 'phone_id'
                };
            
                // find first valid field and its corresponding key
                for (const [field, key] of Object.entries(fieldMappings)) {
                    if (isValidValue(data[field])) {
                        return { [key]: String(data[field]) };
                    }
                }
            
                return {};
            }
            
            let payload = {
                "customer_ids": hardId(customer),
                "attributes": [ 
                    {
                        "type": "recommendation",
                        "id": customer.recommendation_id,
                        "fillWithRandom": false,
                        "size": customer.recommendations_size
                    }
                ]
            }

            if (customer.catalogFilter) {
                payload.attributes[0].catalogFilter = customer.catalogFilter
            }

            customer.email ? 
            console.log(customer.email, '- payload in exponea/recommendations: ', payload) 
            : console.log('payload in exponea/recommendations: ', payload)
            // const buf = new Buffer(exponea_auth)
     
            const buff = Buffer.from(exponea_auth)
            const auth = buff.toString('base64')

            const response = await fetch('https://api.exponea.com/data/v2/projects/'+exponea_token+'/customers/attributes', {
                method: 'post',
                body: JSON.stringify(payload),
                headers: {
                    'accept': 'application/json',
                    'authorization': 'Basic '+ auth,
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()
            
            customer.email ? 
            console.log(customer.email, '- success in exponea/recommendations: ', data) 
            : console.log('success in exponea/recommendations: ', data)

            // reformat json
            // if(data.error === undefined) {
            //     const reformat = require('../reformatter.js')
            //     data = reformat.exponea(body.recommendations,data.results)
            // }
            

            return data


          } catch (err) {
            customer.email ? 
            console.log(customer.email, '- Something went wrong in exponea/recommendations: ', err) 
            : console.log('Something went wrong in exponea/recommendations: ', err)

          }
          
          
    }
}



