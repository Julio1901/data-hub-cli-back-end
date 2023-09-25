import { Test, TestingModule } from "@nestjs/testing"
import { InvestmentService } from "../../database/investment.service"
import { InvestmentEntity } from "../../database/entity/investment.entity"
import { BankEntity } from "../../database/entity/bank.entity"
import TestUtil from "../../../utils/test/TestUtil"



describe ('Investment Service', () => {

  let service: InvestmentService


  const mockInvestmentRepository = {
    getOne: jest.fn()
  }

  const  mockBankRepository = {
    getOne: jest.fn(),  
    find: jest.fn()
  }

  beforeEach ( async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvestmentService,
        {
          provide: 'INVESTMENT_REPOSITORY',
          useValue: mockInvestmentRepository,
        },
        {
          provide: 'BANK_REPOSITORY',
          useValue: mockBankRepository, // Forneça a instância mock do BankRepository
        },
        {
          provide: InvestmentEntity, // Forneça a classe InvestmentEntity
          useValue: {}, // Você pode fornecer um objeto vazio ou criar um mock, se necessário
        },
        {
          provide: BankEntity, // Forneça a classe BankEntity
          useValue: {}, // Você pode fornecer um objeto vazio ou criar um mock, se necessário
        },
      ],
    }).compile();

    service = module.get<InvestmentService>(InvestmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should list all banks', () => {
    const bank = TestUtil.giveMeAValidBankEntity()
  })

})