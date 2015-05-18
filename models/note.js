var mongoose = require('mongoose');

module.exports = mongoose.model('Note',{
    Title: String,
    Text: String,
    demo_text: String
});