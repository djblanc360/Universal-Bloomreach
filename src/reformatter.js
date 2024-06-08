/* global exponea_token, exponea_auth */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    exponea: function (a, r) {

        // let obj = {}
        let obj = []
        let ids = {}
        let consents = {}
        let properties = {}

        for(var i in a) {
            // let temp = {}
            let type= a[i].type
            let category = a[i].category
            // console.log('a[i]',a[i])
            // console.log('r[i]',r[i])

 
            if(type === 'id') {
                // temp.type = type
                // temp.category = category
                let idType = a[i].id
                let id = r[i].value
                // temp.id = id
                if (idType === 'registered') {
                    id.forEach(value => {
                        if (value.includes("@")) {
                            ids["email_id"] = value
                        }
                    })
                }
                ids[idType] = id
            }
            if(type === 'property') {
                let property = r[i].value
                let key = a[i].property
                // temp.property = property
                properties[key] = property
                // Object.assign(properties, {key: property})
            }
            if(type === 'consent') {
                // temp.type = type
                // temp.category = category
                let consent = r[i].value
                // temp.consent = consent
                consents[category] = consent
            }
            // console.log('temp',temp)
            // if(temp !== {}) {obj.push(temp)}
            // obj[i] = temp
        }

        let idsObj = {}
        idsObj["id"] = ids
        obj.push(idsObj)

        let consentsObj = {}
        consentsObj["consents"] = consents
        obj.push(consentsObj)

        let propertiesObj = {}
        propertiesObj["properties"] = properties
        obj.push(propertiesObj)
        console.log('obj',obj)

        return obj
    },
    shopify: function (body) {

        const flat = (obj, out) => {
            Object.keys(obj).forEach(key => {
        
                console.log('type',typeof obj[key])
                //console.log('is aray',Array.isArray(obj[key]))
                
                if (typeof obj[key] == 'object') {
                    console.log('its an object',obj[key])
                    
                    if(Array.isArray(obj[key])) {
                        console.log('is aray',Array.isArray(obj[key]))
                        let arr  = obj[key]
                        out[key] = arr.flat()
                    } else {
                        out = flat(obj[key], out) //recursively call for nesteds
                    }
                } else {
                    console.log('its an object',obj[key])
                    out[key] = obj[key] //direct assign for values
                }
        
            })
            return out
        }
        
        var list = []
        var nodes = body.data.customers.edges
        nodes.forEach((node) => {
            list.push(flat(node,{}))
        
        })
        console.log('list',list)
        return list
    }
}



