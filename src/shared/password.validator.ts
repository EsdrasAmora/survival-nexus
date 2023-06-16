import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'PasswordValidator', async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(value: unknown) {
    return this.checkErrors(value).length === 0;
  }

  private checkErrors(value: unknown) {
    const errors = [];
    if (typeof value !== 'string') {
      errors.push('Value must be a string');
      return errors;
    }
    // should not be hard coded as 8
    if (value.length < 8) {
      errors.push('Must be at least 8 characters long');
    }
    if (value.match(/\d/) === null) {
      errors.push('Must contain at least one digit');
    }
    if (value.match(/[a-z]/) === null) {
      errors.push('Must contain at least one lowercase letter');
    }
    if (value.match(/[A-Z]/) === null) {
      errors.push('Must contain at least one uppercase letter');
    }
    return errors;
  }

  defaultMessage(args: any) {
    return `Password: ${this.checkErrors(args.value).join(`;`)}`;
  }
}
