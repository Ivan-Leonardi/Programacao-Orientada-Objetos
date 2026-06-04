import type { Request, Response } from "express";
import { GetAllUsers } from "../../application/use-cases/GetAllUsers";
import { FindUserById } from "../../application/use-cases/FindUserById";
import { UserRepositoryInMemory } from "../repository/UserRepositoryInMemory";
import { CreateUser } from "../../application/use-cases/CreateUser";
import { UpdateUserDTO } from "../../application/dtos/UpdateUserDTO";
import { UpdateUser } from "../../application/use-cases/UpdateUser";
import { CreateUserDTO } from "../../application/dtos/CreateUserDTO";
import { DeleteUser } from "../../application/use-cases/DeleteUser";

export class UserController {
  private userRepository: UserRepositoryInMemory;

  constructor() {
    this.userRepository = new UserRepositoryInMemory();
  }

  async getAllUsers(req: Request, res: Response) {
    const repository = this.userRepository;
    const useCase = new GetAllUsers(repository);
    const users = await useCase.execute();

    res.json({ message: "Fetching all users", data: users });
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;

    if (typeof userId !== "string") {
      return res.status(400).json({ message: "User ID is required" });
    }

    const repository = this.userRepository;
    const useCase = new FindUserById(repository);
    const user = await useCase.execute(userId);

    res.json({ message: `Fetching user with ID: ${userId}`, data: user });
  }

  async createUser(req: Request, res: Response) {
    const repository = this.userRepository;
    const useCase = new CreateUser(repository);
    const dto = new CreateUserDTO(
      req.body.name,
      req.body.email,
      req.body.password,
    );
    const user = await useCase.execute(dto);

    res.status(201).json({ message: "Creating a new user", data: user });
  }

  async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const repository = this.userRepository;
    const useCase = new UpdateUser(repository);
    const dto = new UpdateUserDTO(
      req.body.name,
      req.body.email,
      req.body.password,
    );
    const user = await useCase.execute(dto);
    res.json({ message: `Updating user with ID: ${userId}`, data: user });
  }

  async deleteUser(req: Request, res: Response) {
    const userId = req.params.id;
    const repository = this.userRepository;
    const useCase = new DeleteUser(repository);
    const user = await useCase.execute(String(userId));
    res.json({ message: `Deleting user with ID: ${userId}` });
  }
}
