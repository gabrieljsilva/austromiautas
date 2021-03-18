import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import * as version from '../version.js';
import * as morgan from 'morgan';

import { AppModule } from './app/app.module';

const { ENABLE_HTTP_LOGS } = process.env;

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (ENABLE_HTTP_LOGS === 'true') {
    app.use(morgan('tiny'));
  }

  app.enableCors({ origin: '*' });
  app.setViewEngine('ejs');

  const config = new DocumentBuilder()
    .addSecurity('basic', {
      type: 'apiKey',
      in: 'header',
      name: 'X-API-TOKEN',
    })
    .addBearerAuth()
    .setTitle('Austromiautas')
    .setDescription('API Reference for Austromiautas Project')
    .setVersion(version)
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api_v1', app, document);

  const { APP_PORT } = process.env;
  await app.listen(Number(APP_PORT));
})();
