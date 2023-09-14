import { Resolver, Query } from "@nestjs/graphql";



@Resolver()
export class InvestmentResolver {
   

    @Query(() => String)
    investment(){
        return 'Hello world investment'
    }


}