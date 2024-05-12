const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
// MongoDB Connection
const secret = process.env.SECRET; // Use environment variables for security
//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    console.log(user.username);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }

  //LOGIN
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(400).json("Wrong credentials!");

      const validated = await bcrypt.compare(req.body.password, user.password);
      !validated && res.status(400).json("Wrong credentials!");
      // Create a JWT
      const token = jwt.sign(
        { id: user._id, username: user.username },
        secret,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token });

      // const { password, ...others } = user._doc;
      // res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});
// Protected route example
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    // console.log(req.user); // Attach decoded user info to request
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Protected route to fetch user data
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude the password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Return user data
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
