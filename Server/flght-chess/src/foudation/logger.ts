import { LoggerService } from '@nestjs/common';

export class KMLogger implements LoggerService {

    tag: string

    constructor(tag: string = 'default') {
        this.tag = tag
    }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
      console.log(`%c[${this.tag}]`, "color:red", ...optionalParams)
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {}
}