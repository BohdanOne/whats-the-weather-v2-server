import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log('Error Handler catched:', error.message)
  res.status(500).json({ message: `error.message` });
};

export default errorHandler;