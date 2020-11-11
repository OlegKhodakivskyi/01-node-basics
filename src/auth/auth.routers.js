const { Router } = require("express");
const Joi = require("joi");
const authRouter = Router();
const AuthController = require("./auth.controllers");
const { validate } = require("../helpers/validate");
const { errCatch } = require("../helpers/errCatch");
const { authorize } = require("../helpers/authorize");

const registerScheme = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

authRouter.post(
  "/sign-up",
  validate(registerScheme),
  errCatch(AuthController.createNewUser)
);

authRouter.post(
  "/sign-in",
  validate(registerScheme),
  errCatch(AuthController.loginUser)
);

authRouter.post(
  "/logout",
  errCatch(authorize),
  errCatch(AuthController.logout)
);

module.exports = authRouter;
