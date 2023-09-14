import { Field, ObjectType, Int } from "@nestjs/graphql";
import { InvestmentEntity } from "../database/entity/investment.entity";

@ObjectType()
export class InvestmentOutput {
  @Field(() => Int)
  id: number;

  @Field()
  type: string;

  @Field()
  name: string;

  @Field(() => Int)
  totalInvested: number;

  @Field()
  applicationDate: string;

  @Field(() => Int)
  bankId: number

  static fromEntity(entity: InvestmentEntity): InvestmentOutput {
    const investment = new InvestmentOutput();
    investment.id = entity.id;
    investment.type = entity.type;
    investment.name = entity.name;
    investment.totalInvested = entity.totalInvested;
    investment.applicationDate = entity.applicationDate;
    investment.bankId = entity.bankId
    return investment;
  }
}