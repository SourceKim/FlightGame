import { Inject, Injectable, UseFilters, WsExceptionFilter } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { GameService } from 'src/game/game.service';

@Injectable()
@UseFilters(new BaseWsExceptionFilter())
export class SocketService {

    socketMap: { [uid: string]: WebSocket } = {}

    constructor(
        @Inject(GameService) private readonly gameService: GameService
    ) {
        gameService.sendMessageHandler = (to, msg) => {
            let client = this.socketMap[to]
            if (client) {
                client.send(msg.toJson())
            }
        }
    }

    onRoomJoined(client: WebSocket, data: JoinRoomDTO) {
        this.socketMap[data.uid] = client
        return this.gameService.joinRoom(data.uid, data.roomId)
    }

    broadcast(roomId: string, message:string) {

    }
}
