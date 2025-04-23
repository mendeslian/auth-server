import ResponseHandler from "../utils/responseHandler.js";

export const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => {
        const field =
          detail.context.key.charAt(0).toUpperCase() +
          detail.context.key.slice(1);
        return detail.message.replace(/^"[^"]+"/, field);
      });
      return ResponseHandler.badRequest(res, errors.join(", "));
    }

    next();
  };
};
