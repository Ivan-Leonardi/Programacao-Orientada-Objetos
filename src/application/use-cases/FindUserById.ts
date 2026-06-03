import { User } from "../../domain/entity/User";
import { IUserRepository } from "../../domain/repository/IUserRepository";

export class FindUserById {
  constructor(private userRepository: IUserRepository) { }

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
