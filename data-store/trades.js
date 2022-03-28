/*
    id: transactionId uint
    userId: uint (ref : Users)
    securityId : uint (ref : Users)
    type: enum(BUY,SELL)
    price: uint
    shares: uint
*/


const Trades = []

module.exports = {
    Trades
}


/*

transaction table 
id: transactionId uint
    userId: uint (ref : Users)
    securityId : uint (ref : Users)
    type: enum(BUY,SELL)
    price: uint
    shares: uint


transaction-states
id
transactionid
status (success, pending, failure)


select * from transaction where userId = 001

userId: {}

*/