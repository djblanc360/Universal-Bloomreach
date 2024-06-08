/* global shopify_token, shopify_auth, shopify_url */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    addTags: async function (email,id, tags, res) {
        try {
            
            const body = {
                query: `mutation addTags($id: ID!, $tags: [String!]!) {
                    tagsAdd(id: $id, tags: $tags) {
                        node {
                            id
                        }
                    }
                }`,
                variables: {
                    "id":id,
                    "tags":tags
                }
              }

              console.log(email,'- in shopify/addTags: body is',body)

            // const auth = new Buffer(shopify_auth).toString('base64');
            // ‘Authorization': 'Basic '+ auth
            const response = await fetch(shopify_url, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json',
                    'X-Shopify-Access-Token': shopify_token
                }
            });
            let customerTagsData = await response.json();
            console.log(email,'- in shopify/addTags success', customerTagsData);

            return 'updated tags';

          } catch (err) {
            console.log(email,'- failed in grapqhl add tags',err)
            res.status(500).send('failed in grapqhl add tags')
          }
          
          
    },
    removeTags: async function (id, tags, res) {
        try {
        
            const body = {
                query: `mutation tagsRemove($id: ID!, $tags: [String!]!) {
                    tagsRemove(id: $id, tags: $tags) {
                        node {
                            id
                        }
                    }
                }`,
                variables: {
                    "id":id,
                    "tags":tags
                }
              }

            console.log(email,'- in shopify/removeTags: body is',body)

            // const auth = new Buffer(shopify_auth).toString('base64');
            // ‘Authorization': 'Basic '+ auth
            const response = await fetch(shopify_url, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json',
                    'X-Shopify-Access-Token': shopify_token
                }
            });
            let customerTagsData = await response.json();
            console.log(email,'- in shopify/removeTags success',customerTagsData);

            return 'updated tags';

          } catch (err) {
            console.log(email,'failed in grapqhl remove tags',err)
            res.status(500).send('failed in grapqhl remove tags')
          }
          
          
    }
}



