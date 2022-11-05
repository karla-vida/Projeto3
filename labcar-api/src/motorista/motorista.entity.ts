import {
  IsNotEmpty,
  IsNumber,
  MaxLength,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { IsMotoristaMenor18 } from './is-motorista-menor18';
import { IsMortoristaCpfValido } from './is-motorista-cpf-valido';
export class Motorista {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  @IsMotoristaMenor18()
  dataNascimento: number;

  @IsNotEmpty()
  @IsMortoristaCpfValido()
  cpf: string;

  @IsNotEmpty()
  placa: string;

  @IsNotEmpty()
  modelo: string;

  @IsBoolean()
  @IsOptional()
  bloqueado: boolean;
}
