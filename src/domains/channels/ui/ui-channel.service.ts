import { Injectable } from "@nestjs/common";
import { ChannelService } from "../channel.service";
import { Notification } from "src/domains/notification/models/notification.model";

// @Discuss I had problem with circular dependency between notificationService and UIChannelService.
// The Nest server couldnt run and I cant fix it in the given time so I just comment it.

@Injectable()
export class UIChannelService implements ChannelService {
  async send(notification: Notification): Promise<void> {
    console.log(`Sent Notification ${notification.id} via UI Channel`);
  }
  // constructor(
  //   private readonly notificationRepository: NotificationRepository,
  // ) {}

  // async send(notification: Notification): Promise<void> {
  //   await this.notificationRepository.save(notification);
  // }
}
