import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

const CNPJ_BLACKLIST = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];

function isCNPJ(cnpj: string) {
  if (!cnpj) return false;

  if (typeof cnpj !== 'string') return false;

  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) return false;

  if (CNPJ_BLACKLIST.includes(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != Number(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != Number(digitos.charAt(1))) return false;

  return true;
}

@ValidatorConstraint({ name: 'isCNPJ', async: false })
export class IsCNPJ implements ValidatorConstraintInterface {
  validate(cnpj: string, args: ValidationArguments) {
    return isCNPJ(cnpj);
  }

  defaultMessage(args: ValidationArguments) {
    return 'document must be an CNPJ ';
  }
}
