/** pass environmental variables */

module.exports = {
    exponea_authenticate: function (req, res, next) {
      try {
        const customer = req.body
        console.log('customer in exponea_authenticate: ' + customer)
        req.credentials = req.credentials || {}
        /* OLUKAI */
        if (customer.store_name.includes('olukai.com')) {
          req.credentials.exponea = {
            token: process.env.OLUKAI_EXPONEA_TOKEN,
            auth: process.env.OLUKAI_EXPONEA_KEY + ':' + process.env.OLUKAI_EXPONEA_SECRET,
          }
        }
        if(customer.store_name == 'vip.olukai.com') {
            req.credentials.exponea = {
                token: process.env.OLUKAI_EXPONEA_TOKEN,
                auth: process.env.OLUKAI_EXPONEA_KEY + ':' + process.env.OLUKAI_EXPONEA_SECRET,
            }
        }
        if(customer.store_name == 'olukai.ca') {
            req.credentials.exponea = {
                token: process.env.OLUKAI_EXPONEA_TOKEN_CA,
                auth: process.env.OLUKAI_EXPONEA_KEY_CA + ':' + process.env.OLUKAI_EXPONEA_SECRET_CA,
            }
        }
        if(customer.store_name == 'olukai-store-dev.myshopify.com') {
            req.credentials.exponea = {
                token: process.env.OLUKAI_EXPONEA_TOKEN_DEV,
                auth: process.env.OLUKAI_EXPONEA_KEY_DEV + ':' + process.env.OLUKAI_EXPONEA_SECRET_DEV,
            }
        }
        /* MELIN */
        if(customer.store_name == 'melin.com') {
            req.credentials.exponea = {
                token: process.env.MELIN_EXPONEA_TOKEN,
                auth: process.env.MELIN_EXPONEA_KEY + ':' + process.env.MELIN_EXPONEA_SECRET,
            }
        }
        if(customer.store_name == 'vip.melin.com') {
            req.credentials.exponea = {
                token: process.env.MELIN_EXPONEA_TOKEN,
                auth: process.env.MELIN_EXPONEA_KEY + ':' + process.env.MELIN_EXPONEA_SECRET,
            }
        }
        if(customer.store_name == 'dev-melin-brand.myshopify.com') {
            req.credentials.exponea = {
                token: process.env.MELIN_EXPONEA_TOKEN_DEV,
                auth: process.env.MELIN_EXPONEA_KEY_DEV + ':' + process.env.MELIN_EXPONEA_SECRET_DEV,
            }
        }
        /* ROARK */
        if(customer.store_name == 'roark.com') {
            req.credentials.exponea = {
                token: process.env.ROARK_EXPONEA_TOKEN,
                auth: process.env.ROARK_EXPONEA_KEY + ':' + process.env.ROARK_EXPONEA_SECRET,
            }
        }
        if(customer.store_name == 'vip.roark.com') {
            req.credentials.exponea = {
                token: process.env.ROARK_EXPONEA_TOKEN,
                auth: process.env.ROARK_EXPONEA_KEY + ':' + process.env.ROARK_EXPONEA_SECRET,
            }
        }
        if(customer.store_name == 'dev-roark.myshopify.com') {
            req.credentials.exponea = {
                token: process.env.ROARK_EXPONEA_TOKEN_DEV,
                auth: process.env.ROARK_EXPONEA_KEY_DEV + ':' + process.env.ROARK_EXPONEA_SECRET_DEV,
            }
        }
        /* KAENAN */
        if(customer.store_name == 'kaenon.com') {
            req.credentials.exponea = {
                token: process.env.KAENON_EXPONEA_TOKEN,
                auth: process.env.KAENON_EXPONEA_KEY + ':' + process.env.KAENON_EXPONEA_SECRET,
            }
        }
        if(customer.store_name == 'vip.kaenon.com') {
            req.credentials.exponea = {
                token: process.env.KAENON_EXPONEA_TOKEN,
                auth: process.env.KAENON_EXPONEA_KEY + ':' + process.env.KAENON_EXPONEA_SECRET,
            }
        }
        if(customer.store_name == 'dev-kaenon.myshopify.com') {
            req.credentials.exponea = {
                token: process.env.KAENON_EXPONEA_TOKEN_DEV,
                auth: process.env.KAENON_EXPONEA_KEY_DEV + ':' + process.env.KAENON_EXPONEA_SECRET_DEV,
            }
        }

        next() // Proceed to next middleware
      } catch (err) {
        console.error('Error in exponea_authenticate:', err)
        res.status(500).send('Failed to authenticate Exponea')
      }
    },
  
    shopify_authenticate: function (req, res, next) {
      try {
        const customer = req.body
        // Ensure the credentials object exists on the request
        req.credentials = req.credentials || {}
        /* OLUKAI */
        if (customer.store_name === 'olukai-store-dev.myshopify.com') {
          req.credentials.shopify = {
            token: process.env.OLUKAI_SHOPIFY_TOKEN_DEV,
            auth: process.env.OLUKAI_SHOPIFY_KEY_DEV + ':' + process.env.OLUKAI_SHOPIFY_SECRET_DEV,
            url: process.env.OLUKAI_SHOPIFY_URL_DEV,
            rest: process.env.OLUKAI_SHOPIFY_REST_DEV,
          }
        }
        if(customer.store_name == 'olukai.com') {
            req.credentials.shopify = {
                token: process.env.OLUKAI_SHOPIFY_TOKEN,
                auth: process.env.OLUKAI_SHOPIFY_KEY + ':' + process.env.OLUKAI_SHOPIFY_SECRET,
                url: process.env.OLUKAI_SHOPIFY_URL,
                rest: process.env.OLUKAI_SHOPIFY_REST,
            }
        }
        if(customer.store_name == 'vip.olukai.com') {
            req.credentials.shopify = {
                token: process.env.OLUKAI_SHOPIFY_TOKEN_VIP,
                auth: process.env.OLUKAI_SHOPIFY_KEY_VIP + ':' + process.env.OLUKAI_SHOPIFY_SECRET_VIP,
                url: process.env.OLUKAI_SHOPIFY_URL_VIP,
                rest: process.env.OLUKAI_SHOPIFY_REST_VIP,
            }
        }
        if(customer.store_name == 'olukai.ca') {
            req.credentials.shopify = {
                token: process.env.OLUKAI_SHOPIFY_TOKEN_CA,
                auth: process.env.OLUKAI_SHOPIFY_KEY_CA + ':' + process.env.OLUKAI_SHOPIFY_SECRET_CA,
                url: process.env.OLUKAI_SHOPIFY_URL_CA,
                rest: process.env.OLUKAI_SHOPIFY_REST_CA,
            }
        }
        /* ROARK */
        if(customer.store_name == 'roark.com') {
            req.credentials.shopify = {
                token: process.env.ROARK_SHOPIFY_TOKEN,
                auth: process.env.ROARK_SHOPIFY_KEY + ':' + process.env.ROARK_SHOPIFY_SECRET,
                url: process.env.ROARK_SHOPIFY_URL,
                rest: process.env.ROARK_SHOPIFY_REST,
            }
        }
        if(customer.store_name == 'vip.roark.com') {
            req.credentials.shopify = {
                token: process.env.ROARK_SHOPIFY_TOKEN_VIP,
                auth: process.env.ROARK_SHOPIFY_KEY_VIP + ':' + process.env.ROARK_SHOPIFY_SECRET_VIP,
                url: process.env.ROARK_SHOPIFY_URL_VIP,
                rest: process.env.ROARK_SHOPIFY_REST_VIP,
            }
        }
        if(customer.store_name == 'dev-roark.myshopify.com') {
            req.credentials.shopify = {
                token: process.env.ROARK_SHOPIFY_TOKEN_DEV,
                auth: process.env.ROARK_SHOPIFY_KEY_DEV + ':' + process.env.ROARK_SHOPIFY_SECRET_DEV,
                url: process.env.ROARK_SHOPIFY_URL_DEV,
                rest: process.env.ROARK_SHOPIFY_REST_DEV,
            }
        }
  
        next() // Proceed to next middleware
      } catch (err) {
        console.error('Error in shopify_authenticate:', err)
        res.status(500).send('Failed to authenticate Shopify')
      }
    },
  }
  