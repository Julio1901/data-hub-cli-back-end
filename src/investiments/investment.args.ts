import { ArgsType } from "@nestjs/graphql";
import { InvestmentInput } from "./investment.input";



@ArgsType()
export class InvestmentArgs {
    data: InvestmentInput
}