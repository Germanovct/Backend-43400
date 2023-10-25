import ProductManager from "../DAL/ProductManager.js";

const productManager = new ProductManager();

export const getProducts = async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
}

export const createProduct = async (req, res) => {
    const { name, description, code, image, price, stock } = req.body;


    const newProduct = await productManager.addProduct({
        name,
        description,
        code,
        image,
        price,
        stock
    });

    res.status(200).json(newProduct);
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await productManager.getProductsById(id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await productManager.deleteProduct(id);

    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
}
