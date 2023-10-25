import mongoose from "mongoose";

export default class MongoSigleton {
    static #instance ;

    constructor() {
        mongoose.connect ('Url' , {
            useNewUrlParser: true, 
            useUnifiedTopology: true})
}
    static getInstance() {
        if (!this.#instance) {
            this.#instance = new MongoSigleton();
        }
        return this.#instance;
    }
}