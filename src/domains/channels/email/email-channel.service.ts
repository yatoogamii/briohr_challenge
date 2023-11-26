import { Injectable } from "@nestjs/common";
import { ChannelService } from "../channel.service";
import { Notification } from "src/domains/notification/models/notification.model";

@Injectable()
export class EmailChannelService implements ChannelService {
  async send(notification: Notification): Promise<void> {
    console.log(`Sent Notification ${notification.id} via Email Channel`);
  }
}
