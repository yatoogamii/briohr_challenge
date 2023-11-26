import { Notification } from "../models/notification.model";
import * as jsonData from "./mock/notification.json";
import { NotificationRepository } from "./notification.repository";

export class NotificationJsonRepository implements NotificationRepository {
  private notifications = new Map<string, Notification>();

  constructor() {
    jsonData.notifications.forEach((notification: Notification) => {
      this.notifications.set(notification.id, notification);
    });
  }

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
