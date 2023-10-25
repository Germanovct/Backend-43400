import MongoSigleton from "./MongoSingleton.js";

const mongoInstance = MongoSigleton.getInstance();

const anotherMongoInstance = MongoSigleton.getInstance();

console.log(mongoInstance === anotherMongoInstance);
