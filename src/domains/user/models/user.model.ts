import { ChannelNames } from "src/domains/channels/models/channel.model";

export interface User {
  id: string;
  name: string;
  subscribedChannels: ChannelNames[];
}
