import { Injectable } from "@nestjs/common";
import { CompanyRepository } from "./repositories/company.repository";
import { ChannelNames } from "../channels/models/channel.model";

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async getSubscribedChannels(
    companyId: string,
  ): Promise<ChannelNames[]> {
    const company = await this.companyRepository.getById(companyId);

    return company.subscribedChannels;
  }
}
