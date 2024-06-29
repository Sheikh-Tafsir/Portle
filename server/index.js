const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// const auth = require('./middleware/auth')
// const rateLimiter = require('./middleware/rateLimiter')

var corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add the HTTP methods you need
  allowedHeaders: ["Content-Type", "Authorization"], // Add the headers you want to allow
};

// Then use corsOptions in your CORS middleware setup
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});


app.use("/auth", require("./src/auth/route/AuthRoute"));
app.use("/users", require("./src/user/route/UserRoute"));
app.use("/projects", require("./src/projects/route/ProjectsRoute"));
app.use("/experiences", require("./src/experience/route/ExperienceRoute"));


const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
