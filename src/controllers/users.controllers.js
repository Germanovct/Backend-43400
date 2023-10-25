import { getAll, create } from "../services/users.service.js";

export const getUsers = async (req, res) => {
    const users = await getAll();
  res.json(users);
}

export const createUser = async (req, res) => {
    const {firstname, lastname, email, password} = req.body;
    if(!firstname || !lastname || !email || !password) {return res.status(400).json({message: "Missing data"});
}
const newUser = create (req.body);
res.status(200).json({ user: newUser})
}


