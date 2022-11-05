import { DatabaseLabCar } from 'src/database/databaseLabCar';
import { ViagemModule } from './viagem/viagem.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MotoristaModule } from './motorista/motorista.module';
import { TransformResponseInterceptor } from './core/http/transform-response-interceptor';
import { PassageiroModule } from './passageiro/passageiro.module';
@Module({
  imports: [MotoristaModule, PassageiroModule, ViagemModule],
  controllers: [],
  providers: [
    DatabaseLabCar,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
