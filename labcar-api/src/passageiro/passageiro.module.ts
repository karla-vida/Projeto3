import { Module } from '@nestjs/common';
import { DatabaseLabCar } from 'src/database/databaseLabCar';
import { PassageiroController } from './passageiro.controller';
import { PassageiroService } from './passageiro.service';
import { IsPassageiroCpfValidoConstraint } from './is-passageiro-cpf-valido';
import { IsPassageiroMenor18Constraint } from './is-passageiro-menor18';

@Module({
  controllers: [PassageiroController],
  providers: [
    PassageiroService,
    DatabaseLabCar,
    IsPassageiroCpfValidoConstraint,
    IsPassageiroMenor18Constraint,
  ],
})
export class PassageiroModule {}
