import { Router } from "express";


const router = Router();


router.post('/', async (req, res) => {
    const {username , passwornd} = req.body;
    //req.session = [username] = username
    //req.session = [passwornd] = passwornd
    console.log (req)
    res.send ("Probando sessions")

})

export default router;
