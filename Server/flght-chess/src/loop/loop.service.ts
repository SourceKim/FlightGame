import { Injectable } from '@nestjs/common';
import { BaseMessage } from 'src/message/base.message';
import { Player } from 'src/player/player.model';
import { Room } from 'src/room/room.model';
import { GameLoop } from './gameloop';
import { DocumentType } from '@typegoose/typegoose'
import { SendMessageHandler } from 'src/foudation/shared';

@Injectable()
export class LoopService {

    loops: { [key: string]: GameLoop} = {}

    sendMessageHandler: SendMessageHandler

    constructor() {
        console.log("LoopService construct")
    }

    startGame(room: Room) {
        console.log(`Game started at room ${room.id}`)
        this.loops[room.id] = new GameLoop(room, this._onSendMessageHandler.bind(this))
    }

    _onSendMessageHandler(to: string, msg: BaseMessage) {
        this.sendMessageHandler(to, msg)
    }

}
