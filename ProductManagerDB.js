import { productsModel } from "./src/db/models/products.model.js";

class ProductManager {
    async getProducts() {
        try {
            // Utilizas el modelo `productsModel` de Mongoose para obtener todos los productos.
            const products = await productsModel.find();
            return products; // Deberías retornar la lista de productos recuperados.
        } catch (error) {
            return error;
        }
    }

    async addProduct(obj) {
        try {
            // Creas un nuevo producto utilizando el modelo `productsModel`.
            const newProduct = await new productsModel(obj).save();
            return newProduct; // Deberías retornar el producto recién creado.
        } catch (error) {
            return error;
        }
    }

    async getProductsById(id) {
        try {
            // Usas el método `findById` del modelo `productsModel` para buscar un producto por ID.
            const product = await productsModel.findById(id);
            return product; // Deberías retornar el producto encontrado o null si no se encuentra.
        } catch (error) {
            return error;
        }
    }
}
