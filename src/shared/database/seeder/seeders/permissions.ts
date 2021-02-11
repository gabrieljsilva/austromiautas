import { Connection } from 'typeorm';

type ObjectId = {
  id: string;
};

type Permission = {
  role: string;
  method: string;
  resource: string;
};

export async function seedPermissions(connection: Connection, permissions: Permission[]) {
  return Promise.all(
    permissions.map(async (permission) => {
      const role = (await connection
        .createQueryBuilder()
        .select('roles.id')
        .from('roles', 'roles')
        .where('roles.name = :name', { name: permission.role })
        .getOne()) as ObjectId;

      const resource = (await connection
        .createQueryBuilder()
        .select('resources.id')
        .from('resources', 'resources')
        .where('resources.name = :name', { name: permission.resource })
        .getOne()) as ObjectId;

      return connection
        .createQueryBuilder()
        .insert()
        .into('permissions')
        .values([
          {
            role_id: role.id,
            method: permission.method,
            resource_id: resource.id,
          },
        ])
        .execute();
    }),
  );
}
