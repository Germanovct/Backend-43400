import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

const router = Router();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      description: 'Documentation for your API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/products.router.js', './routes/cart.router.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocs));

export default router;
