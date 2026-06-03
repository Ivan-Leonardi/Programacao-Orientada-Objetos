import { User } from "../../domain/entity/User";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { CreateUserDTO } from "../dtos/CreateUserDTO";

export class CreateUser {
  constructor(private userRepository: IUserRepository) { }
  async execute(data: CreateUserDTO): Promise<User> {
    const user = new User(data.id, data.name, data.email, data.password);

    await this.userRepository.create(user);

    return user;
  }
}
