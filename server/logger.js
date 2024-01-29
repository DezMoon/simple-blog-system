const express = require("express");

module.exports = function loggerMiddleware(req, res, next) {
  console.log(
    `Method: ${req.method} | Path: ${req.path} | Timestamp: ${new Date()}`
  );
  next(); // Pass control to the next middleware or route handler
};
