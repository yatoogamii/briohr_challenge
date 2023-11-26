import { ChannelNames } from "../../channels/models/channel.model";

export enum NotificationTypes {
  LEAVE_BALANCE_REMINDER = "leave-balance-reminder",
  MONTHLY_PAYSLIP = "monthly-payslip",
  HAPPY_BIRTHDAY = "happy-birthday",
}

export interface Notification {
  id: string;
  type: NotificationTypes;
  channels: ChannelNames[];
  userId: string;
  companyId: string;
  subject: string;
  content: string;
}

function createBaseNotification(
  { id, userId, companyId, subject, content, type, channels }: Notification,
): Notification {
  return { id, userId, companyId, subject, content, type, channels };
}

function createLeaveBalanceReminderNotification(
  id: string,
  userId: string,
  companyId: string,
  subject: string,
  content: string,
): Notification {
  return createBaseNotification(
    {
      id,
      userId,
      companyId,
      subject,
      content,
      type: NotificationTypes.LEAVE_BALANCE_REMINDER,
      channels: [ChannelNames.UI],
    },
  );
}

function createMonthlyPayslipNotification(
  id: string,
  userId: string,
  companyId: string,
  subject: string,
  content: string,
): Notification {
  return createBaseNotification(
    {
      id,
      userId,
      companyId,
      subject,
      content,
      type: NotificationTypes.MONTHLY_PAYSLIP,
      channels: [ChannelNames.EMAIL],
    },
  );
}

function createHappyBirthdayNotification(
  id: string,
  userId: string,
  companyId: string,
  subject: string,
  content: string,
): Notification {
  return createBaseNotification(
    {
      id,
      userId,
      companyId,
      subject,
      content,
      type: NotificationTypes.HAPPY_BIRTHDAY,
      channels: [ChannelNames.UI, ChannelNames.EMAIL],
    },
  );
}

export const NotificationTypeMapping = {
  [NotificationTypes.LEAVE_BALANCE_REMINDER]:
    createLeaveBalanceReminderNotification,
  [NotificationTypes.MONTHLY_PAYSLIP]: createMonthlyPayslipNotification,
  [NotificationTypes.HAPPY_BIRTHDAY]: createHappyBirthdayNotification,
};
