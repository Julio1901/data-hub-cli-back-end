import { Field, InputType } from "@nestjs/graphql";



@InputType()
export class InvestmentUpdateInput {
    @Field()
    id: number
    @Field()
    newValue: number
}