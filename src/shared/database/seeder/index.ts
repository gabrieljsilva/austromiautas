import { createConnection } from 'typeorm';
import { seedRoles } from './seeders/roles';
import { seedResources } from './seeders/resources';
import { seedPermissions } from './seeders/permissions';

(async () => {
  const connection = await createConnection();
  await seedRoles(connection, ['guest', 'donator']);
  await seedResources(connection, [
    '/',
    '/auth/login',
    '/donators',
    '/donators/addresses',
    '/donators/contacts',
    '/donators/contacts/:id',
    '/users/activate',
  ]);
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
      resource: '/donators/addresses',
    },
    {
      role: 'donator',
      method: 'PUT',
      resource: '/donators/addresses',
    },
    {
      role: 'donator',
      method: 'DELETE',
      resource: '/donators/addresses',
    },
    {
      role: 'donator',
      method: 'GET',
      resource: '/donators/contacts',
    },
    {
      role: 'donator',
      method: 'GET',
      resource: '/donators/contacts/:id',
    },
    {
      role: 'donator',
      method: 'PUT',
      resource: '/donators/contacts/:id',
    },
    {
      role: 'donator',
      method: 'DELETE',
      resource: '/donators/contacts/:id',
    },
    {
      role: 'donator',
      method: 'POST',
      resource: '/donators/contacts',
    },
    {
      role: 'donator',
      method: 'PUT',
      resource: '/donators/contacts',
    },
    {
      role: 'donator',
      method: 'DELETE',
      resource: '/donators/contacts',
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
