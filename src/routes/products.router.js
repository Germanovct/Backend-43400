import { Router } from "express";
import ProductManager from "../DAL/ProductManager.js";
import CustomError from "../services/errors/customErrors.js";


/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Agrega un nuevo producto.
 *     description: Crea un nuevo producto y lo agrega a la lista de productos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título del producto.
 *               price:
 *                 type: number
 *                 description: El precio del producto.
 *               description:
 *                 type: string
 *                 description: La descripción del producto.
 *             example:
 *               title: Producto 1
 *               price: 10
 *               description: Este es el producto 1
 *     responses:
 *       '200':
 *         description: Producto agregado correctamente.
 *       '400':
 *         description: Error al agregar el producto.
 *       '500':
 *         description: Ocurrió un error al agregar el producto.
 */

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









