const express = require("express");
const db = require("./config/database");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users.js");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.sync()
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("La aplicación está en funcionamiento en el puerto 3000");
});

module.exports = app;