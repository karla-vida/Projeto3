import { Body, Controller, Get, HttpStatus, Post, Param } from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Viagem } from './viagem.entity';
import { ViagemService } from './viagem.service';
@Controller('viagens')
export class ViagemController {
  constructor(private service: ViagemService) {}
  @Post()
  public async criarViagem(@Body() viagem: Viagem): Promise<NestResponse> {
    const viagemCriada = await this.service.criarViagem(viagem);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/Viagens/${viagemCriada.destino}` })
      .withBody(viagemCriada)
      .build();
  }

  @Get(':cpf')
  public async listaViagensProximasMotorista(@Param('cpf') cpf: string) {
    const viagemCriada = await this.service.getViagemAtualMotorista(cpf);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/Viagens/${viagemCriada.destino}` })
      .withBody(viagemCriada)
      .build();
  }
}
