import { IsNotEmpty, IsNumber, MaxLength, IsString } from 'class-validator';
import { IsPassageiroMenor18 } from './is-passageiro-menor18';
import { IsPassageiroCpfValido } from './is-passageiro-cpf-valido';
export class Passageiro {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPassageiroMenor18()
  dataNascimento: number;

  @IsNotEmpty()
  @IsPassageiroCpfValido()
  cpf: string;

  @IsNotEmpty()
  endereco: string;
}
