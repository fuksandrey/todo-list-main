//app.js
const express = require("express");
const bodyParser = require("body-parser");
const task = require("./routes/propduct.route"); // Imports routes for the tasks
const cors = require("cors");
const app = express();
const corsMiddleware = require("./middleware/cors.middleawre");

const corsOptions = {
  origin: ["http://localhost:3000"], // домен сервиса, с которого будут приниматься запросы
  optionsSuccessStatus: 200, // для старых браузеров
};

// app.use(corsMiddleware);

app.use(cors(corsOptions));

// Set up mongoose connection
const mongoose = require("mongoose");
//connect mongodb
let dev_db_url =
  "mongodb+srv://AndreyFuks:03006022@cluster0.8siqs.mongodb.net/Cluster0?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/tasks", task);

let port = 8080;

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});

// mongo compass посмотр редактирование бд
// rename routes/everything
// rename bd
// создать api на фронте для хранения запросов
// uuidv4
