import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolver/user.resolver';
import { InvestmentModule } from './investiments/database/investment.module';
import { InvestmentResolver } from './investiments/investments.resolver';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    InvestmentModule
  ],
  controllers: [],
  providers: [UserResolver, InvestmentResolver],
})
export class AppModule {}
