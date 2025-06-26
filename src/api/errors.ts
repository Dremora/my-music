/* eslint-disable functional/no-class-inheritance */
export class BusinessRuleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BusinessRuleError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnauthenticatedError extends Error {
  constructor() {
    super("User is not authenticated");
    this.name = "UnauthenticatedError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * @public
 */
export function invariant<T>(
  value: T | null | undefined | false,
  error: Error,
): asserts value is T {
  if (value === null || value === undefined || value === false) {
    throw error;
  }
}
