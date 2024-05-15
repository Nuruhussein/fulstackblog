const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: ["https://nurblog.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
  next();
});
app.use("/images", express.static(path.join(__dirname, "/images")));

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath), req.file.filename);

  try {
    const response = await axios.post(
      "https://api.vercel.com/v1/blob/upload",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        },
      }
    );

    const imageUrl = response.data.url;
    fs.unlinkSync(filePath); // Cleanup the temporary file

    res.status(200).json({ url: imageUrl });
  } catch (err) {
    console.error(err);
    fs.unlinkSync(filePath); // Ensure cleanup on error
    res.status(500).json("Failed to upload file to Vercel Blob Storage");
  }
});

app.get("/", async (req, res) => {
  res.json("Hello world");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running on port 5000.");
});
