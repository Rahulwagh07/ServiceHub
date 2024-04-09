const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Import routes
const userRoutes = require("./routes/User");
const serviceCenterRoutes = require("./routes/ServiceCenter");
const categoryRoutes = require("./routes/Category");
const profileRoutes = require("./routes/Profile");
const contactusRoutes = require("./routes/Contact");


dotenv.config();

const PORT = process.env.PORT || 4000;

// Database connect
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp",
  })
);

// Cloudinary connection
cloudinaryConnect();

app.use("/api/auth", userRoutes);
app.use("/api/serviceCenter", serviceCenterRoutes);
app.use("/api", categoryRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/contact", contactusRoutes);


app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Server chal raha hai",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
