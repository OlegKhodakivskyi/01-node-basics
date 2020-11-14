exports.validate = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        status: "validation failed",
        message: validationResult.error.message,
      });
    }

    next();
  };
};
