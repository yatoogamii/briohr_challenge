import { Injectable } from "@nestjs/common";
import {
  Notification,
  NotificationTypeMapping,
  NotificationTypes,
} from "./models/notification.model";
import { NotificationRepository } from "./repositories/notification.repository";
import { CreateNotificationRequestDto } from "./dto/notification.dto";
import { ChannelNames } from "../channels/models/channel.model";

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  create(notification: CreateNotificationRequestDto): Notification {
    return NotificationTypeMapping[notification.type](
      "1",
      notification.userId,
      notification.companyId,
      "subjet",
      "content",
    );
  }

  async getUIChannelNotificationsByUserId(
    userId: string,
  ): Promise<Notification[]> {
    const notifications = await this.notificationRepository.getByUserId(userId);

    // @Discuss TS problem which force me to infer the type of the notification first
    // before being able to use the includes method
    const uiChannelNotifications = notifications.filter((notification) => {
      if (
        notification.type === NotificationTypes.HAPPY_BIRTHDAY ||
        notification.type === NotificationTypes.LEAVE_BALANCE_REMINDER
      ) return notification.channels.includes(ChannelNames.UI);

      return [];
    });

    return uiChannelNotifications;
  }
}
