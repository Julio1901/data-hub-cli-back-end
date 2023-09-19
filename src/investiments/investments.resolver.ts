import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateNewInvestmentArgs } from "./args/create-new-investment-args";
import { InvestmentService } from "./database/investment.service";
import { InvestmentOutput } from "./outputs/investment-output";
import { CreateNewBankArgs } from "./args/create-new-bank-args";
import { BankOutput } from "./outputs/bank-output";
import { UpdateInvestmentArgs } from "./args/update-investment-args";
import { DeleteInvestmentArgs } from "./args/delete-investment-args";
import { HttpException, HttpStatus } from "@nestjs/common";



@Resolver()
export class InvestmentResolver {
   
    constructor(private readonly investmentService: InvestmentService) {}

    @Query(() => [InvestmentOutput])
    async getInvestments() {
      const result = await this.investmentService.getInvestments()
      const investmentList = await Promise.all(result.map(async (investment) => {
        const investmentOutput = InvestmentOutput.fromEntity(investment)
        const bank = await this.investmentService.getBankById(investment.bankId)
        investmentOutput.bank = BankOutput.fromEntity(bank)
        return investmentOutput
      }))
      return investmentList
    }

    @Mutation(() => String)
    async createNewInvestment( @Args() args: CreateNewInvestmentArgs){
         try {
            await this.investmentService.createNewInvestment(args.data)
            return "Successfully created investment"
         }catch(error){
            if (error.message === "Error while creating the investment: This investment is already registered"){
                throw new HttpException(error.message, HttpStatus.CONFLICT)
            }else{
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            }
         }
     
    }

    @Mutation(() => InvestmentOutput)
    async updateInvestment(@Args() args: UpdateInvestmentArgs){
        console.log(args.data)
        const result = await this.investmentService.updateInvestment(args.data)
        const bank = await this.investmentService.getBankById(result.bankId)
        const response = InvestmentOutput.fromEntity(result)
        response.bank =  BankOutput.fromEntity(bank)
        return response
    }

    @Mutation(() => String)
    async deleteInvestment( @Args() args: DeleteInvestmentArgs){
        this.investmentService.deleteInvestment(args.data)
        return 'Successfully investment deleted'
    }

    @Mutation(() => String)
    async createNewBank( @Args() args: CreateNewBankArgs){
        try {
            await this.investmentService.createNewBank(args.data)
            return "Bank create successful"
        }catch (error) {
            if (error.message === "Error while creating the bank: This bank is already registered"){
                throw new HttpException(error.message, HttpStatus.CONFLICT)
            }else{
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            }
        }
    }

    @Query(() => [BankOutput])
    async getBanks(){
        const result = await this.investmentService.getBanks()
        const bankList = result.map (bank => {
            const bankOutput = BankOutput.fromEntity(bank)
            return bankOutput
        })
        return bankList
    }

}