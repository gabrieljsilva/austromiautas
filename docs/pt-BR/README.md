# Austromiautas
Austromiautas é um projeto que conecta pessoas que querem adotar um pet à pessoas que precisam doá-las.
Este projeto está sendo construído utilizando Nodejs, Typescript e Nestjs.

# Configurações
Antes de executar a aplicação, precisamos configurar o ambiente, para isso siga os seguintes passos:

## Instalação
Instale as dependências do projeto com o seguinte código:

```bash
npm install
```

## Variáveis de ambiente
Para assegurar que o nosso projeto seja executado perfeitamente, precisamos declarar algumas variáveis de ambiente, são elas:

| NAME          | DESCRIPTION                                                                                 | EXAMPLES               |
|---------------|---------------------------------------------------------------------------------------------|------------------------|
| APP_HOST      | O nome do host que será usado para executar a aplicação.                                    | localhost              |
| APP_PORT      | A porta que será usada para executar a aplicação.                                           | 3333                   |
| APP_PROTOCOL  | O protocolo que será usado pelo aplicativo (http ou https).                                 | http                   |
| APP_SECRET    | Chave privada usada para criptografar dados do aplicativo.                                  | SomeHashedSecretString |
| DB_HOST       | O nome do host do banco de dados.                                                           | localhost              |
| DB_PORT       | A porta do banco de dados.                                                                  | 5432                   |
| DB_USER       | O usuário do banco de dados.                                                                | docker                 |
| DB_PASSWORD   | A senha do usuário do banco de dados.                                                       | docker                 |
| DB_NAME       | O nome do banco de dados.                                                                   | austromiautas          |
| REDIS_HOST    | O nome do host do banco de dados redis.                                                     | localhost              |
| REDIS_PORT    | A porta do banco de dados redis.                                                            | 6379                   |
| SMTP_HOST     | O nome do host SMTP que será usado para relay por serviços de e-mail.                       | smtp.mailtrap.io       |
| SMTP_PORT     | A porta SMTP que será usada para relay por serviços de e-mail.                              | 2525                   |
| SMTP_USER     | O usuário SMTP que será usado para relay por serviços de e-mail.                            | your_smtp_username     |
| SMTP_PASSWORD | A senha SMTP que será usada para relay por serviços de e-mail.                              | your_smtp_password     |

Para carregá-las crie um arquivo chamado ".env" na raiz do projeto e preencha com as variáveis de ambiente acima. Todas as variáveis de ambiente acima são obrigatórias.

Exemplo do arquivo .env:
```
APP_PORT=3333
APP_HOST=localhost
APP_PROTOCOL=http
APP_SECRET=someSecretString
...
```

## Typeorm
[Typeorm](https://typeorm.io/) é um ORM voltado para o typescript, ele funciona muito bem para gerenciar conexões com o banco de dados, gerar migrations, entidades e subscribers. As configurações para o Typeorm podem ser encontradas no arquivo "ormconfig.js" localizada na raiz do projeto. Para os demais arquivos (migrations, entities, subscribers e seeders) estão localizadas no seguinte diretório: "src/shared/database". É possível mudar este diretório no arquivo ormconfig.js.

## Migrations

Migrations é uma funcionalidade muito útil no desenvolvimento de software, ela garante que o banco de dados esteja sempre atualizado, mesmo quando há vários desenvolvedores no projeto, além de manter uma "linha do tempo" das alterações feitas ao longo do desenvolvimento e manutenção do projeto. Migrations são declarações em código typescript para realizar alterações no banco de dados, assim podemos executar essas alterações todas de uma vez utilizando o [utilário de linha de comando do Typeorm](https://typeorm.io/#/using-cli).
Parar executar as migrations existentes no projeto, execute o seguinte comando: 
```bash
npm run typeorm migration:run
 ```
Você poderá desfazer uma a uma as migrations executadas com o seguinte comando:
```bash
npm run typeorm migration:revert
 ```

## Seeders
Muitas vezes precisamos iniciar o banco de dados com alguns registros pré-estabelecidos, em nosso caso precisamos alimentar o banco de dados com informações para manter atualizado os sistema de autenticação e autorização. 
o Typeorm não dispõe de uma ferramenta específica para semear dados, então precisamos fazê-las de forma manual. Neste projeto existe uma implementação básica no seguinte diretório: "src/shared/database/seeder". No arquivo "index.ts" deste mesmo diretório podemos adicionar os dados que irão ser registrados no banco de dados e em seguida executar o seguinte comando:

```bash
npm run seeder:seed
 ```
  
Se os dados estiverem configurados de forma correta, os dados serão registrados e então estaremos prontos para executar a aplicação. 

## Executando a aplicação
Podemos executar a aplicação nos seguintes modos:
```bash
# Desenvolvimento 
$ npm run start
# Watch mode
$ npm run start:dev
# Produção
$ npm run start:prod
```

# Conceitos importantes
Aqui veremos alguns conceitos importantes para garantir que o ambiente esteja adequado e que a aplicação das técnicas estejam padronizadas e adequadas durante a implementação dos requisitos para garantir a qualidade do software.

## Docker
[Docker](https://www.docker.com/) é uma poderosa ferramenta de virtualização, com ela podemos subir aplicações em containers de forma rápida e fácil utilizando apenas alguns comandos. Este projeto está configurado para ser utilizado em um ambiente Dockerizado.
Depois de instalar o Docker e configurar as variáveis de ambiente, podemos executar o seguinte comando:
```bash
docker-compose up
```
Em sistemas baseados em linux precisamos dar algumas permissões no arquivo "docker/entrypoint.sh". Para isso execute o seguinte comando:

```bash
sudo chmod +x docker/entrypoint.sh
```
e então:
```bash
sudo docker-compose up
```
Isso deve garantir as permissões adequadas para executar a aplicação.

### Observações
É recomendado usar o docker-compose apenas em ambientes de desenvolvimento.

Ao rodar o projeto com o docker-compose você deverá mudar algumas variáveis de ambiente. Por exemplo: DB_HOST e REDIS_HOST devem corresponder ao nome de seus respectivos containers declarados no arquivo "docker-compose.yml", ou seja, eles deverão possuir os seguintes valores:

```env
DB_HOST=postgresdb
REDIS_HOST=redisdb
...
```

As migrations e seeders deverão ser executadas atráves do terminal do container, isso porque os variáveis de ambiente estão declaradas no contexto dos containers e nossa máquina host não tem acesso explicito a eles. Para acessar o container precisamos seguir os seguintes passos:

#### Listar containers ativos
Após subir o container com o docker-compose, podemos listar todos os containers ativos com o seguinte comando:
```bash
docker container ls
```
Iremos ver algo do tipo:

| CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES                      |
|--------------|-------|---------|---------|--------|-------|----------------------------|
| cd4ba6f0b5df | *     | *       | *       | *      | *     | austromiautas_api_v1_1     |
| 704e637b969e | *     | *       | *       | *      | *     | austromiautas_redisdb_1    |
| 8f977fa32b94 | *     | *       | *       | *      | *     | austromiautas_postgresdb_1 |

Existem 3 containers ativos, o primeiro é a nossa aplicação, o segundo do banco de dados Redis e o terceiro do banco de dados Postgres.

#### Acessando shell do container
Para acessar o shell do container copie o container id da aplicação, em seguida execute o seguinte código:

```bash
docker exec -it appContainerId /bin/ash
```

substitua "appContainerId" pelo id que você copiou, o comando deverá ser parecido com:
```bash
docker exec -it cd4ba6f0b5df /bin/ash
```

Isto irá abrir o shell do container no diretório "/usr/app" onde está os arquivos do projeto, a partir daqui você já pode executar os códigos para rodar as migrations e seeders.

## Autorização
Este projeto possui dois sistemas de autorização, podemos categorizá-las em:
- Autorização passiva;
- Autorização ativa.

### Autorização passiva
Este tipo de autorização determina que apenas usuários portadores de um token passivo poderão acessar os endpoint da API, ou seja, todos os endpoints estão restritos, somente quem possui um token passivo poderá acessar a API. 
Este sistema é utilizado para controlar o uso geral da API. Além do token passivo, outras informações são utilizadas para determinar quem possui autorização e esta informação é o hostname e protocolo (http ou https) do client que está consumindo a API.

### Autorização ativa
A autorização ativa determina que apenas usuários portadores de um token ativo poderão acessar endpoints protegidos. Essencialmente, tokens ativos estão no formado de JWT (json web tokens) e ele carrega a identificação do usuário que está acessando os endpoints. Tokens ativos possuem um tempo de expiração que pode variar de acordo com a sua finalidade.
Este sistema é utilizado em conjunto com o sistema de autenticação e permissões.

### Determinando permissões
Este projeto possui um sistema de autenticação e autorização baseado em [JWT](https://jwt.io/) e [RBAC.](https://en.wikipedia.org/wiki/Role-based_access_control)

Inicialmente, precisamos decorar todos os controllers declarados com o decorator "Protect", podemos encontrá-lo no seguinte diretório "src/app/auth/protect.decorator.ts". Exemplo de implementação:

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
Após isso, precisamos definir explicitamente as autorizações no banco de dados. Para isso utilizaremos as seguintes tabelas no banco de dados: 
- roles;
- resources;
- permissions.

#### roles
São os papeis de usuário do sistema. Por padrão o projeto tem um usuário chamado "guest" que são usuários que não possuem registro no banco de dados. Outros usuários poderão existir, por exemplo: "donators", "admin", etc.
Cada usuário do sistema deverá estar associado a pelo menos um papel.

### resources
São os recursos ou endpoints da API. Podemos determinar os endpoints ao olhar para o nome dado aos Controllers e seus métodos. Por exemplo:
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
No código acima temos um Controller de prefixo "hello" e um método GET de prefixo "world", o endpoint gerado por esse conjunto é o mesmo que: "/hello/world" e é essa informação que deverá ser armazenada como um recurso.

### permissions
É a tabela que irá determinar se determinado papel tem permissão de acessar determinado recurso. É a junção das tabelas "roles" e "resources" acrescida do método da requisição (post, get, update, delete, etc.). 
Em nosso exemplo, vamos adicionar a permissão para que um usuário não cadastrado (guest) possa acessar o endpoint "/hello/world".

Vamos adicionar na tabela "roles" um papel do tipo "guest" (obs: se você já executou as migrations, este papel já deve estar cadastrado.). Devemos ter algo parecido com:

| id                                   | name  |
|--------------------------------------|-------|
| bfd4dea1-9225-431e-b468-9bd973d6819e | guest |

Depois vamos adicionar um recurso na tabela "resources" que vai corresponder ao nosso endpoint. Devemos ter algo como:

| id                                   | name         |
|--------------------------------------|--------------|
| 0e29bb0f-0f72-407e-8e99-7ecb7794a71c | /hello/world |

Após isso vamos fazer a junção desses registros na tabela "permissions", deveremos ter algo assim:

| id               | role_id          | method | resource_id      |
|------------------|------------------|--------|------------------|
| e0b32a1d-d8dc... | bfd4dea1-9225... | GET    | 0e29bb0f-0f72... |

Podemos fazer a leitura dessa permissão da seguinte forma:
"guest pode fazer uma solicitação do tipo GET para /hello/world".

Quando fizermos uma solicitação do tipo GET para esse endpoint, iremos receber um "Hello World" ao invés de um erro 403.

Para qualquer permissão que o papel não seja "guest", o usuário deverá estar devidamente autenticado e o token ativo deverá ser fornecido como um Bearer token no cabeçalho da requisição.

Um token ativo poderá ser obtido no processo de autenticação.

## Autenticação
É o processo para determinar qual usuário está utilizando a API. Este processo utiliza JWT e funciona em conjunto com o sistema de autorização ativa. 
Para autenticar um usuário, este deve estar cadastrado e com status ativo no banco de dados. Uma requisição do tipo POST deverá ser enviada para o endpoint "/auth/login" enviando as credenciais do usuário cadastrado. Se as credenciais estiverem corretas, a API retornará um token de acesso que poderá ser usado no processo de autorização ativa. 
Caso as credenciais estejam incorretas, um erro 403 deverá ser retornado.

## Queue Jobs
Filas de processamento são conceitos importantes, principalmente quando se trata de processamento em segundo plano. O caso de uso mais comum em uma API Rest é o de processamento e envio de emails.
Neste projeto utilizamos uma biblioteca chamada ["Bull"](https://github.com/OptimalBits/bull) e o banco de dados Redis para gerenciar as filas. Diferente de bancos de dados relacionais, o  redis é um banco de dados em memória, muito utilizado para caching de dados e arquiteturas distribuídas.
No diretório "src/app/emails" temos um módulo voltado para processamento e envio de emails. Utilizamos uma biblioteca chamada "EJS" para renderização dos modelos e uma biblioteca chamada "Nodemailer" para despachá-los aos destinatários.

## Open API
[Open API](https://www.openapis.org/), também conhecido como Swagger é uma especificação para de APIs Rest/full. O Nestjs possui um [módulo](https://docs.nestjs.com/openapi/introduction) voltado para o Open API. Toda a especificação da API deverá ser gerada atráves deste módulo.

Podemos acessar a especificação através do seguinte endpoint: "/api_v1". É importante ressaltar, que todos os endpoints, bem como seus DTOs devem estar bem documentados.

# Padrões
Todos os projetos precisam seguir um padrão para manter a qualidade do software, assim facilitando que outros programadores possam trabalhar no mesmo projeto sem tantas dificuldades. Neste projeto alguns padrões também deverão ser seguidos.
Primeiramente vamos dividir o projeto em algumas camadas, cada uma com suas responsabilidades. Assim temos:

- Controllers;
- Actions;
- Services;
- Repositories;
- Entities;

## Controllers
Camada responsável por receber uma requisição e devolver uma resposta, isso inclui a serialização e validação dos dados recebidos.

## Actions
Como o nome propõe é a camada responsável por executar a solicitação do usuário. É nesta camada que vai ocorrer o processamento das regras de negócio

## Services
Services são responsáveis por executar pequenas solicitações que serão utilizadas pela resto do sistema. Como: comunicação com APIs externas e comunicação com banco de dados (através da camada de repositório).

## Repositories
Camada responsável por se comunicar com o banco de dados. Deve ser usado apenas pela camada de serviços. Jamais a camada de Actions ou Controllers deverão fazer uso direto dos repositories. 

## Entities
Camada responsável por representar as tabelas no banco de dados. Deve ser usado apenas pelos repositórios e como tipagem de alguns dados. 