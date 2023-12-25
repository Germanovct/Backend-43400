import { Router } from 'express';
import { productsModel } from '../db/models/products.model.js';
import { cartModel } from '../db/models/cart.model.js';
import TicketModel from '../db/models/tickets.model.js';
import CustomError from '../services/errors/customErrors.js';



const router = Router();

// Ruta para crear un carrito
router.post('/', async (req, res) => {
  try {

    const newCart = await cartModel.create({ products: [] });

    res.status(201).json({ message: 'Carrito creado correctamente.' });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.code).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'No se pudo crear el carrito.' });
    }
  }
});


// Ruta para obtener un carrito por ID
router.get('/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Ruta para actualizar un carrito por ID
router.put('/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const updatedCart = req.body; 
    const cart = await cartModel.findByIdAndUpdate(cartId, updatedCart, { new: true });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
});

// Ruta para eliminar un carrito por ID
router.delete('/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const result = await cartModel.findByIdAndRemove(cartId);
    if (!result) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.status(204).end(); 
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el carrito' });
  }
});

// Función para generar un código único para el ticket
function generateUniqueTicketCode() {
  const timestamp = Date.now();
  const randomValue = Math.floor(Math.random() * 1000);
  return `TICKET-${timestamp}-${randomValue}`;
}

// Ruta para realizar una compra
router.post('/:cid/purchase', async (req, res) => {
  const cartId = req.params.cid;
  const cart = await cartModel.findById(cartId);

  if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }

  const notPurchasedProducts = [];
  let purchaseAmount = 0;
  let purchaserEmail = '';

  for (const product of cart.products) {
    const productInfo = await productsModel.findById(product.product);

    if (productInfo && productInfo.stock >= product.quantity) {
      productInfo.stock -= product.quantity;
      await productInfo.save();
      purchaseAmount += productInfo.price * product.quantity;
    } else {
      notPurchasedProducts.push(product);
    }
  }

  cart.products = notPurchasedProducts;
  await cart.save();

  if (notPurchasedProducts.length === 0) {
    purchaserEmail = 'info.vicentfest@gmail.com'; 
    const ticket = new TicketModel({
      code: generateUniqueTicketCode(),
      amount: purchaseAmount,
      purchaser: purchaserEmail,
    });

    await ticket.save();
  }

  return res.status(200).json({ message: 'Compra realizada', cart, notPurchasedProducts });
});

export default router;
