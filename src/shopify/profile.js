/* global shopify_token, shopify_auth, shopify_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    customerData: async function (customer, res) {
        try {
            // console.log(customer.email,'- in customer profile');
        
            const body = {
                query: `query getCustomer($email:String) {
                customers(first: 10, query: $email){
                  edges{
                    node {
                      id
                      email
                      firstName
                      lastName
                      tags
                      state
                    }
                  }
                }
              }`,
                variables: {"email":customer.email}
              }

            console.log(customer.email,'- in customer profile: body is',body)

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
            console.log(customer.email,'- in shopify/profile.js success',customerData);

            if(customerData.data.customers.edges.length > 0) {
              console.log(customer.email,'- customerData in shopify/profile.js, customer exists',customerData.data.customers.edges[0].node);
              return customerData;
            } else {
              console.log(customer.email,'- customerData in shopify/profile.js, there is no customer');
              return null;
            }


          } catch (err) {
            console.log(customer.email,'- Something went wrong in shopify/profile.js',err)
            res.status(500).send('Something went wrong in shopify/profile.js')
          }
          
          
    },
    updateProfile: async function (customer, res) {
      try {
        const body = {
          "customer": {
            "id": customer.id,
            "accepts_marketing": true,
            "marketing_opt_in_level": "SINGLE_OPT_IN",
            "password": customer.password,
            "password_confirmation": customer.password,
            "send_email_welcome": false
          }
        }
        console.log(customer.email,'- in customer update profile: body is',body)

        // const auth = new Buffer(shopify_auth).toString('base64')
         // ‘Authorization': 'Basic '+ auth
        const response = await fetch(shopify_rest+`/customers/${customer.id}.json`, {
            method: 'put',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
                'X-Shopify-Access-Token': shopify_token
            }
        })
        let customerData = await response.json()
        console.log(customer.email,'- in shopify/update.js success', customerData)

        return customerData.customer

      } catch (err) {
        console.log(customer.email,'- Something went wrong in shopify/update.js ',err)
        res.status(500).send('Something went wrong')
      }
    }
}



