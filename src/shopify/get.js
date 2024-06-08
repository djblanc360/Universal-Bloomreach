/* global shopify_token, shopify_auth, shopify_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    email: async function (customer, res) {
        try {
            console.log(customer.email,'- in customer get by email');
        
            const body = {
                query: `query getCustomer($email:String) {
                customers(first: 10, query: $email){
                  edges{
                    node {
                      id
                      email
                      firstName
                      lastName
                      phone
                      note
                      state
                      acceptsMarketing
                      marketingOptInLevel
                      smsMarketingConsent {
                          consentCollectedFrom
                          marketingOptInLevel
                          marketingState
                      }
                      tags
                    }
                  }
                }
              }`,
                variables: {"email":customer.email}
              }

            console.log(customer.email,'- in customer get email: body is',body)

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
            const customerData = await response.json();
            console.log(customer.email,'- in shopify/get.js email success',customerData);

            if(customerData.data.customers.edges.length > 0) {
              console.log(customer.email,'- customerData in shopify/get.js email, customer exists',customerData.data.customers.edges[0].node);
              return customerData;
            } else {
              console.log(customer.email,'- customerData in shopify/get.js email, there is no customer');
              return null;
            }


          } catch (err) {
            console.log(customer.email,'- Something went wrong in shopify/get.js email',err)
            res.status(500).send('Something went wrong in shopify/get.js email')
          }
          
          
    },
    phone: async function (customer, res) {
      try {
          console.log(customer.phone,'- in customer get by phone');
      
          const body = {
              query: `query getCustomer($phone:String) {
              customers(first: 10, query: $phone){
                edges{
                  node {
                    id
                    email
                    firstName
                    lastName
                    phone
                    note
                    state
                    acceptsMarketing
                    marketingOptInLevel
                    smsMarketingConsent {
                        consentCollectedFrom
                        marketingOptInLevel
                        marketingState
                    }
                    tags
                  }
                }
              }
            }`,
              variables: {"phone":customer.phone}
            }

          console.log(customer.phone,'- in customer get phone: body is',body)

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
          console.log(customer.phone,'- in shopify/get.js phone success',customerData);

          if(customerData.data.customers.edges.length > 0) {
            console.log(customer.phone,'- customerData in shopify/get.js phone, customer exists',customerData.data.customers.edges[0].node);
            return customerData;
          } else {
            console.log(customer.phone,'- customerData in shopify/get.js phone, there is no customer');
            return null;
          }


        } catch (err) {
          console.log(customer.phone,'- Something went wrong in shopify/get.js phone',err)
          res.status(500).send('Something went wrong in shopify/get.js phone')
        }
        
        
  }
}



