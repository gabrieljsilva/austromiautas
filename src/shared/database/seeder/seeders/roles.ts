import { Connection } from 'typeorm';

export async function seedRoles(connection: Connection, roles: string[]) {
  await Promise.all(
    roles.map(async (name) => {
      const roleNotExists =
        (await connection
          .createQueryBuilder()
          .select()
          .from('roles', 'roles')
          .where('roles.name = :name', { name })
          .getCount()) === 0;

      if (roleNotExists) {
        return connection.createQueryBuilder().insert().into('roles').values({ name }).execute();
      }
    }),
  );
}
