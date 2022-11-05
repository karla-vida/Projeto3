import { Module } from '@nestjs/common';
import { DatabaseLabCar } from 'src/database/databaseLabCar';
import { MotoristaController } from './motorista.controller';
import { MotoristaService } from './motorista.service';
import { IsMotoristaCpfValidoConstraint } from './is-motorista-cpf-valido';
import { IsMotoristaMenor18Constraint } from './is-motorista-menor18';

@Module({
  controllers: [MotoristaController],
  providers: [
    MotoristaService,
    DatabaseLabCar,
    IsMotoristaCpfValidoConstraint,
    IsMotoristaMenor18Constraint,
  ],
})
export class MotoristaModule {}
