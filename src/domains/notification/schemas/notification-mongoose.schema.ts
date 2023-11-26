import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { NotificationTypes } from "../models/notification.model";
import { ChannelNames } from "src/domains/channels/models/channel.model";

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  @Prop({ required: true })
  type: NotificationTypes;

  @Prop({ required: true })
  channels: ChannelNames[];
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
