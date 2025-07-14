// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.stack || err.message || err);

  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
