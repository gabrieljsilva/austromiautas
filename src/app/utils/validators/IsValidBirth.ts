import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

function isValidBirth(birth: Date): boolean {
  return new Date(birth) < new Date(Date.now());
}

@ValidatorConstraint({ name: 'isValidBirth', async: false })
export class IsValidBirth implements ValidatorConstraintInterface {
  validate(birth: Date, args: ValidationArguments) {
    return isValidBirth(birth);
  }

  defaultMessage(args: ValidationArguments) {
    return 'birth cannot be later than the current date';
  }
}
