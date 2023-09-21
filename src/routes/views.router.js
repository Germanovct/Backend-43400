import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
  res.render('login');
})

router.get('/', (req, res) => {
  res.render('index', {});
});



router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: [] });
});


export default router;
