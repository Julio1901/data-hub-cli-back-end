import { ArgsType, Field } from "@nestjs/graphql";
import { DeleteInvestmentInput } from "../inputs/delete-investment-input";



@ArgsType()
export class DeleteInvestmentArgs{
    @Field()
    data: DeleteInvestmentInput
}