import fs from 'fs';

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const infoArchivo = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(infoArchivo);
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }

  async addCart(cart) {
    try {
      const carts = await this.getCarts();

      const maxId = carts.length > 0 ? Math.max(...carts.map((cart) => cart.id)) : 0;

      const newCart = { id: maxId + 1, ...cart, products: [] };
      carts.push(newCart);

      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return newCart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === cartId);
      return cart || null;
    } catch (error) {
      throw error;
    }
  }

  async updateCart(updatedCart) {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === updatedCart.id);

      if (cartIndex !== -1) {
        carts[cartIndex] = updatedCart;
      } else {
        throw new Error('El carrito no existe.');
      }

      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }
}
