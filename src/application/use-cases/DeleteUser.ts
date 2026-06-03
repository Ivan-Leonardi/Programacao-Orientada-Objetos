import type { IUserRepository } from "../../domain/repository/IUserRepository";

export class DeleteUser {
  constructor(private userRepository: IUserRepository) { }

  async execute(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
