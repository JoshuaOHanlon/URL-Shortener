const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const { nanoid } = require('nanoid');

const LogEntry = require('../models/LogEntry.js');
const router = Router();


router.get('/', (req, res) => {
    res.json({
        message: '🌎',
    });
});

router.post('/url', slowDown({  // Check if can use slowDown/rateLimit on this server...
    windowMs: 60 * 1000,
    delayAfter: 1,
    delayMs: 500,
}), rateLimit({
    windowMs: 60 * 1000,
    max: 1,
}), async (req, res, next) => {
    try{
        let { slug, url } = req.body;
        //const logEntry = new LogEntry({ slug, url })
        //const newEntry = await logEntry.save();
        if(url.includes('shrt.fit')){
            throw new Error('This URL is Unavailable');
        }
        if(!slug){
            slug = nanoid(5); 
        }else{
            const slugInUse = await LogEntry.findOne({slug});
            if(slugInUse){
                throw new Error('That Slug is in use.');
            }
        }
        slug = slug.toLowerCase();
        const logEntry = new LogEntry({ slug, url })
        const newEntry = await logEntry.save();
        res.json(newEntry);
    }catch(error){
        if(error.name === 'ValidationError') {
            res.status(422);
        }
        next(error);
    }
});

module.exports = router;