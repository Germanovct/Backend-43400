import ProductRepository from './product.repository.js';

class ProductManager {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async getProducts() {
    return this.productRepository.findAll();
  }

  async addProduct(obj) {
    return this.productRepository.create(obj);
  }

  async getProductsById(id) {
    return this.productRepository.findById(id);
  }
}

export default new ProductManager(ProductRepository);
