var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MeasureSchema   = new Schema({
	name: String,
    value: Number,
    date: Date
});

module.exports = mongoose.model('Measure', MeasureSchema);
module.exports.MeasureSchema = MeasureSchema;