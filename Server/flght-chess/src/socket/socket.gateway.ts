import { Inject } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { WebSocket } from 'ws'
import { SocketService } from './socket.service';

interface RoomResult {
    status: string
}

@WebSocketGateway(3002)
export class SocketGateway {

  constructor(@Inject(SocketService) private readonly service: SocketService) {

  }

  @SubscribeMessage('joinRoom')
  onJoinRoom(@ConnectedSocket() client: WebSocket, @MessageBody() data: JoinRoomDTO) {
    
    let res = this.service.onRoomJoined(client, data)
    return res
  }
}
