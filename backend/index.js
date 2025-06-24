const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const donorRoutes = require("./routes/donorRoutes");
const stateDistrictRoutes = require("./routes/stateDistrict");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST"]
}));


app.get("/", (req, res) => {
  res.json({ message: "LifeBridge API is running!", status: "OK" });
});

app.use("/api/donate", donorRoutes);
app.use("/api/location", stateDistrictRoutes); 

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
});
