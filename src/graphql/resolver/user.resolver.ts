//Um resolver é um conjunto de querys e mutations

import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateOneUseArgs } from "../args/create-one-user.args";


@Resolver()
export class UserResolver {
    @Query(() => String)
    user(){
        return 'Hello world'
    }

    @Mutation(() => String)
    createOneUser(@Args() args: CreateOneUseArgs){
        console.log(args)
        return 'Usuário criado com sucesso!'
    }

}