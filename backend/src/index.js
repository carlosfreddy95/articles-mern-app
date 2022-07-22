"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const port = 3900;

let url = "mongodb://localhost:27017/api_rest_reactarticles";

//Evitar errores de conexión de mongodb
mongoose.Promise = global.Promise;

//Conexión con rutas
let article_routes = require("./routes/article");

//Cargamos body-parser, middleware para analizar cuerpos a través de la URL
app.use(bodyParser.urlencoded({ extended: false }));

//Cualquier petición la convertimos a formato JSON
app.use(bodyParser.json());

//Activamos el CORS para permitir las peticiones asíncronas AJAX y HTTP desde el frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//cargar archivos de rutas
app.use("/api", article_routes);

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("Conexión a BD con éxito!");
  app.listen(port, () => {
    console.log("Lanzando la app en el puerto " + port);
  });
});
