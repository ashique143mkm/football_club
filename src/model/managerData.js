const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/footballdbs');

const Schemadb = mongoose.Schema;

var NewmanagerSchema = new Schemadb({
    manager_name: String ,
    manager_sname: String ,
    phone_no : Number,
    house_name : String 
});
var managerdata = mongoose.model('manager-data', NewmanagerSchema);

module.exports=managerdata