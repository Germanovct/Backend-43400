import { Router } from "express";
import { usersManager } from "../db/usersManager.js";
import { compareData } from "../utils.js";

const router = Router();


router.post('/', async (req, res) => {
    const {username , password} = req.body;
    if (!username || !password) {
        return  res.status(400).json({message: " missing data"});
    }
    const userDB = await usersManager.findUser(username);
    if (!userDB) {
        return res.status(400).json({message: "user not found"});
    }
    const isPasswordValid = await compareData(password, userDB.password);
    if (!isPasswordValid) {
        return res.status(401).json({message: "username or password invalid"});
    }

 
    req.session ["username"] = username
    res.status(200).json({message: "user logged", user: userDB});



})

export default router;
