
import { userModel } from "./models/users.model.js";

class UsersManager {
    async createUser(user) {
        try {
            const newUser = await userModel.create(user);
            return newUser;
        } catch (error) {
            console.log(error);
        }



        }
        async findUser (username) {
            try {
                const user = await userModel.findOne({username});
                return user;
            } catch (error) {
                console.log(error);
            }
        
    }}

export const usersManager = new UsersManager();