import { Module } from "@nestjs/common";
import { EmailChannelService } from "./email-channel.service";
import { EmailChannelController } from "./email-channel.controller";

@Module({
  imports: [],
  controllers: [EmailChannelController],
  providers: [EmailChannelService],
  exports: [EmailChannelService],
})
export class EmailChannelModule {}
