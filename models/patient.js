var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Medicament=require('./medicament');
var Measure=require('./measure');

var PatientSchema = new Schema({
    document:{
        type:String,
        unique:true,
        index:true
    },
    name: String,
    medicaments: [Medicament],
    measures: [Measure.MeasureSchema]
});

module.exports = mongoose.model('Patient', PatientSchema);