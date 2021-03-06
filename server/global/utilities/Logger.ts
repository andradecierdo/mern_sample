import debug from 'debug'

class Logger {
  // NOTE: Should only use for debugging.
  public static debug = (input: any): void => {
    Logger.debugLogForDebugging(Logger.prettify(input))
  }

  public static logInfo = (input: any): void => {
    Logger.debugInfo(Logger.prettify(input))
  }

  public static logError = (input: any, title?: string): void => {
    Logger.debugError('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    if (title) {
      Logger.debugError(title)
    }
    Logger.debugError(Logger.prettify(input))
    Logger.debugError('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n')
  }

  public static logSuccess = (message: string): void => {
    if (!message) {
      const defaultMessage = 'Action successful!'
      Logger.debugSuccess(defaultMessage)
    }
    Logger.debugSuccess(message)
  }

  private static debugError = debug('app:error')
  private static debugInfo = debug('app:info')
  private static debugSuccess = debug('app:success')
  private static debugLogForDebugging = debug('app:debug')

  private static prettify = (input: any): any => {
    if (Logger.isObject(input)) {
      return JSON.stringify(input, null, 4)
    }
    return input
  }

  private static isObject = (input: any): boolean => {
    return typeof input === 'object'
  }
}

export default Logger
