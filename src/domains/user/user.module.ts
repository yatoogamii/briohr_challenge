import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./repositories/user.repository";
import { UserJsonRepository } from "./repositories/user-json.repository";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, {
    provide: UserRepository,
    useClass: UserJsonRepository,
  }],
  exports: [UserService],
})
export class UserModule {}
