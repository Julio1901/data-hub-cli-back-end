import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateNewInvestmentArgs } from "./args/create-new-investment-args";
import { InvestmentService } from "./database/investment.service";


@Resolver()
export class InvestmentResolver {
   
    constructor(private readonly investmentService: InvestmentService) {}

    @Query(() => String)
    investment(){
        return 'Hello world investment'
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

}