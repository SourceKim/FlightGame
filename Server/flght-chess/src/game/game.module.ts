import { Module } from '@nestjs/common';
import { LoopModule } from 'src/loop/loop.module';
import { PlayerModule } from 'src/player/player.module';
import { RoomModule } from 'src/room/room.module';
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
  imports: [PlayerModule, RoomModule, LoopModule],
  providers: [GameService],
  exports: [GameService],
  controllers: [GameController]
})
export class GameModule {}
