import { Injectable, Inject } from '@nestjs/common';
import { Repository, createQueryBuilder } from 'typeorm';
import { InvestmentEntity } from './entity/investment.entity';
import { BankEntity } from './entity/bank.entity';
import { CreateNewInvestmentInput } from '../inputs/create-new-investment-input';
import { CreateNewBankInput } from '../inputs/create-new-bank-input';

@Injectable()
export class InvestmentService {
  constructor(
    @Inject('INVESTMENT_REPOSITORY')
    private investmentRepository: Repository<InvestmentEntity>,

    @Inject('BANK_REPOSITORY')
    private bankRepository: Repository<BankEntity>,

  ) {}

   //TODO: Realizar tratativa de erros e criar verificações após registro ser criado
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

   async getInvestments() : Promise<InvestmentEntity[]>{
    const investments = await this.investmentRepository.find()
    return investments
   }

   //TODO: criar validação para que caso o nome do bank já exista não seja possível criar novamente
   async createNewBank(bank : CreateNewBankInput){
    await this.bankRepository
    .createQueryBuilder()
    .insert()
    .into(BankEntity)
    .values(
      {
        name: bank.name,
        savedMoney: bank.savedMoney
      })
    .execute()
   } 

   async getBanks() : Promise<BankEntity[]>{
    const banks = await this.bankRepository.find()
    return banks
   }

   async getBankById(id: number): Promise<BankEntity>{
    const bank =  await this.bankRepository
                        .createQueryBuilder("bank_entity")
                        .where("bank_entity.id= :id", {id: id})
                        .getOne()
    return bank
   }

 }
