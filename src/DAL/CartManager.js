import { cartModel } from "../db/models/cart.model.js";

export default class CartManager {
  async getCarts() {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      throw error;
    }
  }

  async addCart(cart) {
    try {
      const newCart = new Cart({ ...cart, products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await cartModel.findById(cartId);
      return cart || null;
    } catch (error) {
      throw error;
    }
  }

  async updateCart(updatedCart) {
    try {
      const cart = await cartModel.findByIdAndUpdate(updatedCart._id, updatedCart, { new: true });
      if (!cart) {
        throw new Error('El carrito no existe.');
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }
}
