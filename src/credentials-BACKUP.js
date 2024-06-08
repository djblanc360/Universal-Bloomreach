/** pass environmental variables */


module.exports = {
    exponea_authenticate: function (req, res, next) {
        try {
            const customer = req.body;
            let exponea_token;
            let exponea_auth;
            /* OLUKAI */
            if(customer.store_name == 'olukai.com') {
              exponea_token = process.env.OLUKAI_EXPONEA_TOKEN;
              exponea_auth = process.env.OLUKAI_EXPONEA_KEY+':'+process.env.OLUKAI_EXPONEA_SECRET;
            }
            if(customer.store_name == 'vip.olukai.com') {
              exponea_token = process.env.OLUKAI_EXPONEA_TOKEN;
              exponea_auth = process.env.OLUKAI_EXPONEA_KEY+':'+process.env.OLUKAI_EXPONEA_SECRET;
            }
            if(customer.store_name == 'olukai.ca') {
              exponea_token = process.env.OLUKAI_EXPONEA_TOKEN_CA;
              exponea_auth = process.env.OLUKAI_EXPONEA_KEY_CA+':'+process.env.OLUKAI_EXPONEA_SECRET_CA;
            }
            if(customer.store_name == 'olukai-store-dev.myshopify.com') {
              exponea_token = process.env.OLUKAI_EXPONEA_TOKEN_DEV;
              exponea_auth = process.env.OLUKAI_EXPONEA_KEY_DEV+':'+process.env.OLUKAI_EXPONEA_SECRET_DEV;
            }
            /* MELIN */
            if(customer.store_name == 'melin.com') {
              exponea_token = process.env.MELIN_EXPONEA_TOKEN;
              exponea_auth = process.env.MELIN_EXPONEA_KEY+':'+process.env.MELIN_EXPONEA_SECRET;
            }
            if(customer.store_name == 'vip.melin.com') {
              exponea_token = process.env.MELIN_EXPONEA_TOKEN;
              exponea_auth = process.env.MELIN_EXPONEA_KEY+':'+process.env.MELIN_EXPONEA_SECRET;
            }
            if(customer.store_name == 'dev-melin-brand.myshopify.com') {
              exponea_token = process.env.MELIN_EXPONEA_TOKEN_DEV;
              exponea_auth = process.env.MELIN_EXPONEA_KEY_DEV+':'+process.env.MELIN_EXPONEA_SECRET_DEV;
            }
            /* ROARK */
            if(customer.store_name == 'roark.com') {
              exponea_token = process.env.ROARK_EXPONEA_TOKEN;
              exponea_auth = process.env.ROARK_EXPONEA_KEY+':'+process.env.ROARK_EXPONEA_SECRET;
            }
            if(customer.store_name == 'vip.roark.com') {
              exponea_token = process.env.ROARK_EXPONEA_TOKEN;
              exponea_auth = process.env.ROARK_EXPONEA_KEY+':'+process.env.ROARK_EXPONEA_SECRET;
            }
            if(customer.store_name == 'dev-roark.myshopify.com') {
              exponea_token = process.env.ROARK_EXPONEA_TOKEN_DEV;
              exponea_auth = process.env.ROARK_EXPONEA_KEY_DEV+':'+process.env.ROARK_EXPONEA_SECRET_DEV;
            }


            /* KAENAN */
            if(customer.store_name == 'kaenon.com') {
              exponea_token = process.env.KAENAN_EXPONEA_TOKEN;
              exponea_auth = process.env.KAENAN_EXPONEA_KEY+':'+process.env.KAENAN_EXPONEA_SECRET;
            }
            if(customer.store_name == 'vip.kaenon.com') {
              exponea_token = process.env.KAENAN_EXPONEA_TOKEN;
              exponea_auth = process.env.KAENAN_EXPONEA_KEY+':'+process.env.KAENAN_EXPONEA_SECRET;
            }
            if(customer.store_name == 'kaenon-dev.myshopify.com') {
              exponea_token = process.env.KAENAN_EXPONEA_TOKEN_DEV;
              exponea_auth = process.env.KAENAN_EXPONEA_KEY_DEV+':'+process.env.KAENAN_EXPONEA_SECRET_DEV;
            }


            // return exponea_token,exponea_auth;
            return { 
              token: exponea_token, 
              auth: exponea_auth 
            }; 

          } catch (err) {
            // console.log((err)
            res.status(500).send('failed to authenticate exponea')
          }
    },
    shopify_authenticate: function (req, res, next) {
      try {
          const customer = req.body;
          let shopify_token;
          let shopify_auth;
          let shopify_url;
          let shopify_rest;
          if(customer.store_name == 'olukai-store-dev.myshopify.com') {
            shopify_token = process.env.OLUKAI_SHOPIFY_TOKEN_DEV;
            shopify_auth = process.env.OLUKAI_SHOPIFY_KEY_DEV+':'+process.env.OLUKAI_SHOPIFY_SECRET_DEV;
            shopify_url = process.env.OLUKAI_SHOPIFY_URL_DEV;
            shopify_rest = process.env.OLUKAI_SHOPIFY_REST_DEV;
          }
          if(customer.store_name == 'olukai.com') {
            shopify_token = process.env.OLUKAI_SHOPIFY_TOKEN;
            shopify_auth = process.env.OLUKAI_SHOPIFY_KEY+':'+process.env.OLUKAI_SHOPIFY_SECRET;
            shopify_url = process.env.OLUKAI_SHOPIFY_URL;
            shopify_rest = process.env.OLUKAI_SHOPIFY_REST;
          }
          if(customer.store_name == 'vip.olukai.com') {
            shopify_token = process.env.OLUKAI_SHOPIFY_TOKEN_VIP;
            shopify_auth = process.env.OLUKAI_SHOPIFY_KEY_VIP+':'+process.env.OLUKAI_SHOPIFY_SECRET_VIP;
            shopify_url = process.env.OLUKAI_SHOPIFY_URL_VIP;
            shopify_rest = process.env.OLUKAI_SHOPIFY_REST_VIP;
          }
          if(customer.store_name == 'olukai.ca') {
            shopify_token = process.env.OLUKAI_SHOPIFY_TOKEN_CA;
            shopify_auth = process.env.OLUKAI_SHOPIFY_KEY_CA+':'+process.env.OLUKAI_SHOPIFY_SECRET_CA;
            shopify_url = process.env.OLUKAI_SHOPIFY_URL_CA;
            shopify_rest = process.env.OLUKAI_SHOPIFY_REST_CA;
          }
          if(customer.store_name == 'vip.roark.com') {
            shopify_token = process.env.ROARK_SHOPIFY_TOKEN_VIP;
            shopify_auth = process.env.ROARK_SHOPIFY_KEY_VIP+':'+process.env.ROARK_SHOPIFY_SECRET_VIP;
            shopify_url = process.env.ROARK_SHOPIFY_URL_VIP;
            shopify_rest = process.env.ROARK_SHOPIFY_REST_VIP;
          }
          if(customer.store_name == 'dev-roark.myshopify.com') {
            shopify_token = process.env.ROARK_SHOPIFY_TOKEN_DEV;
            shopify_auth = process.env.ROARK_SHOPIFY_KEY_DEV+':'+process.env.ROARK_SHOPIFY_SECRET_DEV;
            shopify_url = process.env.ROARK_SHOPIFY_URL_DEV;
            shopify_rest = process.env.ROARK_SHOPIFY_REST_DEV;
          }
          if(customer.store_name == 'roark.com') {
            shopify_token = process.env.ROARK_SHOPIFY_TOKEN;
            shopify_auth = process.env.ROARK_SHOPIFY_KEY+':'+process.env.ROARK_SHOPIFY_SECRET;
            shopify_url = process.env.ROARK_SHOPIFY_URL;
            shopify_rest = process.env.ROARK_SHOPIFY_REST;
          }
          // return exponea_token,exponea_auth;
          return { 
            token: shopify_token, 
            auth: shopify_auth,
            url: shopify_url,
            rest: shopify_rest
          }; 

        } catch (err) {
          // console.log((err)
          res.status(500).send('failed to authenticate shopify')
        }
  }
}



