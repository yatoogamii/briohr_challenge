import { EmailChannelService } from "../email/email-channel.service";
import { UIChannelService } from "../ui/ui-channel.service";

export enum ChannelNames {
  UI = "ui",
  EMAIL = "email",
}

export interface ChannelServiceMapping {
  [ChannelNames.UI]: UIChannelService;
  [ChannelNames.EMAIL]: EmailChannelService;
}
