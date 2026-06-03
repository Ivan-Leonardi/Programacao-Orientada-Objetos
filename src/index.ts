import express from "express";
import { createUserRoutes } from "./infra/routes/userRoutes";

const app = express();
app.use(express.json());

app.use('/api/users', createUserRoutes());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
