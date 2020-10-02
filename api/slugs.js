const { Router } = require('express');
const router = Router();
const LogEntry = require('../models/LogEntry.js');


router.get('/', (req, res) => {
    res.json({
        message: '🍔',
    });
});

module.exports = router;