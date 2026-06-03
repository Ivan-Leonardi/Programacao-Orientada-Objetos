import { IUserRepository } from "../../domain/repository/IUserRepository";
import { User } from "../../domain/entity/User";

export class GetAllUsers {
  constructor(private userRepository: IUserRepository) { }

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
