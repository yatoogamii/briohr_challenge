import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { UserModule } from "../user/user.module";
import { CompanyModule } from "../company/company.module";
import { NotificationRepository } from "./repositories/notification.repository";
import { NotificationJsonRepository } from "./repositories/notification-json.repository";
import { ChannelModule } from "../channels/channel.module";

@Module({
  imports: [
    UserModule,
    CompanyModule,
    ChannelModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService, {
    provide: NotificationRepository,
    useClass: NotificationJsonRepository,
  }],
  exports: [NotificationService, NotificationRepository],
})
export class NotificationModule {}
