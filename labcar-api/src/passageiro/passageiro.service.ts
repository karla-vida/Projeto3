import { Passageiro } from './passageiro.entity';
import { Injectable } from '@nestjs/common';
import { DatabaseLabCar } from 'src/database/databaseLabCar';

@Injectable()
export class PassageiroService {
  constructor(private database: DatabaseLabCar) {}

  public async criarPassageiro(passageiro: Passageiro): Promise<Passageiro> {
    await this.database.gravarPassageiro(passageiro);
    return passageiro;
  }

  public async getPassageiro(cpf: string) {
    const passageiros = await this.database.getPassageiros();
    return passageiros.find(
      (passageiro) => passageiro.cpf.toLowerCase() == cpf.toLowerCase(),
    );
  }

  public async deletarPassageiro(passageiroBuscado: Passageiro) {
    const passageiros = await this.database.getPassageiros();
    const novaLista = passageiros.filter(
      (passageiro) =>
        passageiro.cpf.toLowerCase() != passageiroBuscado.cpf.toLowerCase(),
    );
    await this.database.gravarPassageiros(novaLista);
    return passageiroBuscado;
  }

  public async getViagensPassageiro(cpf: string) {
    const viagens = await this.database.getViagens();
    return viagens.find(
      (viagem) => viagem.idPassageiro.toLowerCase() == cpf.toLowerCase(),
    );
  }

  public async atualizarPassageiro(
    passageiroBuscado: Passageiro,
  ): Promise<Passageiro> {
    const passageiros = await this.database.getPassageiros();
    const novaLista = passageiros.filter(
      (passageiro) =>
        passageiro.cpf.toLowerCase() != passageiroBuscado.cpf.toLowerCase(),
    );
    novaLista.push(passageiroBuscado);
    await this.database.gravarPassageiros(novaLista);
    return passageiroBuscado;
  }

  public async buscarPassageiros(page: number, size: number, nome: string) {
    const indiceInicial = page * size;
    const indiceFinal = indiceInicial + size;

    let passageiros = [];
    if (!nome) {
      passageiros = await this.database.getPassageiros();
    } else {
      const passageiros1 = await this.database.getPassageiros();
      passageiros = passageiros1.filter((passageiro) =>
        passageiro.nome.toLowerCase().includes(nome.toLowerCase()),
      );
    }

    if (passageiros.length > indiceInicial) {
      if (passageiros.length > indiceFinal) {
        return passageiros.slice(indiceInicial, indiceFinal);
      } else {
        return passageiros.slice(indiceInicial);
      }
    } else {
      return [];
    }
  }
}
