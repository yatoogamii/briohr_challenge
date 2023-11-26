import { Test, TestingModule } from "@nestjs/testing";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./user.service";
import { UserInMemoryRepository } from "./repositories/user-in-memory.repository";
import { ChannelNames } from "../channels/models/channel.model";

describe("UserService", () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  describe("getSubscribedChannels", () => {
    it("should return user subscribed channels", async () => {
      const userId = "1";
      const expectedChannels: ChannelNames[] = [ChannelNames.UI];

      await userRepository.save({
        id: userId,
        name: "Alice",
        subscribedChannels: expectedChannels,
      });

      const result = await userService.getSubscribedChannels(userId);

      expect(result).toEqual(expectedChannels);
    });
  });
});
