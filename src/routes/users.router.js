
import { Router } from "express";
import { usersManager } from "../db/usersManager.js";
import { hashData } from "../utils.js";
import passport from "passport";
import { getUsers, createUser, getCurrentUser } from "../controllers/users.controllers.js";
import { checkRoleMiddleware } from "../middlewares/checkRole.js";
import { transporter } from "../nodemailer.js";

const router = Router();    

// Obtener todos los usuarios con datos principales
router.get('/', async (req, res) => {
  try {
    const users = await usersManager.getAllUsers();
    const simplifiedUsers = users.map(user => ({
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
      role: user.role,
    }));
    res.status(200).json(simplifiedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const deletedUsers = await usersManager.deleteInactiveUsers();

    deletedUsers.forEach(async user => {
      try {
        const mailOptions = {
          from: 'germanovct@gmail.com',
          to: user.email,
          subject: 'Eliminación por inactividad',
          text: 'Tu cuenta ha sido eliminada por inactividad. Contáctanos para más información.',
        };

        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${user.email}`);
      } catch (error) {
        console.error(`Error al enviar correo a ${user.email}: ${error}`);
      }
    });

    res.status(200).json({ message: 'Usuarios inactivos eliminados' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuarios inactivos' });
  }
});

// Crear vista para administradores
router.get('/adminHome', checkRoleMiddleware('admin'), async (req, res) => {
  // Lógica para renderizar la vista de administrador
});

// Modificar endpoint de eliminación de productos
router.delete('/admin/deleteProduct/:productId', checkRoleMiddleware('admin'), async (req, res) => {
  try {
    const productId = req.params.productId;
    // Verifica si el producto pertenece a un usuario premium y envía correo si es necesario
    // Lógica para enviar el correo al usuario premium
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});

 router.post('/signup', async (req, res) => {
    const {first_name,last_name, username, password } = req.body;
    if (!first_name || !last_name || !username || !password) {
        return  res.status(400).json({message: " missing data"});
    }
    const userDB = await usersManager.findUser(username);
    if (userDB) {
        return res.status(400).json({message: "user already exists"});
    }
    const hashPassword = await hashData(password);
    const newUser = await usersManager.createUser({...req.body, password: hashPassword});
    res.status(200).json({message: "user created", user: newUser});
 })

 router.get ('/home', async (req, res) => {
    const {username} = req.session;
 const userDB = await usersManager.findUser(username);
    if (userDB.isAdmin){
        res.redirect ("/api/views/adminHome")
    } else {
        res.redirect ("/api/views/clientHome")
    }
    
    })

    //passport github
    router.get('/githubSignup', passport.authenticate('github', { scope: [ 'user:email' ] }));
    
    router.get('/github', passport.authenticate('github'), async (req, res) => {
        console.log(req)
        res.send("Bienvenido desde github");
    });



router.get('/', getUsers);
router.post('/', createUser);

router.get('/current', getCurrentUser);

//CheckRoles

// Rutas solo disponibles para administradores
router.post('/admin/createProduct', passport.authenticate('local'), checkRoleMiddleware('admin'), async (req, res) => {
    try {
      const { name, description, code, image, price, stock } = req.body;
      const newProduct = new Product({
        name,
        description,
        code,
        image,
        price,
        stock,
      });
  

      await newProduct.save();
  
      return res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al crear el producto' });
    }
  });
  
  router.put('/admin/updateProduct/:productId', checkRoleMiddleware('admin'), async (req, res) => {
    try {
      const productId = req.params.productId;
      const { name, description, code, image, price, stock } = req.body;
      
 
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      existingProduct.name = name;
      existingProduct.description = description;
      existingProduct.code = code;
      existingProduct.image = image;
      existingProduct.price = price;
      existingProduct.stock = stock;
  

      await existingProduct.save();
  
      return res.status(200).json({ message: 'Producto actualizado exitosamente', product: existingProduct });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al actualizar el producto' });
    }
  });
  
  
  router.delete('/admin/deleteProduct/:productId', checkRoleMiddleware('admin'), async (req, res) => {
    try {
      const productId = req.params.productId;
      

      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  

      await existingProduct.remove();
  
      return res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al eliminar el producto' });
    }
  });
  
  

  router.post('/addToCart', checkRoleMiddleware('usuario'), (req, res) => {
    const productId = req.body.productId;
    const quantity = req.body.quantity;
  
 
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
  

    const user = req.user;

    const product = getProductById(productId); 
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
  

    user.shoppingCart.push({ product, quantity });
  
    return res.status(200).json({ message: 'Producto agregado al carrito exitosamente', user });
  });
  
  
// Definición de la estructura del chat
const chat = [];

// ...

router.post('/sendMessage', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  const user = req.user;
  const message = req.body.message;

  if (!message) {
    return res.status(400).json({ message: 'El mensaje no puede estar vacío' });
  }

  chat.push({ user, message });

  return res.status(200).json({ message: 'Mensaje enviado al chat exitosamente', chat });
});

  



export default router;

