import { ViagemService } from './viagem.service';
import { ViagemController } from './viagem.controller';
import { Module } from '@nestjs/common';
import { DatabaseLabCar } from 'src/database/databaseLabCar';

@Module({
  controllers: [ViagemController],
  providers: [ViagemService, DatabaseLabCar],
})
export class ViagemModule {}
