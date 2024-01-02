import Users from "@/models/Users";
import connectDb from "@/middleware/connectDB";
import signup from "../signup";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { name, email, password, phone,img,pincode } = req.body;
     console.log(req.body)

      // Encrypt the password before storing it in the database
      const encryptedPassword = CryptoJS.AES.encrypt(password, "key123").toString();

      // Create a new user instance
      const newUser = new Users({ name, email, password: encryptedPassword, phone,img,pincode });

      // Save the user to the database
      await newUser.save()
        .then(() => res.status(200).json({ success: "User is added" }))
        .catch((saveError) => {
          console.error("Error saving user to the database:", saveError);
          res.status(500).json({ error: "Error saving user to the database" });
        });
    } else {
      res.status(400).json({ error: "Not allowed" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default connectDb(handler);
