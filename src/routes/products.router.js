import { Router } from "express";
import ProductManager from "../DAL/ProductManager.js";
import CustomError from "../services/errors/customErrors.js";


const router = Router();

router.get('/', async (req, res) => {
  const productManager = new ProductManager('Productos.json');
  const limit = req.query.limit;
  const productos = await productManager.getProducts();

  if (limit) {
    const limitedProducts = productos.slice(0, Number(limit));
    res.status(200).send(limitedProducts);
  } else {
    res.status(200).send(productos);
  }
});

router.post('/', async (req, res) => {
  try {
    const productManager = new ProductManager('Productos.json');
    const newProduct = await productManager.addProduct(req.body); 
    res.status(200).send('Producto agregado correctamente.');
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Ocurrió un error al agregar el producto.' });
    }
  }
});

router.get('/:pid', async (req, res) => {
  const productManager = new ProductManager('Productos.json');
  const pid = req.params.pid;
  const product = await productManager.getProductsbyId(Number(pid));

  if (product) {
    res.send(product);
  } else {
    res.send('Producto no encontrado.');
  }
});

router.delete('/:pid', async (req, res) => {
  const productManager = new ProductManager('Productos.json');
  const pid = req.params.pid;
  const deletedProduct = await productManager.deleteProduct(Number(pid));

  if (deletedProduct) {
    res.status(200).send('Producto eliminado correctamente.');
  } else {
    res.status(404).send('Producto no encontrado.');
  }
});

router.put('/:pid', async (req, res) => {
  const productManager = new ProductManager('Productos.json');
  const pid = req.params.pid;
  const product = req.body;
  const updatedProduct = await productManager.updateProduct(Number(pid), product);

  if (updatedProduct) {
    res.status(200).send('Producto actualizado correctamente.');
  } else {
    res.status(404).send('Producto no encontrado.');
  }
});




export default router;









