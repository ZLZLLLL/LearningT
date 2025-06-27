const errorHandler = (err, ctx) => {
  ctx.status = err.statusCode || 500;
  ctx.body = {
    success: false,
    error: err.message || 'Server Error'
  };
};

module.exports = errorHandler;