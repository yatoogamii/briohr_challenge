import { ChannelNames } from "src/domains/channels/models/channel.model";

export class CreateUserDto {
  id: string;
  name: string;
  subscribedChannels: ChannelNames[];
}
