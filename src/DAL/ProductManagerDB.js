import { productsModel } from "../db/models/products.model.js";

class ProductManager {
    async getProducts() {
        try {
           
            const products = await productsModel.find();
            return products; 
        } catch (error) {
            return error;
        }
    }

    async addProduct(obj) {
        try {
            
            const newProduct = await new productsModel(obj).save();
            return newProduct; 
        } catch (error) {
            return error;
        }
    }

    async getProductsById(id) {
        try {
            
            const product = await productsModel.findById(id);
            return product; 
        } catch (error) {
            return error;
        }
    }
}
