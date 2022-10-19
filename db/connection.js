const mongoose = require('mongoose');


// FOR DATA-BASE CONNECTION  
const config = {
    uri:"mongodb://localhost:27017"
}

exports.createConnection = function() {
    mongoose.connect(config.uri).then(function(connection) {    
        console.log(`connected to ${connection.connection.host}`)
     });
}
