import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { TipoViagem } from './tipo-viagem.enum';

export class Viagem {
  @IsNotEmpty()
  @IsString()
  idPassageiro: string;

  @IsNotEmpty()
  @IsString()
  idMotorista: string;

  @IsNotEmpty()
  @IsString()
  origem: string;

  @IsNotEmpty()
  @IsString()
  destino: string;

  @IsNotEmpty()
  @IsEnum(TipoViagem)
  status: TipoViagem;
}
