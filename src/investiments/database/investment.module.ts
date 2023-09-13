import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { investmentProviders } from './investment.providers';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [InvestmentController],
  providers: [
    ...investmentProviders,
    InvestmentService,
  ],
  exports: [InvestmentService]
})
export class InvestmentModule {}