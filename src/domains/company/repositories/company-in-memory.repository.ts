import { CreateCompanyDto } from "../dto/company.dto";
import { Company } from "../models/company.model";
import { CompanyRepository } from "./company.repository";

export class CompanyInMemoryRepository implements CompanyRepository {
  private companies = new Map<string, Company>();

  async save(company: CreateCompanyDto): Promise<Company> {
    this.companies.set(company.id, company);
    return Promise.resolve(company);
  }

  async getById(companyId: string): Promise<Company> {
    if (!this.companies.has(companyId)) {
      return Promise.reject("Company not found");
    }
    return Promise.resolve(this.companies.get(companyId));
  }
}
