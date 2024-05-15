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
    origin: ["https://nurblog.vercel.app"],
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
app.post("/api/upload", async (req, res) => {
  try {
    const base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
    const fileName = Date.now() + ".png";
    fs.writeFileSync(
      path.join(__dirname, "/images/", fileName),
      base64Data,
      "base64"
    );
    res.status(200).json("File has been uploaded");
  } catch (err) {
    console.error(err);
    res.status(500).json("Failed to upload file");
  }
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

// app.post("/api/upload", upload.single("file"), async (req, res) => {
//   try {
//     const filePath = req.file.path; // Path to the uploaded file (temporary)

//     // Upload the file to Vercel Blob Storage within a specific directory (e.g., "images")
//     const result = await vercel.getClient().upload(filePath, "/images");
//     const imageUrl = result.url; // Access uploaded file URL

//     // Persist the image URL in your database (replace with your Mongoose model)
//     const Post = require("./models/Post"); // Assuming you have a Post model
//     const newPost = new Post({
//       // ... other post data
//       photo: imageUrl,
//     });
//     await newPost.save();

//     // Cleanup the temporary file after successful upload
//     fs.unlink(filePath, (err) => {
//       if (err) console.error(err);
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json("Failed to upload file");
//   }
// });
