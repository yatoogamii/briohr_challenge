import { Test, TestingModule } from "@nestjs/testing";
import { NotificationService } from "./notification.service";
import { NotificationRepository } from "./repositories/notification.repository";
import { NotificationInMemoryRepository } from "./repositories/notification-in-memory.repository";
import { NotificationTypes } from "./models/notification.model";
import { ChannelNames } from "../channels/models/channel.model";

describe("NotificationService", () => {
  let notificationService: NotificationService;
  let notificationRepository: NotificationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: NotificationRepository,
          useClass: NotificationInMemoryRepository,
        },
      ],
    }).compile();

    notificationService = module.get<NotificationService>(NotificationService);
    notificationRepository = module.get<NotificationRepository>(
      NotificationRepository,
    );
  });

  it("should be defined", () => {
    expect(notificationService).toBeDefined();
  });

  describe("create", () => {
    it("should return the new notification", async () => {
      const notification = {
        userId: "1",
        companyId: "twitter",
        type: NotificationTypes.HAPPY_BIRTHDAY,
      };

      const newNotification = await notificationService.create(notification);

      expect(newNotification.userId).toEqual(notification.userId);
      expect(newNotification.companyId).toEqual(notification.companyId);
      expect(newNotification.type).toEqual(notification.type);
    });

    it("should return the new notification with correct channels according to the type", async () => {
      const notification = {
        userId: "1",
        companyId: "twitter",
        type: NotificationTypes.MONTHLY_PAYSLIP,
      };

      const newNotification = await notificationService.create(notification);

      expect(newNotification.channels).toEqual([ChannelNames.EMAIL]);
    });

    it("should fail because channelNames and notification type is incorrect", async () => {
      const notification = {
        userId: "1",
        companyId: "twitter",
        type: NotificationTypes.LEAVE_BALANCE_REMINDER,
      };

      const newNotification = await notificationService.create(notification);

      expect(newNotification.channels).not.toContain([ChannelNames.EMAIL]);
    });
  });

  describe("getUIChannelNotificationsByUserId", () => {
    it("should return UI Notification from userId", async () => {
      const userId = "1";
      const firstNotification = {
        userId,
        companyId: "apple",
        type: NotificationTypes.LEAVE_BALANCE_REMINDER,
        id: "2",
        channels: [ChannelNames.UI],
        subject: "subjet",
        content: "contet",
      };

      const secondNotification = {
        userId,
        companyId: "facebook",
        type: NotificationTypes.LEAVE_BALANCE_REMINDER,
        id: "3",
        channels: [ChannelNames.UI],
        subject: "subject",
        content: "content",
      };

      await Promise.all([
        notificationRepository.save(firstNotification),
        notificationRepository.save(secondNotification),
      ]);

      const uiNotifications = await notificationService
        .getUIChannelNotificationsByUserId(userId);

      expect(uiNotifications).toHaveLength(2);
    });
  });

  it("should return UI Notification from userId and successfully ignore other user", async () => {
    const userId = "1";
    const firstNotification = {
      userId,
      companyId: "apple",
      type: NotificationTypes.LEAVE_BALANCE_REMINDER,
      id: "2",
      channels: [ChannelNames.UI],
      subject: "subjet",
      content: "contet",
    };

    const secondNotification = {
      userId,
      companyId: "facebook",
      type: NotificationTypes.LEAVE_BALANCE_REMINDER,
      id: "3",
      channels: [ChannelNames.UI],
      subject: "subject",
      content: "content",
    };

    const otherUserNotification = {
      userId: "9",
      companyId: "google",
      type: NotificationTypes.LEAVE_BALANCE_REMINDER,
      id: "4",
      channels: [ChannelNames.UI],
      subject: "subject",
      content: "content",
    };

    await Promise.all([
      notificationRepository.save(firstNotification),
      notificationRepository.save(secondNotification),
      notificationRepository.save(otherUserNotification),
    ]);

    const uiNotifications = await notificationService
      .getUIChannelNotificationsByUserId(userId);

    expect(uiNotifications).toHaveLength(2);
  });

  it("should return UI Notification from userId and successfully ignore other channels", async () => {
    const userId = "1";
    const firstNotification = {
      userId,
      companyId: "apple",
      type: NotificationTypes.LEAVE_BALANCE_REMINDER,
      id: "2",
      channels: [ChannelNames.UI],
      subject: "subjet",
      content: "contet",
    };

    const secondNotification = {
      userId,
      companyId: "facebook",
      type: NotificationTypes.LEAVE_BALANCE_REMINDER,
      id: "3",
      channels: [ChannelNames.UI],
      subject: "subject",
      content: "content",
    };

    const otherChannelNotification = {
      userId,
      companyId: "google",
      type: NotificationTypes.HAPPY_BIRTHDAY,
      id: "4",
      channels: [ChannelNames.EMAIL],
      subject: "subject",
      content: "content",
    };

    await Promise.all([
      notificationRepository.save(firstNotification),
      notificationRepository.save(secondNotification),
      notificationRepository.save(otherChannelNotification),
    ]);

    const uiNotifications = await notificationService
      .getUIChannelNotificationsByUserId(userId);

    expect(uiNotifications).toHaveLength(2);
  });
});
