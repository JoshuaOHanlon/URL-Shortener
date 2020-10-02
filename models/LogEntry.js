const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Validator function
const slugValidator = (val) => {
    return val == '/^[\w\-]+$/i';   // may use ===
};

let logEntrySchema = new Schema({   
    slug: {
        type: String,
        trim: true,
        // use validator...
        //validate: slugValidator
    },
    url: {
        type: String,
        required: true,
    },
    redirects: {
        type: Number,
    },
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;