/* global exponea_token, exponea_auth */
const util = require('util')

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
module.exports = {
    event: async function (data, res) {
        const hardId = data => {
            const { id, email, phone } = data
            const key = email ? 'email_id' : id ? 'registered' : 'phone_id'
            const value = email || id || phone
            return { [key]: String(value) }
        }
        const endpoint = `https://api.exponea.com/data/v2/projects/${exponea_token}/customers/events`

        const payload = {
            customer_ids: data.email ? { 'email_id': data.email } : hardId(data),
            event_types: [data.event],
            order: 'desc',
            limit: 1
        }
    
        data.email ? 
        console.log(data.email, '- payload in exponea/event: ', payload) 
        : console.log('payload in exponea/event: ', payload)
    
        const buff = Buffer.from(exponea_auth)
        const auth = buff.toString('base64')
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'authorization': 'Basic ' + auth,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    
        const response = await fetch(endpoint, requestOptions)
            .then(response => response.json())
            .then(result => {
                data.email ? 
                console.log(data.email, '- success in exponea/event: ', result) 
                : console.log('success in exponea/event: ', result)
    
                let status = {}
                result.success !== false ? 
                status = result.data[0] : status = { 
                    'exponea/event failed': result.errors
                    
                }
                return status
            })
            .catch(err => {
                data.email ? 
                console.log(data.email, '- Something went wrong in exponea/event: ', err) 
                : console.log('Something went wrong in exponea/event: ', err)
    
                let error = {
                    'exponea/event error': err
                }
                return error
            })
        return response
    },
    backup_track_working_batch: async function (data, res) {
        try {
            const batch = {
                'commands': []
            };


            console.log('batch exponea_token in exponea/track: ', exponea_token);
            console.log('batch exponea_auth in exponea/track: ', exponea_auth);
            console.log('batch global.exponea_token in exponea/track: ', global.exponea_token); // this returns undefined
            console.log('batch global.exponea_auth in exponea/track: ', global.exponea_auth); // this returns undefined
    
            const convertToUnixTime = date => date ? Math.floor(new Date(date).getTime() / 1000) : Math.floor(Date.now() / 1000);
            const events = data.events;
            console.log('events in exponea/track: ', util.inspect(events, { showHidden: false, depth: null }));
            events.forEach(event => {
                const customerIds = { 'email_id': event.email }; // directly using email, assuming all events have an email
                const timestamp = convertToUnixTime(event.timestamp ? event.timestamp : new Date());
    
    
                batch.commands.push({
                    'name': 'customers/events',
                    'data': {
                        'customer_ids': customerIds,
                        'event_type': event.event_type,
                        'properties': event.properties,
                        'timestamp': timestamp
                    }
                });
            });
    
            console.log('Sending batch payload to Exponea:', JSON.stringify(batch, null, 2));
            const auth = Buffer.from(`${exponea_auth}`).toString('base64');
            const requestOptions = {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Basic ' + auth,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(batch)
            };
    
            const response = await fetch(`https://api.exponea.com/track/v2/projects/${exponea_token}/batch`, requestOptions);
            const result = await response.json();
    
            console.log('Exponea track batch response:', result); 
    
            return data;
        } catch (err) {
            console.error('Error in Exponea track batch:', err);
            res.status(500).send('Something went wrong in Exponea track: ' + err.message);
        }
    },
    track: async function (data, res) {
        const hardId = data => {
            console.log('data in hardId', data)
			const { id, email, phone } = data
			const key = email ? 'email_id' : id ? 'registered' : 'phone_id'
			const value = email || id || phone
			return  { [key]: String(value) }
		}
        const convertToUnixTime = date => {
            return Math.floor(new Date(date).getTime() / 1000)
        }

        const createPayload = (event) => {
            console.log('event in createPayload', event)
            // convert current Date into timestamp if not provided
            const timestamp = event.timestamp ? convertToUnixTime(event.timestamp) : convertToUnixTime(new Date().toISOString())

            return {
                customer_ids: event.email ? { 'email_id': event.email } : hardId(event),
                event_type: event.event_type,
                properties: event.properties,
                timestamp: timestamp.toString()
            }
        }
        
        // handle both single event and batch operation
        const send = async (payload, isBatch) => {
            const endpoint = `https://api.exponea.com/track/v2/projects/${exponea_token}/${isBatch ? 'batch' : 'customers/events'}`
            const auth = Buffer.from(exponea_auth).toString('base64')
        
            const requestOptions = {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'authorization': `Basic ${auth}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        
            try {
                const response = await fetch(endpoint, requestOptions)
                const result = await response.json()

                if (isBatch) {
                    console.log('Batch success in exponea/track: ', result);
                } else {
                    const email = payload.customer_ids.email_id;
                    email ? console.log(email, '- success in exponea/track: ', result) : console.log('success in exponea/track: ', result);
                }
                return result
            } catch (err) {
                console.error('Track error:', err)
                return { 'exponea/track error': err }
            }
        }
    
        // check if data is an array (multiple events) or an object (single event)
        if (data.events && Array.isArray(data.events)) {
            // Handle multiple events
            const batchPayload = {
                'commands': data.events.map(event => ({
                    'name': 'customers/events',
                    'data': createPayload(event)
                }))
            }
            console.log('Sending batch payload to Exponea:', util.inspect(batchPayload, { showHidden: false, depth: null }))
            return await send(batchPayload, true);
        } else {
            // Handle a single event
            const singleEventPayload = createPayload(data);
            return await send(singleEventPayload, false);
        }
    },
    backup_track_working_single: async function (data, res) {
        const hardId = data => {
			const { id, email, phone } = data
			const key = email ? 'email_id' : id ? 'registered' : 'phone_id'
			const value = email || id || phone
			return  { [key]: String(value) }
		}
        const convertToUnixTime = date => {
            return Math.floor(new Date(date).getTime() / 1000)
        }
        // convert current Date into timestamp
        const timestamp = convertToUnixTime(new Date().toISOString())

        const endpoint =
            'https://api.exponea.com/track/v2/projects/' +
            exponea_token +
            '/customers/events'

        const payload = {
            customer_ids: data.email ? { 'email_id': data.email } : hardId(data),
            event_type: data.event_type,
            properties: data.properties,
            timestamp: timestamp.toString()
        }

        data.email ? 
        console.log(data.email,'- payload in exponea/track: ',payload) 
        : console.log('payload in exponea/track: ',payload)
        
        const buff = Buffer.from(exponea_auth)
        const auth = buff.toString('base64')

        const requestOptions = {
			method: 'POST',
			headers: {
                'accept': 'application/json',
                'authorization': 'Basic '+ auth,
                'Content-type': 'application/json'
			},
			body: JSON.stringify(payload)
		}
        const response = await fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => {
            data.email ? 
            console.log(data.email,'- success in exponea/track: ',result) 
            : console.log('successg in exponea/track: ',result)
            let status = {}
            result.success !== false ? status = { 'exponea/track success': payload } : status = { 'exponea/track failed': result.errors }

            return status
        })
        .catch(err => {
            data.email ? 
            console.log(data.email,'- Something went wrong in exponea/track: ',err) 
            : console.log('Something went wrong in exponea/track: ',err)
            let error = {
                'exponea/track error': err
            }
            return error
        })
        return response
    },
    identify: async function (data, res) {},
    // batch commands
    multiple: async function (data, res) {},
}
