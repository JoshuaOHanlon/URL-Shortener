const LogEntry = require('./models/LogEntry.js');
const mongoose = require('mongoose');


const topSlugUpdate = (slug) => {
    const { id: slug } = req.params;

    LogEntry.findOneAndUpdate({slug}, {
        $inc: {redirects: 1}
    }, {new:true});     // {returnOriginal: false}
};