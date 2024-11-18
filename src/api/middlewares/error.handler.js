function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function mongooseHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      statusCode: 409,
      message: err.name,
      errors: Object.keys(err.errors).map(key => ({
        field: key,
        message: err.errors[key].message
      }))
    });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}



module.exports = { logErrors, mongooseHandler, boomErrorHandler, errorHandler };
