import { ChannelNames } from "src/domains/channels/models/channel.model";
import { NotificationTypes } from "../models/notification.model";

export class CreateNotificationDto {
  type: NotificationTypes;
  channels: ChannelNames[];
  userId: string;
  companyId: string;
  subject: string;
  content: string;
}

export class CreateNotificationRequestDto {
  userId: string;
  companyId: string;
  type: NotificationTypes;
}
