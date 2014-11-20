
/*
 * GET doctors listing.
 */
 var Patient = require('../models/patient');
 var Measure = require('../models/measure');

exports.list = function(req, res){
 Patient.find(function(err, patients) {
			if (err)
				res.send(err);

			res.json(patients);
		});
};

exports.find = function(req, res){
 Patient.findById(req.params.patient_id,function(err, patient) {
			if (err)
				res.send(err);

			res.json(patient);
		});
};

exports.postMeasure = function (req, res) {
    Patient.findById(req.params.patient_id, function (err, patient) {
        if (err)
            res.send(err);
        var m = new Measure();
        m.name = req.body.name;
        m.value = req.body.value;
        m.date = new Date();
        patient.measures.push(m);
        patient.save(function (err) {
            if (err) return res.send(err);
            console.log('Success!');
        });
        res.json(patient);
    });
};

// create a bear (accessed at POST http://localhost:8080/api/bears)
exports.create = function (req, res) {

    var p = new Patient(); 		// create a new instance of the Bear model
    p.name = req.body.name;  // set the bears name (comes from the request)
    p.document = req.body.document;
    

    // save the bear and check for errors
    p.save(function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'Patient created!' });
    });

};