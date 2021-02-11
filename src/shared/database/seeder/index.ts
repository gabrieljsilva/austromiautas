import { createConnection } from 'typeorm';
import { seedRoles } from './seeders/roles';
import { seedResources } from './seeders/resources';
import { seedPermissions } from './seeders/permissions';

(async () => {
  const connection = await createConnection();
  await seedRoles(connection, []);
  await seedResources(connection, []);
  await seedPermissions(connection, []);
})();
