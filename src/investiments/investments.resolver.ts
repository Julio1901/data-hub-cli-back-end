import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateNewInvestmentArgs } from "./args/create-new-investment-args";



@Resolver()
export class InvestmentResolver {
   

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
        return "Investmento criado"
    }

}