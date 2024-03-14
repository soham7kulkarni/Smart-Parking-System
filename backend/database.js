const mysql = require('mysql');
const { connect } = require('./routes');

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'sps',
    user: 'root',
    password: 'Soham@12345'
});

connection.connect(function(error){

    if (error) {
        throw error;
    }
    console.log('MySQL database is connected successfully');
});

module.exports = connection;