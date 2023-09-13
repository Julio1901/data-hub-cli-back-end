import { ArgsType, Field } from "@nestjs/graphql";
import { InvestmentUpdateInput } from "../inputs/investment-update-input";






@ArgsType()
export class InvestmentUpdateArgs{
    @Field()
    data : InvestmentUpdateInput

}