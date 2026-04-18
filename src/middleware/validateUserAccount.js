import { users } from "../store/inMemoryStore.js";

const emailTaken = async (req,res,next)=>{
    const {email} = req.body;
    const takenEmails = users.map(user => user.email); 
    if(takenEmails.includes(email)){
        res.status(409).json({
            success:false,
            message: "An account with this email already exists"
        })
    }
    next();
}
export default emailTaken;