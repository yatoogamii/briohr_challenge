import { Module } from "@nestjs/common";
import { UIChannelModule } from "./ui/ui-channel.module";
import { EmailChannelModule } from "./email/email-channel.module";
import { UIChannelService } from "./ui/ui-channel.service";
import { EmailChannelService } from "./email/email-channel.service";

// @Discuss I had problem to pass different implementation of the same Service without writing it like this with a hard coded useFactory that's why I let it that way

@Module({
  imports: [UIChannelModule, EmailChannelModule],
  controllers: [],
  providers: [
    {
      provide: "ChannelServiceGateway",
      useFactory: (
        uiChannelService: UIChannelService,
        emailChannelService: EmailChannelService,
      ) => ({
        "ui": uiChannelService,
        "email": emailChannelService,
      }),
      inject: [UIChannelService, EmailChannelService],
    },
  ],
  exports: ["ChannelServiceGateway"],
})
export class ChannelModule {}
