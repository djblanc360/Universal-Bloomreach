/* global shopify_token, shopify_auth, shopify_url, shopify_rest */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    createCustomer: async function (customer, res) {

        console.log(customer.email,'- inside shopify/create.js')
        if(customer.password !== undefined) {
            console.log(customer.email,'- customer created password')

            try {
                var body = {
                    "customer": {
                        "accepts_marketing": true,
                        "marketing_opt_in_level": "SINGLE_OPT_IN",
                        "first_name": customer.first_name,
                        "last_name": customer.last_name,
                        "email": customer.email,
                        "phone": customer.phone,
                        "verified_email": true,
                        "password": customer.password,
                        "password_confirmation": customer.password,
                        "send_email_welcome": false,
                        "state": "ENABLED"
                    }
                }

                if(customer.store_name == 'roark.com') {
                    body.customer.tags = ['loyalty_member','tier_1']; // Scout
                } else {
                    body.customer.tags = ['loyalty_member','tier_1']; // Cruiser
                }
                console.log(customer.email,'- in shopify/create.js: body is',body)

                // const auth = new Buffer(shopify_auth).toString('base64')
                // 'Authorization': 'Basic '+ auth
                const response = await fetch(shopify_rest+'/customers.json', {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-type': 'application/json',
                        'X-Shopify-Access-Token': shopify_token
                    }
                })
                let customerData = await response.json()
                console.log(customer.email,'- in shopify/create.js success', customerData)

                if(customerData.customer !== undefined) {
                    console.log(customer.email,'- there is customer data',customerData.customer)
                    return customerData.customer
                } else {
                    console.log(customer.email,'- there is no customer data')
                    return null
                }
        
                
            } catch (err) {
                console.log(customer.email,'- Something went wrong in shopify/create.j',err)
                res.status(500).send('Something went wrong in shopify/create.js')
            }
        
        } else {
            console.log('customer without a  password')
            try {
                var body = {
                    query: `mutation customerCreate($input: CustomerInput!) {
                        customerCreate(input: $input) {
                            customer {
                                id
                                    email
                                    phone
                                    firstName
                                    lastName
                                    note
                                    acceptsMarketing
                                    tags
                                    marketingOptInLevel
                            }
                            userErrors {
                                field
                                    message
                            }
                        }
                    }`,
                    variables: {
                        "input":{
                            "acceptsMarketing":true,
                                "email":customer.email,
                                "marketingOptInLevel":"SINGLE_OPT_IN",
                                "firstName":customer.first_name,
                                "lastName":customer.last_name,
                                "note":"phonenumber: " + customer.note, //"phonenumber: (562) 884-2097"
                                "phone":customer.phone //"+15628842097"
                        }
                    }
                }
                // "tags":["Subscribed","loyalty_member"]
                if(customer.store_name == 'roark.com') {
                    body.variables.input.tags = ['loyalty_member','tier_1']; // Scout
                } else {
                    body.variables.input.tags = ['loyalty_member','tier_1']; // Cruiser
                }
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
        
                
                if(customerData.data.customerCreate.customer !== undefined) {
                    console.log(customer.email,'- there is customer data',customerData.data.customerCreate.customer)
                    return customerData.data.customerCreate.customer
                } else {
                    console.log(customer.email,'- there is no customer data')
                    return null
                }

            } catch (err) {
                console.log(customer.email,'- Something went wrong in shopify/create.js',err)
                res.status(500).send('Something went wrong in shopify/create.js')
            }
        }

          
          
    }
}



