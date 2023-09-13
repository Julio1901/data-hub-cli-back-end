import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolver/user.resolver';
import { InvestmentResolver } from './investiments/investment.resolver';
import { InvestmentModule } from './investiments/database/investment.module';
import { InvestmentService } from './investiments/database/investment.service';


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
