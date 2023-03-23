const express = require("express");
const con = require("../connection");

const router = express.Router();
//get all users info
router.get("/", (req, res) => {
  con.query("SELECT * FROM `userInfo`", (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

// post new user info
router.post("/", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    gender,
    phone,
    address,
    city,
    country,
    age,
    bloodGroup,
    appointmentDate,
    releseDate,
    termsOfService,
  } = req.body;
  if (!termsOfService) {
    res.send("please accept the terms of service");
  } else {
    createUserInfoTable();

    con.query(
      "INSERT INTO `userInfo`(`firstName`, `lastName`,`email`, `bloodGroup`, `gender`,`phone`,`age`,`appointmentDate`,`releseDate`,`address`,`city`,`country`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        firstName,
        lastName,
        email,
        bloodGroup,
        gender,
        phone,
        age,
        appointmentDate,
        releseDate,
        address,
        city,
        country,
      ],
      (err, result) => {
        if (err) { res.send(err); }
        else {
          res.send({ result, message: "user info added", status: "success" });

        }
      });
  }
});
// update userID
router.post("/updateUser", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    gender,
    phone,
    address,
    city,
    country,
    age,
    bloodGroup,
    appointmentDate,
    releseDate,
    user_id
  } = req.body;
  console.log(req.body)
  const query = `UPDATE userInfo SET firstName='${firstName}',lastName='${lastName}', email='${email}',gender='${gender}',phone='${phone}',address='${address}',city='${city}',country='${country}',age=${age},bloodGroup='${bloodGroup}',appointmentDate='${appointmentDate}',releseDate='${releseDate}' WHERE user_id=${user_id}`

  con.query(query, (err, result) => {
    if (err) { res.send(err); }
    else {
      res.send({ result, message: "user update", status: "success" });

    }
  });

});


// delete one user info
router.delete("/:id", (req, res) => {
  con.query(
    "DELETE FROM `userInfo` WHERE `user_id` = ?",
    [req.params.id],
    (err, result) => {
      if (err) res.send(err);
      else
        res.send({ result, message: "user info deleted", status: "success" });
    }
  );
});

const createUserInfoTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS userInfo (
        user_id INT AUTO_INCREMENT,
        firstName VARCHAR(30) NOT NULL,
        lastName VARCHAR(30) NOT NULL,
        email VARCHAR(30) NOT NULL,
        bloodGroup VARCHAR(10) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        phone VARCHAR(15)  NOT NULL,
        age INT NOT NULL,
        appointmentDate VARCHAR(30) NOT NULL,
        releseDate VARCHAR(30) NOT NULL,
        address VARCHAR(50) NOT NULL,
        city VARCHAR(30) NOT NULL,
        country VARCHAR(30) NOT NULL,
        PRIMARY KEY (user_id),
        UNIQUE KEY email (email)
    );`;
  con.query(query, (err, result) => {
    if (err) throw err;
    return result;
  });
};

module.exports = router;
