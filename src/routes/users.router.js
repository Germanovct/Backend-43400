
import { Router } from "express";
import { usersManager } from "../db/usersManager.js";
import { hashData } from "../utils.js";
 

const router = Router();    

 router.post('/signup', async (req, res) => {
    const {first_name,last_name, username, password } = req.body;
    if (!first_name || !last_name || !username || !password) {
        return  res.status(400).json({message: " missing data"});
    }
    const userDB = await usersManager.findUser(username);
    if (userDB) {
        return res.status(400).json({message: "user already exists"});
    }
    const hashPassword = await hashData(password);
    const newUser = await usersManager.createUser({...req.body, password: hashPassword});
    res.status(200).json({message: "user created", user: newUser});
 })




export default router;

