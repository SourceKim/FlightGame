import { Module } from '@nestjs/common';
import { GameModule } from 'src/game/game.module';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  imports: [GameModule],
  providers: [SocketService, SocketGateway],
  exports: [SocketService]
})
export class SocketModule {}
