import { DatabaseLabCar } from 'src/database/databaseLabCar';
import { Viagem } from './viagem.entity';
import { Injectable } from '@nestjs/common';
import { TipoViagem } from './tipo-viagem.enum';

@Injectable()
export class ViagemService {
  constructor(private database: DatabaseLabCar) {}

  public async criarViagem(viagem: Viagem): Promise<Viagem> {
    await this.database.gravarViagem(viagem);
    return viagem;
  }

  public async getViagemAtualMotorista(cpf: string) {
    const viagens = await this.database.getViagens();

    return viagens.find(
      (viagem) =>
        viagem.idMotorista.toLowerCase() == cpf.toLowerCase() &&
        viagem.status == TipoViagem.ACCEPTED,
    );
  }
}
