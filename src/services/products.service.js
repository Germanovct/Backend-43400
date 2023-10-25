import ProductManager from "../DAL/product.manager.js";

const productManager = new ProductManager();

export const getAllProducts = async () => {
    return await productManager.getProducts();
}

export const createProduct = async (productData) => {
    return await productManager.addProduct(productData);
}

export const getProductById = async (id) => {
    return await productManager.getProductsById(id);
}

export const deleteProduct = async (id) => {
    return await productManager.deleteProduct(id);
}
