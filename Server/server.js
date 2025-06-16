// const express = require("express");
// const cors = require("cors");
// const app = express();
// const port = 8000;

// app.use(cors());
// app.use(express.json());

// let items = [
//   { name: "rithik", id: 1 },
//   { name: "gaurav", id: 2 },
//   { name: "suresh", id: 3 },
// ];

// app.get("/items", (req, res) => {
//   res.json(items);
// });

// app.post("/items", (req, res) => {
//   const newItem = {
//     name: req.body.name,
//     id: req.body.id ? req.body.id : Date.now(),
//   };
//   const isUpdate = items.map((item) =>
//     item.id == newItem.id ? newItem : item
//   );
//   items = isUpdate;
//   // items.push(newItem);
//   res.status(201).json(newItem);
// });

// app.delete("/items/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   items = items.filter((item) => item.id !== id);
//   res.status(201).json(items);
// });

// app.listen(port, (err) => {
//   if (err) {
//     console.log("error");
//   } else {
//     console.log(`server has been started on port http://localhost:${port}`);
//   }
// });
/////////////////////////////////////////////////////////////////////////////////////////////////////
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const port = 8000;

// app.use(cors());
// app.use(express.json());

// let formData = [];
// app.get("/form", (req, res) => {
//   res.json(formData);
// });

// app.post("/form", (req, res) => {
//   const newData = {
//     name: req.body.name,
//     phno: req.body.phno,
//     dob: req.body.dob,
//     gender: req.body.gender,
//   };
//   formData.push(newData);
//   res.json(newData);
// });

// app.listen(port, (err) => {
//   if (err) {
//     console.log("error");
//   } else {
//     console.log(`the server has been started on post http://localhost:${port}`);
//   }
// });

// proxy-server.js
// proxy-server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/flights", async (req, res) => {
  const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=2898faffceaa1fbe17907190e468a72f&limit=100`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data); // send raw data to frontend
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
