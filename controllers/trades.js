const Trades = require("../data-store/trades").Trades
const UserAndSecurity = require("../data-store/users").UserAndSecurity
const getUserSecurities = require("./common").getUserSecurities
const Securities = require("../data-store/security").Security

const constants = require('../constants')

/*
req.body = {
    userId: uint,
    ticker: string,
    tradeType: "BUY"/"SELL",
    shares: uint,
    price: uint
}
*/

async function createTrade(req, res) {
    try {
        let userId = req.body.userId
        let tradeType = req.body.tradeType

        let userSecurities = await getUserSecurities(userId)

        let securityId = Securities[req.body.ticker].id

        let price = req.body.price
        let shares = req.body.shares
        
        let tradeData = {
            id: Trades.length + 1,
            userId: userId,
            securityId : securityId,
            type: tradeType,
            price: price,
            shares: shares
        }

        switch(tradeType) {
            case constants.TRADE_STATUS_BUY:
                console.log(41)
                Trades.push(tradeData)
                if(userSecurities) {
                    if(userSecurities[securityId]) {
                        currentPrice = userSecurities[securityId].averageBuyPrice
                        currentShares = userSecurities[securityId].shares
                        
                        userSecurities[securityId].averageBuyPrice = ((currentPrice * currentShares) + (price * shares)) / (currentShares + shares)

                        userSecurities[securityId].shares += shares

                    } else {
                        console.log(53)
                        userSecurities[securityId] = {
                                averageBuyPrice: req.body.price,
                                shares: req.body.shares
                            }
                    }
                } else {
                    console.log(60)
                    UserAndSecurity.push({
                        userId: {
                            securityId : {
                                averageBuyPrice: req.body.price,
                                shares: req.body.shares
                            }}
                    })
                }
                res.status(200).json("Trade Created")

                break;
            case constants.TRADE_STATUS_SELL:
                if(userSecurities && userSecurities[securityId] && userSecurities[securityId].shares > shares) {
                    Trades.push(tradeData)

                    currentPrice = userSecurities[securityId].averageBuyPrice
                    currentShares = userSecurities[securityId].shares

                    userSecurities[securityId].shares -= shares
                } else {
                    return res.status(400).json("Transaction Not Allowed")
                }
                res.status(200).json("Trade Created")
                
                break;
            default: return res.status(400).json("Incorrect Trade Type")
        }
        
        console.log(Trades)

    } catch(e) {
        console.log("createTrade : ",e)
        res.status(500).json("Error occurred")
    }
}


module.exports = {
    createTrade
}
