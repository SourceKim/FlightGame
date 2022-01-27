import { Injectable } from '@nestjs/common';
import { BaseMessage } from 'src/message/base.message';
import { Player } from 'src/player/player.model';
import { Room } from 'src/room/room.model';
import { GameLoop, GameSendMessageHandler } from './gameloop';
import { DocumentType } from '@typegoose/typegoose'

@Injectable()
export class LoopService {

    loops: { [key: string]: GameLoop} = {}

    sendMsgHandler: GameSendMessageHandler

    constructor() {
    }

    startGame(room: DocumentType<Room>) {
        console.log(room)
        console.log(`Game started at room ${room.id}`)
        this.loops[room._id] = new GameLoop(room, this._onSendMessageHandler)
    }

    _onSendMessageHandler(to: string, msg: BaseMessage) {
        this.sendMsgHandler(to, msg)
    }
    

}
