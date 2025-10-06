const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "moonlightstudio",
});

app.get("/", (req, res) => {
  return res.json("From backend side");
});

app.get("/stylists", (req, res) => {
  const sql = "SELECT * FROM stylists";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/stylists/haircut", (req, res) => {
  const sql = "SELECT * FROM stylists WHERE `service` = 'haircut'";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/stylists/straightening", (req, res) => {
  const sql = "SELECT * FROM stylists WHERE `service` = 'straightening'";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/stylists/perm", (req, res) => {
  const sql = "SELECT * FROM stylists WHERE `service` = 'perm'";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/users/get-booking", (req, res) => {
  const { stylist } = req.query;

  if (!stylist) {
    5;
    return res.status(400).json({ error: "Stylist parameter is required" });
  }

  const sql = "SELECT date, time FROM `users-booking` WHERE stylist = ?";

  db.query(sql, [stylist], (err, data) => {
    if (err) {
      console.error("Error fetching booking data:", err);
      return res.status(500).json({ error: "Error fetching booking data" });
    }

    // ส่งข้อมูลวันที่และเวลาที่ stylist มีการจองแล้ว
    res.status(200).json(data);
  });
});

app.get("/get-booked", (req, res) => {
  const sql = "SELECT * FROM `users-booking`";
  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error fetching booked", err);
      return res.status(500).json({ error: "Error fetching booked" });
    }

    res.status(200).json(data)
  });
});

// POST data
app.post("/users/save-booking", (req, res) => {
  const { service, stylist, date, time, customer } = req.body;

  // แปลง customer object เป็น JSON string
  const customerJson = JSON.stringify(customer);

  const sql =
    "INSERT INTO `users-booking` (service, stylist, date, time, customer) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [service, stylist, date, time, customerJson], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Error saving data");
    }
    res.status(200).send("Data saved successfully");
  });
});

app.post("/add-stylist", (req, res) => {
  const { id, name, service, experience } = req.body;

  const sql =
    "INSERT INTO `stylists` (id, name, service, experience) VALUES (?, ?, ?, ?)";

  db.query(sql, [id, name, service, experience], (err, result) => {
    if (err) {
      console.log("Error add stylist:", err);
      return res.status(500).send("Error add stylist");
    }
    res.status(200).send("Stylist add successfully");
  });
});

app.post("/delete-stylist", (req, res) => {
  const { id } = req.body;

  const sql = "DELETE FROM `stylists` WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).send("Error deleting data");
    }
    res.status(200).send("Data deleted successfully");
  });
});

app.post("/delete-booked", (req, res) => {
  const { id } = req.body;
  const sql = "DELETE FROM `users-booking` WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log('Error deleting booked', err)
      return res.status(500).send('Error deleting booked');
    }
    res.status(200).send('Booked deleted successfully');
  })
})

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
