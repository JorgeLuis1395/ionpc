import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as dotenv from 'dotenv';
import {Logger, ValidationPipe} from '@nestjs/common';
import * as bodyParser from 'body-parser';
dotenv.config({path: `env/${process.env.NODE_ENV}.env`});

import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { config } from 'rxjs';
import { join } from 'path';

import { NestExpressApplication } from '@nestjs/platform-express';



async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true
  });
  await app.listen(3000)
  }

bootstrap();
