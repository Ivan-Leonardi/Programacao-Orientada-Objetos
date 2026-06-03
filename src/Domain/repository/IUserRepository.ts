import { User } from "../entity/User";

export interface IUserRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
}