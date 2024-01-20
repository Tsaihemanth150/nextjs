import connectDb from "@/middleware/connectDB";
import Ticket from "@/models/Ticket";
const handler = async (req,res) =>{
    let ticket = await Ticket.find()
    res.status(200).json({ ticket })
}

export default connectDb(handler);