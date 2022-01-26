import { Injectable } from '@nestjs/common';
import { BaseMessage } from 'src/message/base.message';
import { Player } from "src/model/player.model"
import { Room } from "src/model/room.model"
import { GameLoop, GameSendMessageHandler } from './gameloop';

@Injectable()
export class LoopService {

    loops: { [key: string]: GameLoop}

    sendMsgHandler: GameSendMessageHandler

    constructor() {
    }

    startGame(room: Room) {
        console.log(`Game started at room ${room.id}`)
        this.loops[room.id] = new GameLoop(room, this._onSendMessageHandler)
    }

    _onSendMessageHandler(to: Player, msg: BaseMessage) {
        this.sendMsgHandler(to, msg)
    }
    

}
