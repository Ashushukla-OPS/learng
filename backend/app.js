const express = require("express");
const cookieParser = require("cookie-parser");

const authRouter = require("./Routes/auth.router");
const challengeRouter = require("./Routes/challenge.router");
const cors = require("cors")
const journalRouter = require("./Routes/journal.router");
const dashboardRouter = require("./Routes/dashboard.router");
const searchRouter = require("./Routes/search.router")
const profileRouter = require("./Routes/profile.router");
// const { profilecontroller } = require("./controllers/profile.controller");
const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://learng-niuh.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRouter);
app.use("/api/journal", journalRouter);
app.use("/api/challenge", challengeRouter);
app.use("/api/details",dashboardRouter)
app.use("/api/journal",searchRouter)
app.use("/api/profile",profileRouter )
module.exports = app;