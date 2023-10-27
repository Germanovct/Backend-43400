import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT ,
    MONGO_URI: process.env.MONGO_URI,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD
}