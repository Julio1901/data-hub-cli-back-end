import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateInvestmentInput {
    //TODO: Refatorar para que somente o id seja obrigatório e o back verifique os campos que chegou para atualizar somente
    //o que foi passado pelo front
    @Field()
    id: number

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