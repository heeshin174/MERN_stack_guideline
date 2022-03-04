// This errorHandler will override express js default error handler.
// Default error handler (HTML) => errorHandler (JSON object)
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    // get, additional information, stack (such as line numbers) only if we're in developing mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
