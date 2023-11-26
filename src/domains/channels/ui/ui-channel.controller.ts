import { Controller } from "@nestjs/common";

// @Discuss I had problem with circular dependency between notificationService and UIChannelController.
// The Nest server couldnt run and I cant fix it in the given time so I just comment it.

@Controller("notification/channels/ui")
export class UIChannelController {
  // constructor(
  //   private notificationService: NotificationService,
  // ) {}

  // @Get("user")
  // async getUserUINotifications(@Param() params: { userId: string }) {
  //   try {
  //     return await this.notificationService.getUIChannelNotificationsByUserId(
  //       params.userId,
  //     );
  //   } catch (error) {
  //     throw new HttpException(
  //       "internal server error",
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
