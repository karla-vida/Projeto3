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
export class IsPassageiroMenor18Constraint
  implements ValidatorConstraintInterface
{
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (value < 18) {
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
    return 'Passageiro menor de 18 anos';
  }
}

export function IsPassageiroMenor18(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsPassageiroMenor18Constraint,
    });
  };
}
