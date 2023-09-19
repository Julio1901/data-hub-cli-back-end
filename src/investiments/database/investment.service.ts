import { Injectable, Inject } from '@nestjs/common';
import { Repository, createQueryBuilder } from 'typeorm';
import { InvestmentEntity } from './entity/investment.entity';
import { BankEntity } from './entity/bank.entity';
import { CreateNewInvestmentInput } from '../inputs/create-new-investment-input';
import { CreateNewBankInput } from '../inputs/create-new-bank-input';
import { UpdateInvestmentInput } from '../inputs/update-investment-input';
import { DeleteInvestmentInput } from '../inputs/delete-investment-input';

@Injectable()
export class InvestmentService {
  constructor(
    @Inject('INVESTMENT_REPOSITORY')
    private investmentRepository: Repository<InvestmentEntity>,

    @Inject('BANK_REPOSITORY')
    private bankRepository: Repository<BankEntity>,

  ) {}

   async createNewInvestment(newInvestment : CreateNewInvestmentInput) : Promise<InvestmentEntity>{
      try{
          const existingInvestment = await this.investmentRepository
                                    .createQueryBuilder('investment_entity')
                                    .where("name = :name", {name: newInvestment.name})
                                    .getOne()

          if (existingInvestment) {
            throw new Error ('This investment is already registered')
          }

          const result = await this.investmentRepository
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


          if(result.raw.affectedRows !== 1){
            throw new Error('Error while creating the investment')
          }

          return await this.investmentRepository
                 .createQueryBuilder('investment_entity')
                 .where("name = :name", {name: newInvestment.name})
                 .getOne()
      }catch(error) {
          throw new Error(`Error while creating the investment: ${error.message}`)
    }
    

   }

   async getInvestments() : Promise<InvestmentEntity[]>{
    const investments = await this.investmentRepository.find()
    return investments
   }

   async updateInvestment(investment: UpdateInvestmentInput) : Promise<InvestmentEntity>{
    await this.investmentRepository
    .createQueryBuilder()
    .update(InvestmentEntity)
    .set(investment)
    .where("id = :id", {id: investment.id})
    .execute()

    const investmentUpdated = await this.investmentRepository
                              .createQueryBuilder()
                              .select("investment")
                              .from(InvestmentEntity, "investment")
                              .where("investment.id = :id", {id: investment.id})
                              .getOne()
    return investmentUpdated
   }


   async deleteInvestment(deleteInvestmentInput: DeleteInvestmentInput): Promise<String>{
    
    await this.investmentRepository
          .createQueryBuilder('investment_entity')
          .delete()
          .from(InvestmentEntity)
          .where("id = :id", {id : deleteInvestmentInput.id})
          .execute()
    
   return 'Investimento deletado com sucesso'

   }

  async createNewBank(bank : CreateNewBankInput) : Promise<BankEntity>{
    try{
        const existingBank = await this.bankRepository
                             .createQueryBuilder('bank_entity')
                             .where("name = :name ", {name: bank.name})
                             .getOne()

        if (existingBank) {
          throw new Error('This bank is already registered')
        }

        const result = await this.bankRepository
        .createQueryBuilder()
        .insert()
        .into(BankEntity)
        .values(
          {
            name: bank.name,
            savedMoney: bank.savedMoney
          })
        .execute()
        
        if(result.raw.affectedRows !==1) {
           throw new Error('Error while creating the bank')
        }

        return await this.bankRepository
        .createQueryBuilder('bank_entity')
        .where("name = :name ", {name: bank.name})
        .getOne()

    } catch(error){
        throw new Error(`Error while creating the bank: ${error.message}`)
    }
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