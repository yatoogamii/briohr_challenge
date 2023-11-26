import { Module } from "@nestjs/common";
import { NotificationModule } from "./domains/notification/notification.module";
import { UserModule } from "./domains/user/user.module";
import { CompanyModule } from "./domains/company/company.module";
import { ChannelModule } from "./domains/channels/channel.module";
import { UIChannelModule } from "./domains/channels/ui/ui-channel.module";

@Module({
  imports: [
    UserModule,
    CompanyModule,
    NotificationModule,
    ChannelModule,
  ],
})
export class AppModule {}
