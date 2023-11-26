import { Notification } from "../models/notification.model";
import { NotificationRepository } from "./notification.repository";

export class NotificationInMemoryRepository implements NotificationRepository {
  private notifications = new Map<string, Notification>();

  async save(notification: Notification): Promise<Notification> {
    this.notifications.set(notification.id, notification);
    return Promise.resolve(notification);
  }

  async getByUserId(userId: string): Promise<Notification[]> {
    const userNotification = [...this.notifications.values()].filter(
      (notification) => notification.userId === userId,
    );

    return userNotification;
  }
}
