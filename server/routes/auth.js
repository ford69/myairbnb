const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

/* Configuration Multer for file upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
})

const upload = multer({ storage })


/* USER REGISTER */
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    /* Take all information from the form */
    const { firstName, lastName, email,password } = req.body

    /* The uploaded file is available as req.file */
    const profileImage = req.file
    if(!profileImage){
        return res.status(400).send("No file uploaded")
    }

    /*path to the uploaded profile photo */
    const profileImagePath = profileImage.path

    /* Check if user exist */
    const existingUser = await User.findOne({ email })
    if ( existingUser){
        return res.status(409).json({ message: "User already exists!"})
    }

    /* Hash the password*/
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    /* Create a new user */
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
        profileImagePath
    });

    /* Save the new user */
    await newUser.save()

    /* Send a success message */ 
    res.status(200).json({message:"User registered successfully!", user: newUser})
  } catch (err) {
    console.log(err)
    res.status(500).json({message:"Registration Failed!", error: err.message})
  }
});

/* USER LOGIN */
router.post("/login", async(req, res) =>{
    try {
    /* Take info from the form */
    const { email, password } = req.body

    /* Check if user exists */
    const user = await User.findOne({ email })
    if(!user){
        return res.status(409).json({message: "User does not exist!"});
    }

    /* Compare password with the hashed password */
    const isMatch = await bcrypt.compare(password,user.password) 
    if(!isMatch) {
            return res.status(400).json({message: "Invalid Credentials"})
    } 

      /* Generate JWT Token */
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      delete user.password

      res.status(200).json({ token, user})

    } catch (err) {
      console.log(err)
      res.status(500).json({ error:err.message})
    }
})


module.exports = router
