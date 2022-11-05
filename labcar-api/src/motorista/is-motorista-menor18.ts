import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class IsMotoristaMenor18Constraint
  implements ValidatorConstraintInterface
{
  async validate(
    value: Date,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const dataAtual = new Date();
    const dataValor = new Date(value);
    const difference = dataAtual.getTime() - dataValor.getTime();
    const idade = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));

    if (idade < 18) {
      return new Promise<boolean>((resolve) => {
        resolve(false);
      });
    } else {
      return new Promise<boolean>((resolve) => {
        resolve(true);
      });
    }
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Motorista menor 18';
  }
}

export function IsMotoristaMenor18(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsMotoristaMenor18Constraint,
    });
  };
}
