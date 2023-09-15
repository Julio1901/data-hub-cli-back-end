import { ArgsType, Field } from "@nestjs/graphql";
import { CreateNewBankInput } from "../inputs/create-new-bank-input";


@ArgsType()
export class CreateNewBankArgs{
    @Field()
    data: CreateNewBankInput
}