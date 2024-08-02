import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { getConnection } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistValidator implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    let result = true;
    const find = { [args.constraints[1]]: args.value };
    const check = await getConnection()
      .getRepository(args.constraints[0])
      .findOne(find);

    if (check) {
      result = false;
    }
    return result;
  }
  defaultMessage(args: ValidationArguments): string {
    return args.property + ' ' + args.value + ' ' + 'already exist';
  }
}

export function IsExist(option: any, validationOption?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    console.log('masuk isExist');
    registerDecorator({
      name: 'IsExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: option,
      options: validationOption,
      validator: ExistValidator,
      async: true,
    });
  };
}
