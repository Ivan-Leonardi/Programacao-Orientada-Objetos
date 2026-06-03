import { Router } from "express";

export function createUserRoutes(): Router {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({ message: "Fetching all users" });
  });

  router.get("/:id", (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Fetching user with ID: ${userId}` });
  });

  router.post("/", (req, res) => {
    res.json({ message: "Creating a new user" });
  });

  router.put("/:id", (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Updating user with ID: ${userId}` });
  });

  router.delete("/:id", (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Deleting user with ID: ${userId}` });
  });

  return router;
}
