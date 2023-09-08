import { ArgsType, Field } from "@nestjs/graphql";
import { CreateOneUserInput } from "../inputs/create-one-user.input";




@ArgsType()
export class CreateOneUseArgs {

    @Field()
    data: CreateOneUserInput
}