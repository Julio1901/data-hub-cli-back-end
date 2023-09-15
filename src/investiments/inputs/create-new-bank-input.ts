import { Field, InputType } from "@nestjs/graphql";



@InputType()
export class CreateNewBankInput{

   @Field()
    name: string
    
    @Field()
    savedMoney: number
}