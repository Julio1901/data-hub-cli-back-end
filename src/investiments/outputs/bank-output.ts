import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BankEntity } from "../database/entity/bank.entity";




@ObjectType()
export class BankOutput{

    @Field(() => Int)
    id: number

    @Field()
    name: string
    
    @Field(() => Int)
    savedMoney: number

    static fromEntity (entity: BankEntity) : BankOutput {
        const bank = new BankOutput()
        bank.id = entity.id
        bank.name = entity.name
        bank.savedMoney = entity.savedMoney
        return bank
    }

}