import { randomUUID } from "node:crypto";
import { User } from "../../domain/entity/User";
import type { IUserRepository } from "../../domain/repository/IUserRepository";
import { CreateUserDTO } from "../dtos/CreateUserDTO";

export class CreateUser {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: CreateUserDTO): Promise<User> {
    const user = new User(randomUUID(), data.name, data.email, data.password);

    if(!user.email || !user.password || !user.name) {
      throw new Error("All fields are required");
    }

    await this.userRepository.create(user);

    return user;
  }
}
