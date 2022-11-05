import { Injectable } from '@nestjs/common';
import { DatabaseLabCar } from 'src/database/databaseLabCar';
import { Motorista } from './motorista.entity';

@Injectable()
export class MotoristaService {
  constructor(private database: DatabaseLabCar) {}

  public async criarMotorista(motorista: Motorista): Promise<Motorista> {
    await this.database.gravarMotorista(motorista);
    return motorista;
  }

  public async getMotorista(cpf: string) {
    const motoristas = await this.database.getMotoristas();
    return motoristas.find(
      (motorista) => motorista.cpf.toLowerCase() == cpf.toLowerCase(),
    );
  }

  public async getViagensMotorista(cpf: string) {
    const viagens = await this.database.getViagens();
    return viagens.find(
      (viagem) => viagem.idMotorista.toLowerCase() == cpf.toLowerCase(),
    );
  }

  public async atualizarMotorista(
    motoristaBuscado: Motorista,
  ): Promise<Motorista> {
    const motoristas = await this.database.getMotoristas();
    const novaLista = motoristas.filter(
      (motorista) =>
        motorista.cpf.toLowerCase() != motoristaBuscado.cpf.toLowerCase(),
    );
    novaLista.push(motoristaBuscado);
    await this.database.gravarMotoristas(novaLista);
    return motoristaBuscado;
  }

  public async deletarMotorista(motoristaBuscado: Motorista) {
    const motoristas = await this.database.getMotoristas();
    const novaLista = motoristas.filter(
      (motorista) =>
        motorista.cpf.toLowerCase() != motoristaBuscado.cpf.toLowerCase(),
    );
    await this.database.gravarMotoristas(novaLista);
    return motoristaBuscado;
  }

  public async buscarMotoristas(page: number, size: number, nome: string) {
    const indiceInicial = page * size;
    const indiceFinal = indiceInicial + size;

    let motoristas = [];
    if (!nome) {
      motoristas = await this.database.getMotoristas();
    } else {
      const motoristas1 = await this.database.getMotoristas();
      motoristas = motoristas1.filter((motorista) =>
        motorista.nome.toLowerCase().includes(nome.toLowerCase()),
      );
    }

    if (motoristas.length > indiceInicial) {
      if (motoristas.length > indiceFinal) {
        return motoristas.slice(indiceInicial, indiceFinal);
      } else {
        return motoristas.slice(indiceInicial);
      }
    } else {
      return [];
    }
  }
}
