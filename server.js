const express = require("express");
const { sequelize } = require("./models");
const app = express();
require('dotenv').config(); // this is important!

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World updated!");
});

app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/post"));
// sequelize
//   .authenticate()
//   .then(function (err) {
//     console.log('Database connected.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });
app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
});
