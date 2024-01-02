import Users from "@/models/Users";
import connectDb from "@/middleware/connectDB";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { email, password } = req.body;
      
      // Find the user by email
      let user = await Users.findOne({ "email": email });

      if (user) {
        // Decrypt the stored password and compare with the provided password
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'key123').toString(CryptoJS.enc.Utf8);

        if (password === decryptedPassword) {
          // Use a more secure secret key and store it in a configuration file or environment variable
          const secretKey = 'key123';

          var token = jwt.sign({  email: user.email, isAdmin:user.isAdmin, name: user.name , wallate:user.wallate}, secretKey,{ expiresIn: '5d' });
          res.status(200).json({success: true, token });
     
        } else {
          res.status  (400).json({ success: false, error: "Invalid credentials" });
        }
      } else {
        res.status(400).json({ success: false, error: "User not found" });
      }
    } else {
      res.status(400).json({ error: "Not allowed" });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export default connectDb(handler);
