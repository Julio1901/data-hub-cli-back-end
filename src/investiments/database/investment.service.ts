import { Injectable, Inject } from '@nestjs/common';
import { Repository, createQueryBuilder } from 'typeorm';
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

 }
