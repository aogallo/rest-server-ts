import { Response, Request, NextFunction } from 'express'
import { CustomError } from '@errors/customError'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    })
  }

  console.error(err)

  // common error
  res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  })
}

