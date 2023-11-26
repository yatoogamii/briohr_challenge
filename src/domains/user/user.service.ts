import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { ChannelNames } from "../channels/models/channel.model";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getSubscribedChannels(
    userId: string,
  ): Promise<ChannelNames[]> {
    const user = await this.userRepository.getById(userId);

    return user.subscribedChannels;
  }
}
