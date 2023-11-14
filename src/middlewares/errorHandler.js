


export function errorHandler(err, req, res, next) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  
    res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  