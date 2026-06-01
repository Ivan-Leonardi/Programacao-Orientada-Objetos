import { User } from "../../Domain/entity/User";
import { CreateUserDTO } from "../dtos/CreateUserDTO";

export class CreateUser {
  async execute(data: CreateUserDTO): Promise<User> {
    const user = new User(data.id, data.name, data.email, data.password);

    return user;
  }
}
