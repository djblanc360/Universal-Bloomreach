/* global exponea_token, exponea_auth */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    attributes: async function (customer, res) {
        try {
            // console.log(customer.email,'- in sms_marketing');
            // "birth_date":customer.birth_date
        
            var body = {
                "customer_ids": {},
                "attributes": [
                    {
                        "type": "consent",
                        "category": "sms-cart-notifications",
                        "mode": "message"
                    },
                    {
                        "type": "consent",
                        "category": "sms-launches",
                        "mode": "message"
                    },
                    {
                        "type": "consent",
                        "category": "sms-stock-notifications",
                        "mode": "message"
                    },
                    {
                        "type": "consent",
                        "category": "sms-surveys",
                        "mode": "until"
                    },
                    {
                        "type": "consent",
                        "category": "text-join",
                        "mode": "until"
                    }   
                ]
            }
            if(customer.email !== undefined) {
                body.customer_ids.email_id = customer.email
            }
            if(customer.phone !== undefined) {
                body.customer_ids.phone_id = customer.phone
            }

            console.log('in customer sms_marketing: body is ',body)
   
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
            console.log('success in exponea/sms-marketing.js',customerAttributesData);

            return customerAttributesData;

          } catch (err) {
            console.log('Something went wrong in exponea/sms-marketing',err)
            res.status(500).send('Something went wrong in exponea/sms-marketing')
          }
          
          
    }
}



