import { Field, InputType } from "@nestjs/graphql";





@InputType()
export class DeleteInvestmentInput{
    @Field()
    id: number
}