import { databaseErrorInfo, authenticationErrorInfo, validationErrorInfo } from "./info.js"

export default class CustomError {
  static createError({ name = 'Error', cause, message, code = 1 }) {
    const error = new Error(message, { cause });
    error.name = name;
    error.code = code;
    throw error;
  }

  static databaseError(cause) {
    const message = databaseErrorInfo();
    return this.createError({ name: 'DATABASE_ERROR', cause, message, code: 1 });
  }

  static authenticationError(cause) {
    const message = authenticationErrorInfo();
    return this.createError({ name: 'AUTHENTICATION_ERROR', cause, message, code: 2 });
  }

  static validationError(cause) {
    const message = validationErrorInfo();
    return this.createError({ name: 'VALIDATION_ERROR', cause, message, code: 3 });
  }
}
