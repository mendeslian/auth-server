class ResponseHandler {
  static success(res, { status = 200, message = "Success", data = null }) {
    return res.status(status).json({
      status: "success",
      message,
      data,
    });
  }

  static error(
    res,
    { status = 500, message = "Internal server error", error = null }
  ) {
    console.error(error);
    return res.status(status).json({
      status: "error",
      message,
      ...(process.env.NODE_ENV === "development" && { error }),
    });
  }

  static badRequest(res, message = "Bad request") {
    return this.error(res, { status: 400, message });
  }

  static notFound(res, message = "Not found") {
    return this.error(res, { status: 404, message });
  }

  static unauthorized(res, message = "Unauthorized") {
    return this.error(res, { status: 401, message });
  }
}

export default ResponseHandler;
