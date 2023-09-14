import { Injectable, Inject } from '@nestjs/common';
import { Repository, createQueryBuilder } from 'typeorm';
import { InvestmentEntity } from './entity/investment.entity';
import { BankEntity } from './entity/bank.entity';
import { CreateNewInvestmentInput } from '../inputs/create-new-investment-input';

@Injectable()
export class InvestmentService {
  constructor(
    @Inject('INVESTMENT_REPOSITORY')
    private investmentRepository: Repository<InvestmentEntity>,

    @Inject('BANK_REPOSITORY')
    private bankRepository: Repository<BankEntity>,

  ) {}


   async createNewInvestment(newInvestment : CreateNewInvestmentInput) {

    await this.investmentRepository
    .createQueryBuilder()
    .insert()
    .into(InvestmentEntity)
    .values({
      type: newInvestment.type,
      name: newInvestment.name,
      totalInvested: newInvestment.totalInvested,
      applicationDate: newInvestment.applicationDate,
      bankId: newInvestment.bankId
    })
    .execute()


   }


 }
