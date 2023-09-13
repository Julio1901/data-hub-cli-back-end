import { Field, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class BankObject {
    @Field()
    name: string

    @Field()
    savedMoney: number

        
    //ATENÇÃO construtor não é necessário, estou declarando apenas para o mock
    //remover quando não precisar mockar mais
    constructor(name: string, savedMoney: number){
        this.name = name 
        this.savedMoney = savedMoney
    }
}