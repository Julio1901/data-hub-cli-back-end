import { Field, ObjectType } from "@nestjs/graphql";
import { BankObject } from "src/objects/bank.object";


@ObjectType()
export class InvestmentObject {

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
    
    //ATENÇÃO construtor não é necessário, estou declarando apenas para o mock
    //remover quando não precisar mockar mais
    constructor ( id: number , type: string, name: string, totalInvested: number, applicationDate: string, bank: BankObject) {
        this.id = id
        this.type = type
        this.name = name
        this.totalInvested = totalInvested
        this.applicationDate = applicationDate
        this.bank = bank
    }

}