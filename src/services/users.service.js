import passport from "passport";
import { userManagerInstance } from "../DAL/usersManager.js";

export const getAll = () => {
    const response = userManagerInstance.findAll();
    return response;
};

export const create = (obj) => {
    const response = userManagerInstance.create(obj);
    return response;
}
