import { User } from "../../Domain/entity/User";
import { IUserRepository } from "../../Domain/repository/IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async update(user: User): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index === -1) return false;
    this.users[index] = user;
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    return this.users.length < initialLength;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null;
  }
}