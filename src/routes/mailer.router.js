import { Router } from "express";
import { transporter } from "../nodemailer.js";


const router = Router();

router.get ('/', async (req, res) => {
    const messageOpt = { 
        from: 'Backend 43400',
        to: 'info.vincentfest@gmail.com',
        subject: 'Message Prueba proyecto Backend',
        text: 'Mi primer mail desde nodemailer',
        html: '<h1>Mi primer mail desde nodemailer</h1>'
    }
    await transporter.sendMail( messageOpt)
    res.send('Mail enviado')
})
         



export default router