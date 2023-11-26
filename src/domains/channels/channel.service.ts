import { Injectable } from "@nestjs/common";
import { Notification } from "../notification/models/notification.model";

@Injectable()
export abstract class ChannelService {
  abstract send(notification: Notification): Promise<void>;
}
