
import { Router } from "express";
import { usersManager } from "../db/usersManager.js";
import { hashData } from "../utils.js";
import passport from "passport";
 

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

 router.get ('/home', async (req, res) => {
    const {username} = req.session;
 const userDB = await usersManager.findUser(username);
    if (userDB.isAdmin){
        res.redirect ("/api/views/adminHome")
    } else {
        res.redirect ("/api/views/clientHome")
    }
    
    })

    //passport github
router.get('/githubSignup', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github',passport.authenticate('github') , async (req, res) => {
    res.send("Bienvenido desde github");
});




export default router;

