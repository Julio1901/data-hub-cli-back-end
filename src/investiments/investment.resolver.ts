import { Resolver,Query, Mutation, Args } from "@nestjs/graphql";
import { InvestmentObject } from "./investment.object";
import { InvestmentUpdateArgs } from "./args/investment-update.args";

import { InvestmentService } from "./database/investment.service";
import { BankObject } from "src/objects/bank.object";
import { InvestmentEntity } from "./database/entity/investment.entity";


@Resolver(() => InvestmentObject)
export class InvestmentResolver {

     constructor(private readonly investmentService: InvestmentService){}

    @Query(() => String)
    getInvestmentsTest() {
        return 'Meus investimentos mockados'
    }

    @Query(() => [InvestmentObject])
    async getInvestments() {
        const result = await this.investmentService.findAll()
        console.log(result[0].bank)
        const response : InvestmentObject[]= result.map((investment) => {
            return new InvestmentObject(
                investment.id,
                investment.type,
                investment.name,
                investment.totalInvested,
                investment.applicationDate,
                investment.bank
            )
        })
        return response
    }

   @Mutation(() => InvestmentObject)
   async updateInvestment(@Args() args: InvestmentUpdateArgs ) : Promise<InvestmentEntity>{
        const result =  await this.investmentService.updateInvestmentById(args.data.id, args.data.newValue)
        return  result
    }

}