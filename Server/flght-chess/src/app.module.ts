import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { SocketModule } from './socket/socket.module';
import { LoopModule } from './loop/loop.module';

@Module({
  imports: [
    RoomModule, 
    GameModule, 
    PlayerModule, 
    SocketModule, 
    LoopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
