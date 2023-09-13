import { DataSource } from 'typeorm';
import { InvestmentEntity } from './entity/investment.entity';
import { BankEntity } from './entity/bank.entity';


export const investmentProviders = [
  {
    provide: 'INVESTMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(InvestmentEntity),
    inject: ['DATA_SOURCE'],
  },  {

    provide: 'BANK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(BankEntity),
    inject: ['DATA_SOURCE'],
  },
];