import { CreateCompanyDto } from "../dto/company.dto";
import { Company } from "../models/company.model";

export abstract class CompanyRepository {
  abstract save(company: CreateCompanyDto): Promise<Company>;
  abstract getById(companyId: string): Promise<Company>;
}
