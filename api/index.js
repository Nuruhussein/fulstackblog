const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// // app.use(cors());
// Middleware for handling CORS POLICY
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: [""],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Include Authorization header
    credentials: true,
  })
);

// Middleware for setting Referrer Policy header
app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
  next();
});

app.use("/images", express.static(path.join(__dirname, "/images")));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI; // Use environment variables for security
mongoose
  .connect(mongoURI)
  .then(console.log("Connected to MongoDBatlas"))
  .catch((err) => console.log(err));

///uploding image

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
//getSinglepost
app.get("/", async (req, res) => {
  res.json("hello world");
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running on 5000.");
});
