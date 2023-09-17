import { ArgsType, Field } from "@nestjs/graphql";
import { UpdateInvestmentInput } from "../inputs/update-investment-input";



@ArgsType()
export class UpdateInvestmentArgs{
    @Field()
    data: UpdateInvestmentInput
}