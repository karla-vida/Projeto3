/* eslint-disable prettier/prettier */
import { Viagem } from './../viagem/viagem.entity';
import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { Motorista } from 'src/motorista/motorista.entity';
import { Passageiro } from 'src/passageiro/passageiro.entity';

@Injectable()
export class DatabaseLabCar {
  private FILENAME_MOTORISTA = 'motoristas.json';
  private FILENAME_PASSAGEIRO = 'passageiros.json';
  private FILENAME_VIAGEM = 'viagens.json';

  public async getViagens(): Promise<Viagem[]> {
    const viagensInFile = await readFile(this.FILENAME_VIAGEM, 'utf-8');
    const viagens = JSON.parse(viagensInFile);
    return viagens;
  }

  public async gravarViagem(viagem: Viagem) {
    let viagens = await this.getViagens();
    if (!viagens) {
      viagens = [];
    }
    await writeFile(this.FILENAME_VIAGEM, JSON.stringify([...viagens, viagem]));
  }

  public async gravarViagens(viagens: Viagem[]) {
    await writeFile(this.FILENAME_VIAGEM, JSON.stringify(viagens));
  }

  public async getMotoristas(): Promise<Motorista[]> {
    const motoristasInFile = await readFile(this.FILENAME_MOTORISTA, 'utf-8');
    const motoristas = JSON.parse(motoristasInFile);
    return motoristas;
  }

  public async gravarMotorista(motorista: Motorista) {
    let motoristas = await this.getMotoristas();
    if (!motoristas) {
      motoristas = [];
    }
    await writeFile(
      this.FILENAME_MOTORISTA,
      JSON.stringify([...motoristas, motorista]),
    );
  }

  public async gravarMotoristas(motoristas: Motorista[]) {
    await writeFile(this.FILENAME_MOTORISTA, JSON.stringify(motoristas));
  }

  public async getPassageiros(): Promise<Passageiro[]> {
    const passageirosInFile = await readFile(this.FILENAME_PASSAGEIRO, 'utf-8');
    const passageiros = JSON.parse(passageirosInFile);
    return passageiros;
  }

  public async gravarPassageiro(passageiro: Passageiro) {
    let passageiros = await this.getPassageiros();
    if (!passageiros) {
      passageiros = [];
    }
    await writeFile(
      this.FILENAME_PASSAGEIRO,
      JSON.stringify([...passageiros, passageiro]),
    );
  }

  public async gravarPassageiros(passageiros: Passageiro[]) {
    await writeFile(this.FILENAME_PASSAGEIRO, JSON.stringify(passageiros));
  }
}
