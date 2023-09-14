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

  async findAll(): Promise<InvestmentEntity[]> {
    return this.investmentRepository.find({
      relations: ['bank']
    });
  }

  async getBankById(bankId: number): Promise<BankEntity> {
    const response =  this.bankRepository.findOneBy({
      id: bankId
    })
    return response
  }

  async updateInvestmentById(id: number, newValue: number): Promise<InvestmentEntity>{
    const result = await this.investmentRepository.createQueryBuilder()
    .update(InvestmentEntity)
    .set({totalInvested: newValue})
    .where('id = :id', {id: id}).execute()
    
    if (result.affected === 0) {
      throw new Error('Update investment error');
    }

    const registryUpdated = await this.investmentRepository.findOne({
      where: { id },
      relations: ['bank'],
    });
    return registryUpdated
  }



}
