import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  NotFoundException,
  Get,
  Param,
  HttpCode,
  Delete,
  Query,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Passageiro } from './passageiro.entity';
import { PassageiroService } from './passageiro.service';
@Controller('passageiro')
export class PassageiroController {
  constructor(private service: PassageiroService) {}

  @Get('listaPassageiros')
  public async buscarPassageiros(
    @Query('page') page = 0,
    @Query('size') size = 10,
    @Query('query') nome: string,
  ) {
    return await this.service.buscarPassageiros(page, size, nome);
  }

  @Put()
  public async atualizarPassageiro(
    @Body() passageiro: Passageiro,
  ): Promise<NestResponse> {
    const passageiroChecar = await this.service.getPassageiro(passageiro.cpf);

    if (!passageiroChecar) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Passageiro não encontrado',
      });
    }

    const passageiroAtualizado = await this.service.atualizarPassageiro(
      passageiro,
    );

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/passageiro/${passageiroAtualizado.nome}` })
      .withBody(passageiroAtualizado)
      .build();
  }

  @Post()
  public async criarPassageiro(
    @Body() passageiro: Passageiro,
  ): Promise<NestResponse> {
    const passageiroCriado = await this.service.criarPassageiro(passageiro);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/passageiro/${passageiroCriado.nome}` })
      .withBody(passageiroCriado)
      .build();
  }

  @Get(':cpf')
  public async getPassageiro(@Param('cpf') cpf: string) {
    const passageiro = await this.service.getPassageiro(cpf);

    if (!passageiro) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Passageiro não encontrado',
      });
    }

    return passageiro;
  }

  @Delete(':cpf')
  @HttpCode(204)
  public async apagar(@Param('cpf') cpf: string) {
    const passageiroChecar = await this.service.getPassageiro(cpf);

    if (!passageiroChecar) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Passageiro não encontrado',
      });
    }

    const viagens = await this.service.getViagensPassageiro(cpf);

    if (viagens) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Viagens associadas ao passageiro. Impossível deletar.',
      });
    }

    await this.service.deletarPassageiro(passageiroChecar);
  }
}
