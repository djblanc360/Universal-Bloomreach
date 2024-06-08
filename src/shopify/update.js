/* global shopify_token, shopify_auth, shopify_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    update: async function (customer, res) {
      try {

        // CONDITIONALLY ADD ATTRIBUTES TO UDPATE
        // if(data.first_name !== undefined) {
        //     body.data.first_name = data.first_name
        // }

        var body = {
            query: `mutation customerUpdate($input: CustomerInput!) {
                customerUpdate(input: $input) {
                    customer {
                        id
                        email
                        phone
                        acceptsMarketing
                        marketingOptInLevel
                        smsMarketingConsent {
                          marketingState
                          marketingOptInLevel
                          consentCollectedFrom
                        }
                        tags
                    }
                    userErrors {
                        field
                            message
                    }
                }
            }`,
            variables: {
                "input":{
                    "id":`gid://shopify/Customer/${customer.id}` // "id":"gid://shopify/Customer/6134900785251",
                }
            }
        }

        // BLUEPRINT VARIABLES
        // variables: {
        //     "input":{
        //         "acceptsMarketing":true,
        //         "acceptsMarketingUpdatedAt":"",
        //         "email":customer.email,
        //         "emailMarketingConsent": {
        //             "consentUpdatedAt":"",
        //             "marketingOptInLevel":"",
        //             "marketingState":""
        //         },
        //         "firstName":"",
        //         "lastName":"",
        //         "locale":"",
        //         "marketingOptInLevel":"",
        //         "note":"",
        //         "phone":"",
        //         "smsMarketingConsent": {
        //             "consentUpdatedAt":"",
        //             "marketingOptInLevel":"",
        //             "marketingState":""
        //         },
        //         "tags":[""],
        //         "taxExempt":true,
        //         "taxExemptions":[""],
        //         "id":`gid://shopify/Customer/${customer.id}` // "id":"gid://shopify/Customer/6134900785251",
        //     }
        // }
            console.log(customer.email,'- in shopify/create.js: body is',body)

        // const auth = new Buffer(shopify_auth).toString('base64')
        // ‘Authorization': 'Basic '+ auth
        const response = await fetch(shopify_url, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
                'X-Shopify-Access-Token': shopify_token
            }
        })
            let customerData = await response.json()
            console.log(customer.email,'- customerData in shopify/create.js ',customerData)

        return customerData.customer

      } catch (err) {
        console.log(customer.email,'- Something went wrong in shopify/update.js ',err)
        res.status(500).send('Something went wrong')
      }
    }
}



