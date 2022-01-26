import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SocketAdapter } from './socket/socket.adapter';
import * as mongoose from 'mongoose';

async function bootstrap() {

  mongoose.connect('mongodb://localhost:27017/', { 
    dbName: 'flight_chess' }, err => {
      if (err) {
        console.log(`Connect mongodb failed with error: ${err}`)
        return
      }
      console.log("Connect mongodb success")
    });
  const app = await NestFactory.create(AppModule);

  // Socket
  app.useWebSocketAdapter(new SocketAdapter(app));
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new BaseWsExceptionFilter());

  // setup swagger
  const options = new DocumentBuilder()
  .setTitle('FlightChess')
  .setDescription('FlightChessGame')
  .setVersion('1.0')
  .addTag('flight-chess')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
