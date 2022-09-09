const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/footballdbs');

const Schemadb = mongoose.Schema;

var NewplayerSchema = new Schemadb({
    name: String ,
    category: String ,
    age : Number,
    position : String 
});
var playerdata = mongoose.model('Player-data', NewplayerSchema);

module.exports=playerdata