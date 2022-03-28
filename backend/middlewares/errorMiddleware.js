const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;

  res.status(statusCode);

  res.json({
    message: { eng: err.message, fr: err?.translatedMessage?.fr || "مشکلی سمت سرور رخ داده است!" },
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
