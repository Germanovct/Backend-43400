import { Server } from 'socket.io';

export function initializeWebSocketServer(httpServer, productList) {
  const io = new Server(httpServer);

  io.on('connection', socket => {
    console.log('Cliente conectado');

    
    socket.emit('productList', productList);

  
    socket.on('createProduct', newProduct => {
     
      productList.push(newProduct);

      
      io.emit('productList', productList);
    });
  });

  return io;
}
