import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { InvestmentEntity } from './investment.entity';

@Entity()
export class BankEntity {
    @PrimaryGeneratedColumn()
    id: number;  
    
    @Column({ length: 255 })
    name: string
    
    @Column('int')
    savedMoney: number
}