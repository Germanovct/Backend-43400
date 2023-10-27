import ProductModel from '../db/models/products.model.js';
import ProductRepository from './product.repository.js';

class ProductMongooseRepository extends ProductRepository {
  async create(product) {
    const newProduct = await ProductModel.create(product);
    return newProduct;
  }

  async findById(id) {
    return ProductModel.findById(id).exec();
  }

  async findAll() {
    return ProductModel.find().exec();
  }

  async update(id, product) {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, {
      new: true,
    }).exec();
    return updatedProduct;
  }

  async delete(id) {
    const deletedProduct = await ProductModel.findByIdAndDelete(id).exec();
    return deletedProduct;
  }
}

export default new ProductMongooseRepository();
