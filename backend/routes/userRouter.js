const { Router } = require("express");
// const AuthController = require('../services/auth');
const UserController = require("../controller/userController");

const userRouter = new Router();

userRouter.get("/", UserController.getUsers);
//userRouter.get('/:id',UserController.getUser);

userRouter.post("/", UserController.createUser);

// userRouter.patch("/:id", AuthController.verify, UserController.updatePassword);

// userRouter.put('/:id',UserController.updateUser);

// userRouter.delete('/:id',UserController.deleteUser);

module.exports = userRouter;
