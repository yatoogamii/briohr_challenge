import { Module } from "@nestjs/common";
import { UIChannelService } from "./ui-channel.service";
import { UIChannelController } from "./ui-channel.controller";
import { NotificationModule } from "src/domains/notification/notification.module";

@Module({
  imports: [],
  controllers: [UIChannelController],
  providers: [UIChannelService],
  exports: [UIChannelService],
})
export class UIChannelModule {}
