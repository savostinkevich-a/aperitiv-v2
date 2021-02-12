import { Test, TestingModule } from '@nestjs/testing';
import { ConnectsResolver } from './connects.resolver';

describe('ConnectsResolver', () => {
  let resolver: ConnectsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectsResolver],
    }).compile();

    resolver = module.get<ConnectsResolver>(ConnectsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
