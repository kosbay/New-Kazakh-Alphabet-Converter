var mongoose = require('mongoose');

var alphabetSchema = mongoose.Schema({
    latinUpper: String,
    cyrilUpper: String,
    latinLower: String,
    cyrilLower: String
})

module.exports = mongoose.model('Alphabet', alphabetSchema);
