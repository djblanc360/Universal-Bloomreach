/* global shopify_token, shopify_auth, shopify_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    email: async function (customer, id, res) {
        try {
            console.log(customer.email,'- in customer consent update email');
        
            const body = {
                query: `mutation customerUpdate($input: CustomerInput!) {
                    customerUpdate(input: $input) {
                      customer {
                        id
                        email
                        phone
                        acceptsMarketing
                        marketingOptInLevel
                      }
                      userErrors {
                        field
                        message
                      }
                    }
              }`,
                variables: 
                {
                    "input": {
                        "id": id,
                        "email": customer.email,
                        "acceptsMarketing": customer.acceptsMarketing, // true, false to opt out of email
                        "marketingOptInLevel": customer.marketingOptInLevel // SINGLE_OPT_IN
                    }
                }
              }

            console.log(customer.email,'- in customer consent update email: body is',body)

            // const auth = new Buffer(shopify_auth).toString('base64')
            // ‘Authorization': 'Basic '+ auth
            const response = await fetch(shopify_url, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json',
                    'X-Shopify-Access-Token': shopify_token
                }
            });
            let customerData = await response.json();
            console.log(customer.email,'- in shopify/consent_update.js email success',customerData.data.customerUpdate);

            return customerData.data.customerUpdate;


          } catch (err) {
            console.log(customer.email,'- Something went wrong in shopify/consent_update.js email',err)
            res.status(500).send('Something went wrong in shopify/consent_update.js email')
          }
          
          
    },
    phone: async function (customer, id, res) {
      try {
          console.log(customer.phone,'- in customer consent update phone');
      
          const body = {
            query: `mutation customerSmsMarketingConsentUpdate($input: CustomerSmsMarketingConsentUpdateInput!) {
                customerSmsMarketingConsentUpdate(input: $input) {
                  userErrors { field message }
                  customer {
                    id
                    phone
                    smsMarketingConsent{
                      marketingState
                      marketingOptInLevel
                      consentUpdatedAt
                      consentCollectedFrom
                    }
                  }
                }
            }`,
              variables: {
                "input": {
                  "customerId": id,
                  "smsMarketingConsent": {
                    "marketingState": customer.marketingState, // SUBSCRIBED, UNSUBSCRIBED
                    "marketingOptInLevel": customer.marketingOptInLevel // SINGLE_OPT_IN
                  }
                }
              }
            }

          console.log(customer.phone,'- in customer consent update phone: body is',body)

          // const auth = new Buffer(shopify_auth).toString('base64')
          // ‘Authorization': 'Basic '+ auth
          const response = await fetch(shopify_url, {
              method: 'post',
              body: JSON.stringify(body),
              headers: {
                  'Content-type': 'application/json',
                  'X-Shopify-Access-Token': shopify_token
              }
          });
          let customerData = await response.json();
          console.log(customer.phone,'- in shopify/consent_update.js phone success',customerData.data.customerSmsMarketingConsentUpdate);

          return customerData.data.customerSmsMarketingConsentUpdate;


        } catch (err) {
          console.log(customer.phone,'- Something went wrong in shopify/consent_update.js phone',err)
          res.status(500).send('Something went wrong in shopify/consent_update.js phone')
        }
        
        
  }
}



