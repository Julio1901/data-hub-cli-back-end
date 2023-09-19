import { Injectable, Inject } from '@nestjs/common';
import { Repository, createQueryBuilder } from 'typeorm';
import { InvestmentEntity } from './entity/investment.entity';
import { BankEntity } from './entity/bank.entity';
import { CreateNewInvestmentInput } from '../inputs/create-new-investment-input';
import { CreateNewBankInput } from '../inputs/create-new-bank-input';
import { UpdateInvestmentInput } from '../inputs/update-investment-input';
import { DeleteInvestmentInput } from '../inputs/delete-investment-input';
import { MessageService } from 'src/utils/message-service';

@Injectable()
export class InvestmentService {
  constructor(
    @Inject('INVESTMENT_REPOSITORY')
    private investmentRepository: Repository<InvestmentEntity>,

    @Inject('BANK_REPOSITORY')
    private bankRepository: Repository<BankEntity>,

  ) {}

  private messageService = new MessageService()

   async createNewInvestment(newInvestment : CreateNewInvestmentInput) : Promise<InvestmentEntity>{
      try{
          const existingInvestment = await this.investmentRepository
                                    .createQueryBuilder('investment_entity')
                                    .where("name = :name", {name: newInvestment.name})
                                    .getOne()

          if (existingInvestment) {
            throw new Error (this.messageService.getMessage('investmentAlreadyRegistered'))
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
            throw new Error(this.messageService.getMessage('createInvestmentError'))
          }

          return await this.investmentRepository
                 .createQueryBuilder('investment_entity')
                 .where("name = :name", {name: newInvestment.name})
                 .getOne()
      }catch(error) {
          throw new Error(`${this.messageService.getMessage('createInvestmentError')}: ${error.message}`)
    }
    

   }

   async getInvestments() : Promise<InvestmentEntity[]>{
    try{
      const investments = await this.investmentRepository.find()
      return investments
    }catch(error)
    { 
      throw new Error (this.messageService.getMessage('recoveringInvestmentsError'))
    }
   }

   async updateInvestment(investment: UpdateInvestmentInput) : Promise<InvestmentEntity>{
      try {
        const result = await this.investmentRepository
        .createQueryBuilder()
        .update(InvestmentEntity)
        .set(investment)
        .where("id = :id", {id: investment.id})
        .execute()
        
        if (result.affected !== 1) {  
          throw new Error (this.messageService.getMessage('updateInvestmentError'))
        }

        const investmentUpdated = await this.investmentRepository
                                  .createQueryBuilder()
                                  .select("investment")
                                  .from(InvestmentEntity, "investment")
                                  .where("investment.id = :id", {id: investment.id})
                                  .getOne()                        
        return investmentUpdated
      } catch (error) {
        throw new Error(`${this.messageService.getMessage('updateInvestmentError')}: ${error}`)
      }
    
   }


   async deleteInvestment(deleteInvestmentInput: DeleteInvestmentInput): Promise<String>{
    try {
        const result = await this.investmentRepository
        .createQueryBuilder('investment_entity')
        .delete()
        .from(InvestmentEntity)
        .where("id = :id", {id : deleteInvestmentInput.id})
        .execute()

        if (result.affected !== 1) {
          throw new Error(this.messageService.getMessage('deleteInvestmentError'))
        }
        return this.messageService.getMessage('investmentDeletedSuccessfully')
      }catch(error) {
        throw new Error(`${this.messageService.getMessage('deleteInvestmentError')}: ${error.message}`)
      }
   }

  async createNewBank(bank : CreateNewBankInput) : Promise<BankEntity>{
    try{
        const existingBank = await this.bankRepository
                             .createQueryBuilder('bank_entity')
                             .where("name = :name ", {name: bank.name})
                             .getOne()

        if (existingBank) {
          throw new Error(this.messageService.getMessage('bankAlreadyRegistered'))
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
           throw new Error(this.messageService.getMessage('createBankError'))
        }

        return await this.bankRepository
        .createQueryBuilder('bank_entity')
        .where("name = :name ", {name: bank.name})
        .getOne()

    } catch(error){
        throw new Error(`${this.messageService.getMessage('createBankError')}: ${error.message}`)
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