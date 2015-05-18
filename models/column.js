var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Title: String,
    Elements: [ { ElementId: Schema.Types.ObjectId }]
});


module.exports = mongoose.model('Column', schema);
