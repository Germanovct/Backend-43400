import { Router } from 'express';
import CartManager from '../../CartManager.js';

const router = Router();

router.post('/', async (req, res) => {
  const cartManager = new CartManager('cart.json');
  const newCart = await cartManager.addCart({ products: [] });
  res.status(201).json(newCart);
});


router.get('/:cid', async (req, res) => {
  const cartManager = new CartManager('cart.json');
  const cid = req.params.cid;
  const cart = await cartManager.getCartById(cid);

  if (cart) {
    res.status(200).json(cart.products);
  } else {
    res.status(404).send('Carrito no encontrado.');
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cartManager = new CartManager('cart.json');
  const cid = req.params.cid;
  const pid = req.params.pid;
  const cart = await cartManager.getCartById(cid);

  if (!cart) {
    return res.status(404).send('Carrito no encontrado.');
  }

  const existingProduct = cart.products.find((product) => product.product === pid);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  await cartManager.updateCart(cart);

  res.status(200).json(cart);
});

export default router;
