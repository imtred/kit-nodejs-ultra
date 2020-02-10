import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { config } from 'dotenv';
import { resolve } from "path"

config({
  path: resolve(__dirname, "../../../.env")
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  await app.listen(process.env.APPLICATION_PORT);
}
bootstrap();
