import { User } from "../models/user.model";
import { UserRepository } from "./user.repository";
import * as jsonData from "./mock/user.json";
import { CreateUserDto } from "../dto/user.dto";

export class UserJsonRepository implements UserRepository {
  private users = new Map<string, User>();

  constructor() {
    jsonData.users.forEach((user: User) => {
      this.users.set(user.id, user);
    });
  }

  async save(user: CreateUserDto): Promise<User> {
    this.users.set(user.id, user);
    return Promise.resolve(user);
  }

  async getById(userId: string): Promise<User> {
    if (!this.users.has(userId)) return Promise.reject("User not found");
    return Promise.resolve(this.users.get(userId));
  }
}
