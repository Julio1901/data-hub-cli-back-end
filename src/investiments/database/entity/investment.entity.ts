import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BankEntity } from './bank.entity';

@Entity()
export class InvestmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  type: string;


  @Column({ length: 255 })
  name: string;

  @Column('int')
  totalInvested: number;


  @Column({ length: 100 })
  applicationDate: string;
  
  @ManyToOne(() => BankEntity, (bank) => bank.investments)
  bank: BankEntity

}