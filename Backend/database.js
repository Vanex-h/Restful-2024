const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost", //  MySQL server host
  user: "root", //  MySQL username
  password: "", //  MySQL password
  database: "restful_2024", //  MySQL database name
});

// Connect to the database
const connectingToDb = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.log("Error connecting to Db");
        reject(err);
      } else {
        console.log("Connection established");
        resolve();
      }
    });
  });
};

module.exports = {
  connectingToDb,
  connection,
};
