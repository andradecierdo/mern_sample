import { NextFunction, Request, Response } from 'express'
import { IExpressHook } from '../../interfaces'
import { Logger } from '../utilities'

const logApiRequests = (): IExpressHook => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { body, method, path } = req
    if (path.startsWith('/api')) {
      let message = `\n${method} + ${path} + \nreq.body: ${JSON.stringify(body, null, 2)}`
      Logger.logInfo(message)
    }
    next()
  }
}

export default logApiRequests
