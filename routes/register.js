exports.register = async function(req, res) {
  const connection = require('../config/dbConfig');
  const bcrypt = require('bcrypt');
  var saltRounds = 10;
  const password = req.body.password;
  const encryPassword = await bcrypt.hash(password, saltRounds);

  var users = {
    email: req.body.email,
    password: encryPassword
  };

  connection.query("insert into users set ?", users, function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      res.send({
        code: 200,
        success: "user registered sucessfully"
      });
    }
  });
};
