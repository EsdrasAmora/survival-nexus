import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsNotZero', async: false })
export class IsNotZero implements ValidatorConstraintInterface {
  validate(value: number) {
    return value !== 0;
  }

  defaultMessage() {
    return 'expected value different than 0';
  }
}
