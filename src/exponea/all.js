/* global exponea_token, exponea_auth */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// export a single function that returns a promise
module.exports = {
    properties: async function () {
        try {
            let properties = [
                'accepts_marketing',
                'accepts_marketing_updated_at',
                'birthdate',
                'birthday',
                'currency',
                'created_at',
                'default_address1',
                'default_address_state',
                'default_city',
                'default_company',
                'default_country',
                'default_country_code',
                'default_country_name',
                'domain',
                'email',
                'first_name',
                'favorite_colors',
                'favorite_interests',
                'favorite_style',
                'gender',
                'interests_new',
                'last_name',
                'note',
                'possible_gender',
                'phone',
                'sandal_size',
                'secondary_favorite_style',
                'secondary_first_name',
                'secondary_gender',
                'secondary_interests_new',
                'secondary_last_name',
                'secondary_relationship',
                'secondary_sandal_size',
                'secondary_shoe_size',
                'secondary_size',
                'shoe_gender',
                'shoe_size',
                'size',
                'size_new',
                'source',
                'state',
                'tags',
                'tax_exempt',
                'updated_at',
                'verified_email'
            ]

            const consents = await this.consents()
            if (consents.includes('loyalty')) {
                let loyalty = [
                    'loyalty_balance',
                    'loyalty_id',
                    'loyalty_last_action_date',
                    'loyalty_status',
                    'loyalty_shopify_id',
                    'loyalty_shopify_id_ca',
                    'Loyalty Welcome Status',
                    'pending_point_balance',
                    'points_balance',
                    'points_till_next_tier',
                    'points_to_maintain_current_tier',
                    'profile_completed',
                    'tier'
                ]
                properties.push(...loyalty)
            }

            return properties
        } catch (error) {
            console.log('Something went wrong in exponea/all - properties', error)
        }
    },
    consents: async function () {
        try {
            const buff = Buffer.from(exponea_auth)
            const auth = buff.toString('base64')
    
            const response = await fetch('https://api.exponea.com/data/v2/projects/'+exponea_token+'/consent/categories', {
                method: 'get',
                headers: {
                    'accept': 'application/json',
                    'authorization': 'Basic '+ auth,
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()
            console.log('in exponea/all - consents',data)
    
            if(data && data.results) return data.results.map(item => item.id)
        } catch (error) {
            console.log('Something went wrong in exponea/all - consents', error)
        }
    }
}

