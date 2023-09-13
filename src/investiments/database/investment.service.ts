import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InvestmentEntity } from './entity/investment.entity';
import { BankEntity } from './entity/bank.entity';

@Injectable()
export class InvestmentService {
  constructor(
    @Inject('INVESTMENT_REPOSITORY')
    private investmentRepository: Repository<InvestmentEntity>,

    @Inject('BANK_REPOSITORY')
    private bankRepository: Repository<BankEntity>,

  ) {}

  async findAll(): Promise<InvestmentEntity[]> {
    return this.investmentRepository.find();
  }

  async getBankById(bankId: number): Promise<BankEntity> {
    const response =  this.bankRepository.findOneBy({
      id: bankId
    })
    return response
  }

}