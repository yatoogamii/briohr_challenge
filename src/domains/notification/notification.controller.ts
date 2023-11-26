import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
} from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { CreateNotificationRequestDto } from "./dto/notification.dto";
import { UserService } from "../user/user.service";
import { CompanyService } from "../company/company.service";
import { ChannelServiceMapping } from "../channels/models/channel.model";

@Controller("notification")
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private companyService: CompanyService,
    @Inject(
      "ChannelServiceGateway",
    ) private channelServiceGateway: ChannelServiceMapping,
  ) {}

  @Post()
  async send(
    @Body() createNotificationRequestDto: CreateNotificationRequestDto,
  ): Promise<void> {
    try {
      const notification = this.notificationService.create(
        createNotificationRequestDto,
      );

      const [userSubscribedChannels, companySubscribedChannels] = await Promise
        .all([
          this.userService.getSubscribedChannels(notification.userId),
          this.companyService.getSubscribedChannels(
            notification.companyId,
          ),
        ]);

      const subscribedChannels = notification.channels
        .filter((channelName) =>
          userSubscribedChannels.includes(channelName) &&
          companySubscribedChannels.includes(channelName)
        );

      await Promise.all(
        subscribedChannels.map((channel) =>
          this.channelServiceGateway[channel].send(notification)
        ),
      );
    } catch (error) {
      throw new HttpException(
        "internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
