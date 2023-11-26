import { Test, TestingModule } from "@nestjs/testing";
import { CompanyService } from "./company.service";
import { CompanyRepository } from "./repositories/company.repository";
import { CompanyInMemoryRepository } from "./repositories/company-in-memory.repository";
import { ChannelNames } from "../channels/models/channel.model";

describe("CompanyService", () => {
  let companyService: CompanyService;
  let companyRepository: CompanyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: CompanyRepository,
          useClass: CompanyInMemoryRepository,
        },
      ],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);
    companyRepository = module.get<CompanyRepository>(CompanyRepository);
  });

  it("should be defined", () => {
    expect(companyService).toBeDefined();
  });

  describe("getSubscribedChannels", () => {
    it("should return company subscribed channels", async () => {
      const companyId = "1";
      const expectedChannels: ChannelNames[] = [
        ChannelNames.EMAIL,
        ChannelNames.UI,
      ];

      await companyRepository.save({
        id: companyId,
        name: "Facebook",
        subscribedChannels: expectedChannels,
      });

      const result = await companyService.getSubscribedChannels(companyId);

      expect(result).toEqual(expectedChannels);
    });
  });
});
