const { Router } = require("express");
const UserController = require("../controller/userController");
const userRouter = new Router();

userRouter.get("/", UserController.getUsers);
userRouter.post("/", UserController.createUser);

module.exports = userRouter;
