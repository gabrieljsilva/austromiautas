import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

const petAgeRelation = {
  singular: ['dia', 'mês', 'ano'],
  plural: ['dias', 'meses', 'anos'],
};

function isValidPetAge(age: string): boolean {
  const partsCount = age.split(' ').length;

  if (partsCount !== 2) return false;

  const [ageNumber, dateName] = age.split(' ');
  if (ageNumber === '1') {
    return petAgeRelation.singular.includes(dateName);
  }
  return petAgeRelation.plural.includes(dateName);
}

@ValidatorConstraint({ name: 'isValidPetAge', async: false })
export class IsValidPetAge implements ValidatorConstraintInterface {
  validate(age: string, args: ValidationArguments) {
    return isValidPetAge(age);
  }

  defaultMessage(args: ValidationArguments) {
    return 'invalid pet age';
  }
}
