import { CreateUserDto } from "../dto/user.dto";
import { User } from "../models/user.model";

export abstract class UserRepository {
  abstract save(user: CreateUserDto): Promise<User>;
  abstract getById(userId: string): Promise<User>;
}
