import express from 'express';
import http from 'http';
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { initializeWebSocketServer } from './sockets/socket.js';
import viewsRouter from './routes/views.router.js';
import "./db/dbConfig.js"
import cookieParser from 'cookie-parser';
import loginRouter from './routes/login.router.js';
import session from 'express-session';
import FileStore from 'session-file-store';

const app = express();
const httpServer = http.createServer(app);



 
// Middlewares
app.use(express.json());

app.use((req, res, next) => {
  
  console.log("Solicitud recibida:", req.method, req.url);
  console.log("Cuerpo de la solicitud:", req.body);

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
const filestore = FileStore(session);
app.use(session({ 
  store : new filestore ({
    path: __dirname+'/sessions'
  }),
  secret: 'XXXXXXX', 
  cookie: {maxAge: 60000},

}));

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/login', loginRouter);
app.use('/api/views', viewsRouter);
app.use('/', viewsRouter);



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
  console.log('Cliente conectado');
  socket.on('createProduct', newProduct => {
    productList.push(newProduct);
    io.emit('productList', productList);
  });
});
// ...




const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



