import { User } from "../../domain/entity/User";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";

export class UpdateUser {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: UpdateUserDTO): Promise<boolean> {
    const userRepository = await this.userRepository.findById(data.id);
    if (!userRepository) {
      throw new Error("User not found");
    }

    const user = new User(
      data.id,
      data.name,
      data.email,
      userRepository.password,
    );

    return this.userRepository.update(user);
  }
}
