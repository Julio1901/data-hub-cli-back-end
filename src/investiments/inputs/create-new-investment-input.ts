import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateNewInvestmentInput {
    @Field()
    type: string;
  
    @Field()
    name: string;
  
    @Field()
    totalInvested: number;
  
    @Field()
    applicationDate: string;

    @Field()
    bankId: number;
}