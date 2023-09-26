import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
  res.render('login');
})
router.get('/signup', (req, res) => {
  res.render('signup');
} )


router.get('/', (req, res) => {
  res.render('index', {});
});

router.get("/adminHome", (req, res) => {
  res.render("adminHome");
});

router.get("/clientHome ", (req, res) => {
  res.render("clientHome");
});





router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: [] });
});


export default router;
