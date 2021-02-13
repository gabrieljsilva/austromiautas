import { createConnection } from 'typeorm';
import { seedRoles } from './seeders/roles';
import { seedResources } from './seeders/resources';
import { seedPermissions } from './seeders/permissions';

(async () => {
  const connection = await createConnection();
  await seedRoles(connection, ['guest', 'donator']);
  await seedResources(connection, ['/', '/auth/login', '/donators', '/donators/addresses', '/users/activate']);
  await seedPermissions(connection, [
    {
      role: 'guest',
      method: 'POST',
      resource: '/auth/login',
    },
    {
      role: 'guest',
      method: 'POST',
      resource: '/donators',
    },
    {
      role: 'donator',
      method: 'POST',
      resource: '/donators/addresses',
    },
    {
      role: 'donator',
      method: 'GET',
      resource: '/donators',
    },
    {
      role: 'guest',
      method: 'PUT',
      resource: '/users/activate',
    },
    {
      role: 'guest',
      method: 'GET',
      resource: '/',
    },
  ]);
})();
