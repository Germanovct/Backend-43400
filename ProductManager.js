
import { productsModel } from "./src/db/models/products.model.js";

export default class ProductManager {
  async getProducts() {
    try {
      const products = await productsModel.find();
      return products;
    } catch (error) {
      return error;
    }
  }

  async addProduct(obj) {
    try {
      const newProduct = await productsModel.create(obj); // Usar create para agregar un producto
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async getProductsById(id) {
    try {
      const product = await productsModel.findById(id);
      return product;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      const deleteProduct = await productsModel.findByIdAndDelete(id);
      return deleteProduct;
    } catch (error) {
      return error;
    }
  }
}



   /* constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const infoArchivo = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(infoArchivo);
            } else {
                return [];
            }

        } catch (error) {
            return (error)
        }
    }

    async addProduct(producto) {
        try {
            const productos = await this.getProducts();
            let id = 1;
            if (productos.length > 0) {
                id = productos[productos.length - 1].id + 1;
            }
            const newProduct = { id, ...producto };
            productos.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(productos));
            return newProduct;
        } catch (error) {
            return error;
        }
    }
    

    async getProductsbyId(id) {
        try {
            const productos = await this.getProducts();
            const producto = productos.find(producto => producto.id === id);
            if (producto) {
                return producto;
            }
        } catch (error) {
            return (error)
        }
    }

    async updateProduct(id, updatedData) {
        try {
            const productos = await this.getProducts();
            const productIndex = productos.findIndex(producto => producto.id === id);

            if (productIndex !== -1) {
                const updatedProduct = { ...productos[productIndex], ...updatedData };
                productos[productIndex] = updatedProduct;
                await fs.promises.writeFile(this.path, JSON.stringify(productos));
                return updatedProduct;
            } else {
                return null;
            }
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(id) {
        try {
            const productos = await this.getProducts();
            const producto = productos.find(producto => producto.id === id);
            if (producto) {
                const productosFiltrados = productos.filter(producto => producto.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(productosFiltrados));
                return producto;
            }
        } catch (error) {
            return (error)
        }
    }
    

}


const producto1 = {
    title: 'remera',
    description: 'remera de manga larga',
    price: 100,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    code: '1234',
    stock: 100,

};

const producto2 = {
    title: 'pantalon',
    description: 'pantalon corto',
    price: 200,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    code: '234',
    stock: 200,
}

const producto3 = {
    title: 'zapatos',
    description: 'zapatos de cuero',
    price: 300,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    code: '34',
    stock: 300,
    
}



async function pruba() {
    const manager = new ProductManager('Productos.json');
    await manager.addProduct(producto3);
    const product  = await manager.getProducts();
    console.log(product);

    const productIdToFind = 3;


    const ProductId = await manager.getProductsbyId(productIdToFind);
    
    if (ProductId) {
        console.log('Producto encontrado:');
        console.log(ProductId);
    } else {
        console.log('Producto no encontrado');
    }
};*/

//pruba(); 