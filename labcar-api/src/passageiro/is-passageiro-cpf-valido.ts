import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
@ValidatorConstraint()
export class IsPassageiroCpfValidoConstraint
  implements ValidatorConstraintInterface
{
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (cpf.isValid(value)) {
      return new Promise<boolean>((resolve) => {
        resolve(true);
      });
    } else {
      return new Promise<boolean>((resolve) => {
        resolve(false);
      });
    }
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Passageiro com cpf inválido';
  }
}

export function IsPassageiroCpfValido(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsPassageiroCpfValidoConstraint,
    });
  };
}
