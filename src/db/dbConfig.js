import mongoose from 'mongoose';

//Database
const URI = 'mongodb+srv://germanovct:xKFq1VM03bw0LE4i@cluster0.xjdog2s.mongodb.net/ecommerceDB?retryWrites=true&w=majority';
mongoose.connect(URI)
  .then(() => console.log('conectado a la base de datos'))
  .catch(err => console.log(err));