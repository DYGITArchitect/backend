class ApiError extends Error {
  status;
  erorrs;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.erorrs = errors;
  }

  static unathorizedError() {
    return new ApiError(401, "User is not authorise");
  }

  static badRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}

export default ApiError;
