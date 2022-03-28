const UserAndSecurity = require("../data-store/users").UserAndSecurity
const Trades = require("../data-store/trades").Trades

const getUserSecurities = require("./common").getUserSecurities

function getTradesByUserId(userId) {
    return new Promise((resolve, reject) => {
        let trades = Trades.filter(t => t.userId === userId)
        resolve(trades)
    }) 
}


function getPortfolio(req, res) {
    try {
    userId = req.params.id
    
    Promise.all([getUserSecurities(userId), getTradesByUserId(userId)])
        .then(results => {
            res.status(200).json({
                userSecurities: results[0],
                userTrades: results[1]
            })
        })
        .catch(e => {
            console.log("getPortfolio : ",e)
            res.status(500).json("Error occurred")
        })
    } catch(e) {
        console.log("getPortfolio : ",e)
        res.status(500).json("Error occurred")
    }
}



module.exports = {
    getPortfolio
}
