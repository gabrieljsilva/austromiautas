## Description
Austromiautas is a project that connects people who want to adopt a pet to people who need to donate them. The project is written in Typescript using the Nestjs framework and the project's default ORM is Typeorm.
 
## Installation
```bash
$ npm install
```

## Setting up enviroment variables
Create a file called ".env" at the root of the project. Then add the following environment variables:

| NAME          | DESCRIPTION                                                                                  | EXAMPLES            |
|---------------|----------------------------------------------------------------------------------------------|---------------------|
| APP_PORT      | The port that will be used to run the app.                                                   | 3333                |
| APP_HOST      | The host name that will be used to run the app.                                              | localhost           |
| APP_PROTOCOL  | The protocol that will be used by the app (http or https)                                    | http                |
| APP_SECRET    | Private key used to encrypt app data.                                                        | SomeHashedString    |
| DB_HOST       | The host name of the database.                                                               | localhost           |
| DB_PORT       | The port of the database.                                                                    | 5432                |
| DB_USER       | The user of the database                                                                     | docker              |
| DB_PASSWORD   | The password for the database user.                                                          | docker              |
| DB_NAME       | The database name.                                                                           | rpa                 |
| REDIS_HOST    | the host name of redis database that will used by application to manage queues and caching.  | localhost           |
| REDIS_PORT    | the port of redis database that will used by application to manage queues and caching.       | 6379                |
| SMTP_HOST     | The SMTP host name that will be used as relay by email services.                             | smtp.mailtrap.io    |
| SMTP_PORT     | The SMTP port that will be used as relay by email services.                                  | 2525                |
| SMTP_USER     | The SMTP user that will be used as relay by email services                                   | your_smtp_username  |
| SMTP_PASSWORD | The SMTP password that will be used as relay by email services                               | your_smtp_password  |

## Running the migrations
Before starting the application we need to run the existing migrations in ```src/shared/database/migrations```. To do this, run one of the following commands:
 
```bash
$ npm run migration:run
```
After that, the environment is ready to run the application.

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Providing initial data to database
To use system authentication we need to feed the database with some initial data. Among the tables that need to be fed are: "roles", "resources" and "permissions".

### Resources table
The "resources" table refers to the resources that users can manipulate through the system, to identify the resources we can look at the name that we put in the "controllers", in this example we will create 3 different resources and they are: "users", "customers" and "auth"(this system uses JWT authentication)

our resource table should look like this:

| id                                   | name      |
|--------------------------------------|-----------|
| f05be280-9846-4d06-b48c-fc74f05c6bf1 | auth      |
| 35c66938-0fe7-4a49-b013-960481060812 | users     |
| 5b645a3f-738b-429b-a57f-c7501a6e6f1c | customers |

### Roles table
The "roles" table will contain all system user roles, including a "guest" user who is not directly registered in the database. In this example we will register 2 different types of user, they are: "guest" and "admin".

Our table of roles should look like this:  

| id                                   | name  |
|--------------------------------------|-------|
| 8c0fc252-7cd4-4154-bb2f-8a09203c539d | guest |
| 852930c3-d94c-40ed-94c4-9b0bef43a5db | admin |

### Permissions table
In the "permissions" table, we assign access permissions to certain resources for certain roles, in addition, we need to provide the http method. Through this table we can read the permissions as follows: "role CAN http_method resource".

As an example I will add some permissions using the data already registered above.

| id | role_id                              | method | resource_id                          |
|----|--------------------------------------|--------|--------------------------------------|
|    | 8c0fc252-7cd4-4154-bb2f-8a09203c539d | POST   | f05be280-9846-4d06-b48c-fc74f05c6bf1 |
|    | 8c0fc252-7cd4-4154-bb2f-8a09203c539d | POST   | 35c66938-0fe7-4a49-b013-960481060812 |
|    | 852930c3-d94c-40ed-94c4-9b0bef43a5db | GET    | 5b645a3f-738b-429b-a57f-c7501a6e6f1c |

We can read the following permissions as follows:

"guest can post auth" <br>
"guest can post users" <br>
"admin can get customers" <br>

### Seeding utility

You can configure a utility to seed data in the following directory: "src/shared/database/seeder". The data to be seeded should not go to the repository.

/*
  This session is still being documented
*/

após configurado os dados rode o seguinte comando para aplicar as alterações:

```bash
npm run seeder:seed
```

## Protecting resources
To protect our routes we need to use a Decorator called "Protect", which can be found inside the "auth" module, this decorator receives the resource name as the first parameter (same in the database) and the other parameters are other optional decorators. Example:

```ts
import { Controller, Get } from  '@nestjs/common';
import { Protect } from './auth/protect.decorator';

@Controller()
export class AppController {
	@Protect('index')
	@Get()
	index() {
		return { hello:  'World' };
	}
}
```

In the example above we import the "Protect" decorator and decorate our "Get" route by passing the resource name as a parameter, every time this route is accessed by a client, this decorator will check the permissions in the database and check whether the accessor has the necessary permissions or not. If the user does not have permission to access any resource, a 403 error will be thrown, like this:

```json
{
	"statusCode":  403,
	"message":  "access denied",
	"error":  "Forbidden"
}
```
## Patterns
This project is divided into several layers, each with its own responsibility. We can categorize them into:

- Controllers;
- Actions;
- Services;
- Entities/Repositories;

### Controllers
Layer responsible for mapping routes and receiving requests. In this layer, some validations and serialization of the received data will take place. The controller is also responsible for returning the data to the client.

### Actions
Actions will be used by the controllers and is responsible for executing the request. This layer will contain the business rules and the processed data that will be returned to the client. Actions can use the services layer to execute their purpose. Action will never use Entities/Repositories directly.

### Services
Services is a layer that should contain support functions for Actions or other Services. This layer will make the connection between Actions and Entities/Repositories, external APIs.

### Entities/Repositories
This layer is responsible for interacting with the database, no layer other than services can make use of the entities / repositories directly.

## Open API
Open API is a specification for API documentation. Nestjs has an extension to work with Open API based on decorators. All Controllers, Actions and DTO (Data Transfer Object) must be mapped.
[see the Open Opi documentation](https://docs.nestjs.com/openapi/introduction)

## Data Validation and Data Serialization
All data received from the client must be validated and serialized to ensure that both actions and services receive the information necessary to execute the request. To validate and serialize we use two external libraries, they are: ["class-validator"](https://docs.nestjs.com/techniques/validation) and ["class-transformer"](https://docs.nestjs.com/techniques/serialization).

All DTOs must be declared within the "DTO" folder within their corresponding module. All DTO properties must be marked with the decorator "@Expose" from lib "class-transformer", this will guarantee that the data will be correctly serialized, without extra information or missing.

## Email Queue Jobs
This boilterplate has an email processing implementation with Nodemailer and Bull. It is available in the global module "emails".

## Docker Utility

We can run this project using Docker Compose. For that we must run the following command

`` bash
docker-compose --env-file .env up
``

This command will delete the dist and node_modules folders and then recreate them when the container is starting. In addition, the postgres and redis databases will be instantiated.

In the .env file add the following environment variables:
- "DB_HOST" for "postgresdb";
- "REDIS_HOST" to "redisdb".

This configuration will allow you to connect the application directly over the Docker network.