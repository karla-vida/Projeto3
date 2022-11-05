import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Param,
  NotFoundException,
  Query,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Motorista } from './motorista.entity';
import { MotoristaService } from './motorista.service';
@Controller('motorista')
export class MotoristaController {
  constructor(private service: MotoristaService) {}

  @Get('listaMotoristas')
  public async buscarMotoristas(
    @Query('page') page = 0,
    @Query('size') size = 10,
    @Query('query') nome: string,
  ) {
    return await this.service.buscarMotoristas(page, size, nome);
  }

  @Post()
  public async criarMotorista(
    @Body() motorista: Motorista,
  ): Promise<NestResponse> {
    const motoristaCriado = await this.service.criarMotorista(motorista);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/motorista/${motoristaCriado.nome}` })
      .withBody(motoristaCriado)
      .build();
  }
  @Post('atualizarMotorista')
  public async atualizarMotorista(
    @Body() motorista: Motorista,
  ): Promise<NestResponse> {
    const motoristaChecar = await this.service.getMotorista(motorista.cpf);

    if (!motoristaChecar) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Motorista não encontrado',
      });
    }

    const motoristaAtualizado = await this.service.atualizarMotorista(
      motorista,
    );

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/motorista/${motoristaAtualizado.nome}` })
      .withBody(motoristaAtualizado)
      .build();
  }

  @Post(':cpf')
  public async bloquearOuDesbloquearMotorista(@Param('cpf') cpf: string) {
    const motoristaChecar = await this.service.getMotorista(cpf);
    motoristaChecar.bloqueado = !motoristaChecar.bloqueado;

    if (!motoristaChecar) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Motorista não encontrado',
      });
    }

    const motoristaAtualizado = await this.service.atualizarMotorista(
      motoristaChecar,
    );

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/motorista/${motoristaAtualizado.nome}` })
      .withBody(motoristaAtualizado)
      .build();
  }

  @Delete(':cpf')
  @HttpCode(204)
  public async apagar(@Param('cpf') cpf: string) {
    const motoristaChecar = await this.service.getMotorista(cpf);

    if (!motoristaChecar) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Motorista não encontrado',
      });
    }

    const viagens = await this.service.getViagensMotorista(cpf);

    if (viagens) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Viagens associadas ao motorista. Impossível deletar.',
      });
    }

    await this.service.deletarMotorista(motoristaChecar);
  }

  @Get(':cpf')
  public async getMotorista(@Param('cpf') cpf: string) {
    const motorista = await this.service.getMotorista(cpf);

    if (!motorista) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Motorista não encontrado',
      });
    }

    return motorista;
  }
}
