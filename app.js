const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();
const port = process.env.PORT || 3000;
// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb://admin:9T1TTS3OB8f6TFpy@cluster0-shard-00-00.tcyf2.mongodb.net:27017,cluster0-shard-00-01.tcyf2.mongodb.net:27017,cluster0-shard-00-02.tcyf2.mongodb.net:27017/Auth?ssl=true&replicaSet=atlas-ryeguk-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(port, () => console.log("listening to port 3000"))
  )
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
