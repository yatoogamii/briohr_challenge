import { CreateUserDto } from "../dto/user.dto";
import { User } from "../models/user.model";
import { UserRepository } from "./user.repository";

export class UserInMemoryRepository implements UserRepository {
  private users = new Map<string, User>();

  async save(user: CreateUserDto): Promise<User> {
    this.users.set(user.id, user);
    return Promise.resolve(user);
  }

  async getById(userId: string): Promise<User> {
    if (!this.users.has(userId)) return Promise.reject("User not found");
    return Promise.resolve(this.users.get(userId));
  }
}
