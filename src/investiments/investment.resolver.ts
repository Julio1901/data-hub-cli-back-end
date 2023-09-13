import { Resolver,Query, Mutation, Args } from "@nestjs/graphql";
import { InvestmentObject } from "./investment.object";
import { InvestmentUpdateArgs } from "./args/investment-update.args";

import { InvestmentService } from "./database/investment.service";
import { BankObject } from "src/objects/bank.object";


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
        const bankResponse = await this.investmentService.getBankById(1)
        const bank = new BankObject(
        bankResponse.name,
        bankResponse.savedMoney
        )
        //TODO: Refatorar com map
        const converted : [InvestmentObject] = [new InvestmentObject(
            result[0].id,
            result[0].type,
            result[0].name,
            result[0].totalInvested,
            result[0].applicationDate,
            bank
        )]
            return converted
    }


    @Mutation(() => String)
    updateInvestment(@Args() args: InvestmentUpdateArgs ) {
        console.log(args.data.newValue)
        return 'Investimento atualizado com sucesso!'
    }

}