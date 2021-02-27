# Austromiautas
Austromiautas is a project that connects people who want to adopt a pet to people who need to donate them.
This project is being built using Nodejs, Typescript and Nestjs.

# Settings
Before running the application, we need to configure the environment, for this follow the following steps:

## Installation
Install the project dependencies with the following code:

```bash
npm install
```

## Environment variables
To ensure that our project runs smoothly, we need to declare some environment variables, they are:

| NAME          | DESCRIPTION                                                                                 | EXAMPLES               |
|---------------|---------------------------------------------------------------------------------------------|------------------------|
| APP_HOST      | The host name that will be used to run the application.                                     | localhost              |
| APP_PORT      | The port that will be used to run the application.                                          | 3333                   |
| APP_PROTOCOL  | The protocol that will be used by the application (http or https).                          | http                   |
| APP_SECRET    | Private key used to encrypt application data.                                               | SomeHashedSecretString |
| DB_HOST       | The host name of the database.                                                              | localhost              |
| DB_PORT       | The database port.                                                                          | 5432                   |
| DB_USER       | The database user.                                                                          | docker                 |
| DB_PASSWORD   | The password for the database user.                                                         | docker                 |
| DB_NAME       | The name of the database.                                                                   | austromiautas          |
| REDIS_HOST    | The host name of the redis database.                                                        | localhost              |
| REDIS_PORT    | The port of the redis database.                                                             | 6379                   |
| SMTP_HOST     | The name of the SMTP host that will be used as a relay by e-mail services.                  | smtp.mailtrap.io       |
| SMTP_PORT     | The SMTP port that will be used as a relay by e-mail services.                              | 2525                   |
| SMTP_USER     | The SMTP user that will be used as a relay by e-mail services.                              | your_smtp_username     |
| SMTP_PASSWORD | The SMTP password that will be used as a relay by e-mail services.                          | your_smtp_password     |

To load them, create a file called ".env" at the root of the project and fill in the environment variables above. All of the above environment variables are mandatory.

Example of the ".env" file:
```
APP_PORT=3333
APP_HOST=localhost
APP_PROTOCOL=http
APP_SECRET=someSecretString
...
```

## Typeorm
[Typeorm](https://typeorm.io/) is an ORM focused on typescript, it works very well to manage connections to the database, generate migrations, entities and subscribers. The settings for Typeorm can be found in the "ormconfig.js" file located at the root of the project. For the other files (migrations, entities, subscribers and seeders) are located in the following directory: "src/shared/database". You can change this directory in the ormconfig.js file.

## Migrations
Migrations is a very useful feature in software development, it ensures that the database is always up to date, even when there are several developers in the project, in addition to maintaining a "timeline" of the changes made during the development and maintenance of the project. . Migrations are declarations in typescript code to make changes to the database, so we can execute these changes all at once using the [Typeorm command line utility](https://typeorm.io/#/using-cli).
To run the existing migrations in the project, run the following command:

```bash
npm run typeorm migration:run
 ```
Você poderá desfazer uma a uma as migrations executadas com o seguinte comando:
```bash
npm run typeorm migration:revert
 ```

## Seeders
Often we need to start the database with some pre-established records, in our case we need to feed the database with information to keep the authentication and authorization system up to date.
Typeorm does not have a specific tool for sowing data, so we need to do it manually. In this project there is a basic implementation in the following directory: "src/shared/database/seeder". In the file "index.ts" of this same directory we can add the data that will be registered in the database and then execute the following command:

```bash
npm run seeder:seed
 ```
  
If the data is configured correctly, the data will be recorded and then we will be ready to run the application.

## Running the application
We can run the application in the following ways:

```bash
# Development 
$ npm run start
# Watch mode
$ npm run start:dev
# Production
$ npm run start:prod
```

# Important concepts
Here we will see some important concepts to ensure that the environment is adequate and that the application of the techniques are standardized and adequate during the implementation of the requirements to guarantee the quality of the software.

## Docker
[Docker](https://www.docker.com/) is a powerful virtualization tool, with which we can upload applications in containers quickly and easily using just a few commands. This project is configured to be used in a Dockerized environment.
After installing Docker and setting the environment variables, we can run the following command:

```bash
docker-compose up
```

On linux-based systems we need to give some permissions to the "docker/entrypoint.sh" file. To do this, run the following command:

```bash
sudo chmod +x docker/entrypoint.sh
```

and then:

```bash
sudo docker-compose up
```

This should ensure adequate permissions to run the application.

### Comments
It is recommended to use docker-compose only in development environments.

When running the project with the docker-compose you must change some environment variables. For example: DB_HOST and REDIS_HOST must match the name of their respective containers declared in the "docker-compose.yml" file, that is, they must have the following values:

```env
DB_HOST=postgresdb
REDIS_HOST=redisdb
...
```

The migrations and seeders must be executed through the container terminal, because the environment variables are declared in the context of the containers and our host machine does not have explicit access to them. To access the container we need to follow the following steps:

#### List active containers
After uploading the container with docker-compose, we can list all active containers with the following command:

```bash
docker container ls
```

We will see something like this:

| CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES                      |
|--------------|-------|---------|---------|--------|-------|----------------------------|
| cd4ba6f0b5df | *     | *       | *       | *      | *     | austromiautas_api_v1_1     |
| 704e637b969e | *     | *       | *       | *      | *     | austromiautas_redisdb_1    |
| 8f977fa32b94 | *     | *       | *       | *      | *     | austromiautas_postgresdb_1 |

There are 3 active containers, the first is our application, the second from the Redis database and the third from the Postgres database.

#### Accessing the container shell
To access the container shell, copy the application's container id, then execute the following code:

```bash
docker exec -it appContainerId /bin/ash
```

replace "appContainerId" with the id you copied, the command should look like:

```bash
docker exec -it cd4ba6f0b5df /bin/ash
```

This will open the container shell in the "/usr/app" directory where the project files are located, from here you can already execute the codes to run the migrations and seeders.

## Authorization
This project has two authorization systems, we can categorize them in:
- Passive authorization;
- Active authorization.

### Passive authorization
This type of authorization determines that only users with a passive token will be able to access the API endpoints, that is, all endpoints are restricted, only those who have a passive token will be able to access the API.
This system is used to control the general use of the API. In addition to the passive token, other information is used to determine who has authorization and this information is the hostname and protocol (http or https) of the client that is consuming the API. The passive token must be passed as a header with the name "X-API-TOKEN".

### Active authorization
Active authorization determines that only users with an active token will be able to access protected endpoints. Essentially, active tokens are in the form of JWT (json web tokens) and it carries the identification of the user who is accessing the endpoints. Active tokens have an expiration time that can vary according to their purpose. Active token must be passed as Bearer Token.
This system is used in conjunction with the authentication and permissions system.

### Determining permissions
This project has an authentication and authorization system based on [JWT](https://jwt.io/) and [RBAC.](https://en.wikipedia.org/wiki/Role-based_access_control)

Initially, we need to decorate all the controllers declared with the "Protect" decorator, we can find it in the following directory "src/app/auth/protect.decorator.ts". Implementation example:

```ts
import { Controller, Get } from  '@nestjs/common';
import { Protect } from  './protect.decorator';

@Protect()
@Controller('hello')
export class HelloController {
	@Get()
	hello() {
		return 'Hello World';
	}
}
```

After that, we need to explicitly define the authorizations in the database. For this we will use the following tables in the database:
- roles;
- resources;
- permissions.

#### roles
These are the user roles of the system. By default the project has a user called "guest" who are users who have no record in the database. Other users may exist, for example: "donators", "admin", etc.
Each user of the system must be associated with at least one role.

### resources
These are the resources or endpoints of the API. We can determine endpoints by looking at the name given to Controllers and their methods. For example:

```ts
import { Controller, Get } from  '@nestjs/common';
import { Protect } from  './protect.decorator';

@Protect()
@Controller('hello')
export class HelloController {
	@Get('world')
	hello() {
		return 'Hello World';
	}
}
```
In the code above we have a Controller with prefix "hello" and a GET method with prefix "world", the endpoint generated by this set is the same as: "/hello/world" and it is this information that should be stored as a resource.

### permissions
It is the table that will determine whether a given role is allowed to access a particular resource. It is the joining of the "roles" and "resources" tables plus the requisition method (post, get, update, delete, etc.).
In our example, we are going to add the permission so that an unregistered user (guest) can access the endpoint "/hello/world".

We will add a "guest" type to the "roles" table (note: if you have already performed the migrations, this role must already be registered.). We should have something like:

| id                                   | name  |
|--------------------------------------|-------|
| bfd4dea1-9225-431e-b468-9bd973d6819e | guest |

Then we will add a resource in the "resources" table that will correspond to our endpoint. We should have something like:

| id                                   | name         |
|--------------------------------------|--------------|
| 0e29bb0f-0f72-407e-8e99-7ecb7794a71c | /hello/world |

Após isso vamos fazer a junção desses registros na tabela "permissions", deveremos ter algo assim:

| id               | role_id          | method | resource_id      |
|------------------|------------------|--------|------------------|
| e0b32a1d-d8dc... | bfd4dea1-9225... | GET    | 0e29bb0f-0f72... |

We can read this permission as follows:
"guest can make a GET request to /hello/world".

When we make a GET request for this endpoint, we will receive a "Hello World" instead of a 403 error.

For any permission that the role is not "guest", the user must be properly authenticated and the active token must be provided as a Bearer token in the request header.

An active token can be obtained in the authentication process.

## Authentication
It is the process of determining which user is using the API. This process uses JWT and works in conjunction with the active authorization system.
To authenticate a user, the user must be registered and have an active status in the database. A POST type request must be sent to the "/auth/login" endpoint, sending the registered user's credentials. If the credentials are correct, the API will return an access token that can be used in the active authorization process.
If the credentials are incorrect, a 403 error should be returned.

## Queue Jobs
Processing queues are important concepts, especially when it comes to background processing. The most common use case in a Rest API is for processing and sending emails.
In this project we use a library called ["Bull"](https://github.com/OptimalBits/bull) and the Redis database to manage the queues. Unlike relational databases, redis is an in-memory database, widely used for data caching and distributed architectures.
In the directory "src/app/emails" we have a module aimed at processing and sending emails. We use a library called "EJS" for rendering models and a library called "Nodemailer" to dispatch them to recipients.

## Open API
[Open API](https://www.openapis.org/), also known as Swagger is a specification for Rest/full APIs. Nestjs has a [module](https://docs.nestjs.com/openapi/introduction) focused on the Open API. The entire API specification must be generated through this module.

We can access the specification through the following endpoint: "/api_v1". It is important to note that all endpoints, as well as their DTOs, must be well documented.

# Standards
All projects need to follow a standard to maintain the quality of the software, thus facilitating that other programmers can work on the same project without so many difficulties. In this project, some standards should also be followed.
First, let's divide the project into a few layers, each with its own responsibilities. So we have:

- Controllers;
- Actions;
- Services;
- Repositories;
- Entities;

## Controllers
Layer responsible for receiving a request and returning a response, this includes the serialization and validation of the data received.

## Actions
As the name suggests, it is the layer responsible for executing the user's request. It is in this layer that the processing of business rules will occur

## Services
Services are responsible for executing small requests that will be used by the rest of the system. How: communication with external APIs and communication with database (through the repository layer).

## Repositories
Layer responsible for communicating with the database. It should only be used by the service layer. The Actions or Controllers layer should never make direct use of the repositories.

## Entities
Layer responsible for representing the tables in the database. It should be used only by the repositories and as a typing of some data.
