import { AccessToken } from '../../shared/database/entities/AccessToken';

const defaultPorts = ['80', '443'];

export function generateMagicLink(token: string, accessToken: AccessToken) {
  const isDefaultPort = defaultPorts.includes(accessToken.port);

  return `${accessToken.protocol}://${accessToken.host}${
    isDefaultPort ? '' : ':' + accessToken.port
  }/users/activate?token=${token}`;
}
