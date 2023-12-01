import express from 'express';
import { loggerDev, loggerProd } from '../loggerConfig.js';

const router = express.Router();

router.get('/', (req, res) => {
  loggerDev.debug('Mensaje de debug');
  loggerDev.http('Mensaje HTTP');
  loggerDev.info('Mensaje informativo');
  loggerDev.warning('Mensaje de advertencia');
  loggerDev.error('Mensaje de error');
  loggerDev.fatal('Mensaje fatal');

  res.send('Logs generados.');
});

export default router;
