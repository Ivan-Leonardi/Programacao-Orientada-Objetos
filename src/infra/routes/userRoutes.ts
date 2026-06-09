import { Router } from "express";
import { UserController } from "../controllers/UserController";

export function createUserRoutes(): Router {
  const router = Router();

  const userController = new UserController();

  router.get("/", (req, res) => {
    userController.getAllUsers(req, res);
  });

  router.get("/:id", (req, res) => {
    const userId = req.params.id;
    userController.getUserById(req, res);
  });

  router.post("/", (req, res) => {
    userController.createUser(req, res);
  });

  router.put("/:id", (req, res) => {
    userController.updateUser(req, res);
  });

  router.delete("/:id", (req, res) => {
    userController.deleteUser(req, res);
  });

  return router;
}
