import { Field, InputType } from "@nestjs/graphql";
import { BankObject } from "src/objects/bank.object";


@InputType()
export class InvestmentInput {

    @Field()
    id: number

    // Transformar isso em um enum com tipos "Variável, fixo etc.,"
    @Field()
    type: string

    // ex: CDB Nubank, selic etc.,
    @Field()
    name: string

    @Field()
    totalInvested: number

    //Refatorar para o tipo Date no futuro
    @Field()
    applicationDate: String

    @Field()
    bank: BankObject
}