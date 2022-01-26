import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';

@Module({
  imports: [],
  providers: [PlayerService],
  exports: [PlayerService],
  controllers: [PlayerController]
})
export class PlayerModule {}
