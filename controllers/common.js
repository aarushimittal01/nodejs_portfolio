const UserAndSecurity = require("../data-store/users").UserAndSecurity

function getUserSecurities(userId) {
    return new Promise((resolve, reject) => {
        console.log('getUserSecurities : ', UserAndSecurity)
        if(UserAndSecurity[userId]) resolve(UserAndSecurity[userId])
        else resolve({})
    }) 
}

module.exports = {
    getUserSecurities
}