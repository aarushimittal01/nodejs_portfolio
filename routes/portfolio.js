var express = require('express');
var router = express.Router();

const userCtrl = require('../controllers/portfolio')
const tradeCtrl = require('../controllers/trades')


router.post('/:id/trade', tradeCtrl.createTrade);
router.get('/:id', userCtrl.getPortfolio)

module.exports = router;
