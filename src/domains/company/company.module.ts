import { Module } from "@nestjs/common";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { CompanyRepository } from "./repositories/company.repository";
import { CompanyJsonRepository } from "./repositories/company-json.repository";

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [CompanyService, {
    provide: CompanyRepository,
    useClass: CompanyJsonRepository,
  }],
  exports: [CompanyService],
})
export class CompanyModule {}
