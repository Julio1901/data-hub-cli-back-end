import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateNewInvestmentArgs } from "./args/create-new-investment-args";
import { InvestmentService } from "./database/investment.service";
import { InvestmentOutput } from "./outputs/investment-output";
import { CreateNewBankArgs } from "./args/create-new-bank-args";
import { BankOutput } from "./outputs/bank-output";


@Resolver()
export class InvestmentResolver {
   
    constructor(private readonly investmentService: InvestmentService) {}

    @Query(() => String)
    investment(){
        return 'Hello world investment'
    }

    @Query(() => [InvestmentOutput])
    async getInvestments(){
    const result = await this.investmentService.getInvestments()
    const investmentList = result.map( investment => {
        const investmentOutput = InvestmentOutput.fromEntity(investment)
        return investmentOutput

    })
    return investmentList
    }


    @Mutation(() => String)
    createNewInvestment( @Args() args: CreateNewInvestmentArgs){

        console.log(args.data.name)
        console.log(args.data.type)
        console.log(args.data.totalInvested)
        console.log(args.data.applicationDate)
        console.log(args.data.bankId)

        this.investmentService.createNewInvestment(args.data)


        return "Investmento criado"
    }

    @Mutation(() => String)
    createNewBank( @Args() args: CreateNewBankArgs){

        console.log(args.data.name)
        console.log(args.data.savedMoney)

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