import { Connection } from 'typeorm';

export async function seedResources(connection: Connection, resources: string[]) {
  return await Promise.all(
    resources.map(async (name) => {
      const resourceNotExists =
        (await connection
          .createQueryBuilder()
          .select()
          .from('resources', 'resources')
          .where('resources.name = :name', { name })
          .getCount()) === 0;

      if (resourceNotExists) {
        return connection.createQueryBuilder().insert().into('resources').values({ name }).execute();
      }
    }),
  );
}
