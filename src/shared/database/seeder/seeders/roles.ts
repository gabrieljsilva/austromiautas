import { Connection } from 'typeorm';

export async function seedRoles(connection: Connection, roles: string[]) {
  const qb = connection.createQueryBuilder();
  return qb
    .insert()
    .into('roles')
    .values(roles.map((name) => ({ name })))
    .execute();
}
