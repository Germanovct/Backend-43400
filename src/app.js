import express from 'express';
import http from 'http';
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import usersRouter from "./routes/users.router.js";
import productPersistencia from "./routes/product.persistencia.router.js"
import mailerRouter from "./routes/mailer.router.js"
import currentRouter from "./routes/users.router.js"
import mocksproducts from "./routes/mocksproducts.router.js";
import loggerRouter from "./routes/logger.router.js";
import { errorHandler } from './middlewares/errorHandler.js';

import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { initializeWebSocketServer } from './sockets/socket.js';
import viewsRouter from './routes/views.router.js';
import "./db/dbConfig.js"
import cookieParser from 'cookie-parser';
import loginRouter from './routes/login.router.js';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import "./passport/passportStrategies.js"
import config from './config.js';
import cors from 'cors';
import { loggerDev, loggerProd } from './loggerConfig.js';






const app = express();
const httpServer = http.createServer(app);



 
// Middlewares
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  
  loggerDev.log("Solicitud recibida:", req.method, req.url);
  loggerDev.log("Cuerpo de la solicitud:", req.body);

  next(); 
});


app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Cookie
app.use(cookieParser());

app.get ('/api/cookie', (req, res) => {
  res.cookie('miCookie', 'Prueba cookie').send ('<h1>Prueba Cookie</h1>')
})
app.get ('/api/guardarcookie', (req, res) => {
  res.cookie('miCookie1', 'Mi primera cookie').send ('<h1>Cookie</h1>')
})
app.get ('/api/leerCookie', (req, res) => {
   console.log(req)
   res.json({message: "Leyendo cookie" , ...req.cookies, ...req.signedCookies})  
})
app.get ('/api/borrarCookie', (req, res) => {
   res.clearCookie('miCookie1').send ('<h1>Borrando Cookie</h1>')
})

//Sessions
const MONGO_URI = config.MONGO_URI;

app.use(session({ 
  store : new mongoStore ({
  mongoUrl: MONGO_URI,
  }), 
  secret: 'XXXXXXX', 
  cookie: {maxAge: 60000},

}));

//Passport
app.use (passport.initialize());
app.use (passport.session());



app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/login', loginRouter);
app.use('/api/views', viewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/productPersistencia', productPersistencia);
app.use('/api/mailer', mailerRouter);
app.use('/api/current', currentRouter);
app.use('/', mocksproducts);
app.use('/api/loggerTest', loggerRouter);

app.use('/', viewsRouter);
app.use(errorHandler);

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');



app.get('/hola', (req, res) => {
  const testUser = {
    name: "Geroc",
    last_Name: "XXXX", 
  };
  res.render('index', testUser);
});


const productList = [];


const io = initializeWebSocketServer(httpServer, productList);

io.on('connection', socket => {
  loggerDev.debug('Cliente conectado');
  socket.on('createProduct', newProduct => {
    productList.push(newProduct);
    io.emit('productList', productList);
  });
});
// ...


const PORT = config.PORT;

httpServer.listen(PORT, () => {
  loggerDev.info(`Escuchando en el puerto ${PORT}`);
});






