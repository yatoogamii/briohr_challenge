import { ChannelNames } from "src/domains/channels/models/channel.model";

export interface Company {
  id: string;
  name: string;
  subscribedChannels: ChannelNames[];
}
