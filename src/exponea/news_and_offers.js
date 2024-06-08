/* global exponea_token, exponea_auth */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    attributes: async function (customer, res) {
        try {
            // console.log(customer.email,'- in customer attributes');
            // "birth_date":customer.birth_date
        
            var body = {
                "customer_ids": {},
                "attributes": [
                    {
                        "type": "consent",
                        "category": "news-and-offers",
                        "mode": "timestamp"
                    } 
                ]
            }
            if(customer.email !== undefined) {
                body.customer_ids.email_id = customer.email
            }
            if(customer.phone !== undefined) {
                body.customer_ids.phone_id = customer.phone
            }

            console.log('in customer attributes: body is ',body)
            // console.log('body');
            // console.log(body);
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
            console.log('success in exponea/news_and_offers.js',customerAttributesData);

            return customerAttributesData;

          } catch (err) {
            console.log('Something went wrong in exponea/news_and_offers',err)
            res.status(500).send('Something went wrong in exponea/news_and_offers')
          }
          
          
    }
}



