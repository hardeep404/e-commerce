let errHandlingMid = (err, req, res, next) => {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  };
  
  module.exports = errHandlingMid;