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

const app = express();
const httpServer = http.createServer(app);



 
// Middlewares
app.use(express.json());

app.use((req, res, next) => {
  // Registra la solicitud entrante para depuración
  console.log("Solicitud recibida:", req.method, req.url);
  console.log("Cuerpo de la solicitud:", req.body);

  next(); // Continúa con el procesamiento de la solicitud
});


app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
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



