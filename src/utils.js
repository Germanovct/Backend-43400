
import {dirname}  from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';




const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export {__filename, __dirname};
export const hashData = async (data) => {
    return await bcrypt.hash(data, 10);}

    export const compareData = async (data, hashData) => {
        return await bcrypt.compare(data, hashData);}