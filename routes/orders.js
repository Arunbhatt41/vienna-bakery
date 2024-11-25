const express = require('express');
const router = express.Router();

const orders = [
    { reqNumber: '001', partyName: 'Party A', item: 'Item 1', quantity: 10 },
    { reqNumber: '002', partyName: 'Party B', item: 'Item 2', quantity: 5 },
];

router.get('/', (req, res) => {
    res.json(orders);
});

module.exports = router;