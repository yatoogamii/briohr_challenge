import { ChannelNames } from "src/domains/channels/models/channel.model";

export class CreateCompanyDto {
  id: string;
  name: string;
  subscribedChannels: ChannelNames[];
}
