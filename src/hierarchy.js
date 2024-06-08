/* global exponea_token, exponea_auth */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    sort: function (a, h) {

        let r = {}

        const mode = (arr) => {
            return arr.sort((a,b) =>
                arr.filter(v => v===a).length
                - arr.filter(v => v===b).length
            ).pop()
        }

        h.forEach(i => {
            let attrArr = a.map(e => e.h[i])
            let chosenAttr = mode(attrArr)
            let key = h[i]
            r[key] = chosenAttr
        
        })


        return r
    }
}



