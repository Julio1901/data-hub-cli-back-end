import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateNewInvestmentArgs } from "./args/create-new-investment-args";
import { InvestmentService } from "./database/investment.service";
import { InvestmentOutput } from "./outputs/investment-output";
import { CreateNewBankArgs } from "./args/create-new-bank-args";
import { BankOutput } from "./outputs/bank-output";
import { UpdateInvestmentInput } from "./inputs/update-investment-input";
import { UpdateInvestmentArgs } from "./args/update-investment-args";



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
    createNewInvestment( @Args() args: CreateNewInvestmentArgs){
        this.investmentService.createNewInvestment(args.data)
        return "Investmento criado"
    }

    @Mutation(() => InvestmentOutput)
    async updateInvestment(@Args() args: UpdateInvestmentArgs){
        const result = await this.investmentService.updateInvestment(args.data)
        const bank = await this.investmentService.getBankById(result.bankId)
        const response = InvestmentOutput.fromEntity(result)
        response.bank =  BankOutput.fromEntity(bank)
        return response
    }


    @Mutation(() => String)
    createNewBank( @Args() args: CreateNewBankArgs){
        this.investmentService.createNewBank(args.data)
        return "Bank create successful"
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