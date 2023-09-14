import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { investmentProviders } from './investment.providers';
import { InvestmentService } from './investment.service';


@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    ...investmentProviders,
    InvestmentService,
  ],
  exports: [InvestmentService]
})
export class InvestmentModule {}