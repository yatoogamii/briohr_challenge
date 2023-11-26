import { Notification } from "../models/notification.model";

export abstract class NotificationRepository {
  abstract save(notification: Notification): Promise<Notification>;
  abstract getByUserId(userId: string): Promise<Notification[]>;
}
