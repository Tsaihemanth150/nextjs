import connectDb from "@/middleware/connectDB";
import Restaurant from "@/models/Restaurant";
const handler = async (req,res) =>{
    let restaurant = await Restaurant.find()
    res.status(200).json({ restaurant })
}

export default connectDb(handler);