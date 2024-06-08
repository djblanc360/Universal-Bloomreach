/*global fetch*/
import fetch from 'node-fetch';

export const handler = async (event) => {

    if(event.id){
        let res = await tagShopifyCustomer(event.id);

        return {
            statusCode: 200,
            body: {
                email: event.email,
                id: event.id,
                event: "Customer Tagged with ID",
                response: res
            }
        }
    } else if(event.email) {
        let res = await getShopifyCustomerID(event.email);
        
        return {
            statusCode: 200,
            body: {
                email: event.email,
                id: event.id,
                event: "Customer Identified by Email and Tagged By ID",
                response: res
            }
        }
    } else {
      return {
            statusCode: 404,
            body: {
                email: event.email,
                id: event.id,
                event: "No ID or Email was passed in the event data!"
            }
        }
    }
};

const tagShopifyCustomer = async (customerID) => {
  let apiResponse = await fetch(`https://${process.env.STORE_NAME}.myshopify.com/admin/api/graphql.json`, {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': `${process.env.SHOPIFY_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation tagsAdd($id: ID!, $tags: [String!]!) {
      tagsAdd(id: $id, tags: $tags) {
        node {
          id
        }
        userErrors {
          field
          message
        }
      }
    }`,
      variables: {"id":`gid://shopify/Customer/${customerID}`,"tags":["loyalty_member","Scout","tier_1"]}
    })
  })
    .then(response => response.json())
    .then(result => {
      // Throw an Error if the response has Errors
      if(result.data.tagsAdd.userErrors.length > 0){
        throw new Error(`No customer found with ID: ${customerID}`)
      }
     // console.log("---> tagShopifyCustomer Response:", result)
      return result.data.tagsAdd
    })
    .catch(error => console.log('---> tagShopifyCustomer Error:', error));
    
    return apiResponse
};

const getShopifyCustomerID = async (email) => {
  let apiResponse = await fetch(`https://${process.env.STORE_NAME}.myshopify.com/admin/api/graphql.json`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": `${process.env.SHOPIFY_TOKEN}`
    },
    body: JSON.stringify({
      query: `query {
      customers(first: 10 query:"email:${email}") {
        edges {
          node {
            id
            email
          }
        }
      }
    }`,
      variables: {}
    })
  })
    .then(response => response.json())
    .then(result => {
      //console.log("---> getShopifyCustomerID Response:", result)
      // Throw an Eroor if the response is empty
      if(result.data.customers.edges.length === 0){
        throw new Error(`Customer with email ${email} not found on ${process.env.STORE_NAME}`)
      }
      
      result.data.customers.edges.forEach((customer) => {
        if (customer.node.email === email) {
          return tagShopifyCustomer(customer.node.id)
        }
      });
      return result.data.customers.edges
    })
    .catch(error => console.log('---> getShopifyCustomerID Error:', error));
    
    return apiResponse
}