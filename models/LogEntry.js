var mongoose = require('mongoose');
var {Schema} = mongoose.Schema;


// Validator function
const slugValidator = (val) => {
    return val == '/^[\w\-]+$/i';   // may use ===
};

var logEntrySchema = new Schema({
    slug: {
        type: String,
        trim: true,
        // use validator...
        validate: slugValidator
    },
    url: {
        type: String,
        required: true,
    },
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;