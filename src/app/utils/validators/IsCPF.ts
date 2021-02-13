import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

const CPF_BLACK_LIST = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
];

function isCPF(cpf: string): boolean {
  if (!cpf) return false;

  if (cpf.length !== 11) {
    return false;
  }
  if (CPF_BLACK_LIST.includes(cpf)) {
    return false;
  }
  let numero = 0;
  let caracter = '';
  const numeros = '0123456789';
  let j = 10;
  let somatorio = 0;
  let resto = 0;
  let digito1 = 0;
  let digito2 = 0;
  let cpfAux = '';
  cpfAux = cpf.substring(0, 9);
  for (let i = 0; i < 9; i++) {
    caracter = cpfAux.charAt(i);
    if (numeros.search(caracter) == -1) {
      return false;
    }
    numero = Number(caracter);
    somatorio = somatorio + numero * j;
    j--;
  }
  resto = somatorio % 11;
  digito1 = 11 - resto;
  if (digito1 > 9) {
    digito1 = 0;
  }
  j = 11;
  somatorio = 0;
  cpfAux = cpfAux + digito1;
  for (let i = 0; i < 10; i++) {
    caracter = cpfAux.charAt(i);
    numero = Number(caracter);
    somatorio = somatorio + numero * j;
    j--;
  }
  resto = somatorio % 11;
  digito2 = 11 - resto;
  if (digito2 > 9) {
    digito2 = 0;
  }
  cpfAux = cpfAux + digito2;
  if (cpf != cpfAux) {
    return false;
  } else {
    return true;
  }
}

@ValidatorConstraint({ name: 'isCPF', async: false })
export class IsCPF implements ValidatorConstraintInterface {
  validate(cpf: string, args: ValidationArguments) {
    return isCPF(cpf);
  }

  defaultMessage(args: ValidationArguments) {
    return 'document must be an CPF ';
  }
}
