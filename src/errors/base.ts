export class ApplicationError<T extends string = string> extends Error {
  constructor(code: ApplicationErrorCode<T>, message?: string, context?: ApplicationErrorContext) {
    super(`ApplicationError: (${code}) ${message ?? ''}`);

    this.code = code;
    this.context = context;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }

  code: ApplicationErrorCode<T>;
  context?: ApplicationErrorContext;
}

export type ApplicationErrorCode<T extends string = string> = T;

export type ApplicationErrorContext = Record<string, unknown>;
