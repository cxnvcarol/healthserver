var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MedicamentSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Medicament', MedicamentSchema);