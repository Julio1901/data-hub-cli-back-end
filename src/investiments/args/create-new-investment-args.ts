import { ArgsType, Field } from "@nestjs/graphql";
import { CreateNewInvestmentInput } from "../inputs/create-new-investment-input";


@ArgsType()
export class CreateNewInvestmentArgs{

    @Field()
    data: CreateNewInvestmentInput
}