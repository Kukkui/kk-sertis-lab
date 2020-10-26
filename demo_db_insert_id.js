var mysql = require('mysql');
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "kukkui",
    password: "kukkui",
    database: "kukkui"
  });
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO customers (name, address) VALUES ('KukkuiSertis', 'Sukhumwit35')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
    });
  });