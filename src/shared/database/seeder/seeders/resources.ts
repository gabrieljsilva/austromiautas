import { Connection } from 'typeorm';

export async function seedResources(connection: Connection, resources: string[]) {
  const qb = connection.createQueryBuilder();
  return qb
    .insert()
    .into('resources')
    .values(resources.map((name) => ({ name })))
    .execute();
}
