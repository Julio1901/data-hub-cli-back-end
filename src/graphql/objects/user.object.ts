import { Field, ObjectType } from "@nestjs/graphql";


//Server para informar para o graphql que isso é um objeto que será usado
@ObjectType()
export class UserObject{

    //serve para informar para o graphql que esse é um campo que ele precisa enxergar
    @Field()
    name: string

    @Field()
    email: string
}