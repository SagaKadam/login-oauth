var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "hadru"
});
connection.connect(function(err) {
  if (!err) {
    console.log("Connected to database succesfully.");
  } else {
    console.log("Error while connecting to the database.");
  }
});

module.exports = connection;

// SET PASSWORD FOR 'root'@'localhost' = PASSWORD('MyNewPass');
