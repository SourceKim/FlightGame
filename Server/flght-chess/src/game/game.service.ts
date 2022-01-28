import { HttpException, Inject, Injectable, Post } from '@nestjs/common';
import { LoopService } from 'src/loop/loop.service';
import { BaseMessage } from 'src/message/base.message';
import { PlayerService } from 'src/player/player.service';
import { RoomService } from 'src/room/room.service';
import { DocumentType } from '@typegoose/typegoose';
import { Room } from 'src/room/room.model';
import { Player } from 'src/player/player.model';
import { SendMessageHandler } from 'src/foudation/shared';

@Injectable()
export class GameService {

    constructor(
        @Inject(RoomService) private readonly roomService: RoomService,
        @Inject(PlayerService) private readonly playerService: PlayerService,
        @Inject(LoopService) private readonly loopService: LoopService,
    ) {
        console.log("GameService construct")
    }

    createGameRoom(room: Room) {

    }

    set sendMessageHandler(handler: SendMessageHandler) {
        console.log("Setting send message handler")
        this.loopService.sendMessageHandler = handler
    }

    async joinRoom(userId: string, roomId: string) {
        let player = await this.playerService.fetch(userId)
        let room = await this.roomService.fetch(roomId)

        if (room.hasPlayer(player)) {
            return "User already in room"
        } else {
            room.players.push(player)
            player.room = room
            room.save()
            player.save()
            return "Join success"
        }

    }

    async playerReady(userId: string, roomId: string) {

        // let room = await this.roomService.fetch(roomId)

        // if (!room) {
        //     return null
        // }
        // let players = room.players

        // let allReady = true
        // if (players.length == 4) {
        //     for (let pl of players) {
        //         let p = pl as Player
        //         if (p.status != PlayerStatus.READY) {
        //             allReady = false
        //         }
        //     }
        // }

        // if (allReady) {
        //     let r = new Room()
        //     r.id = room.id
        //     r.name = room.name
        //     // r.players = room.players
        //     this._startGame(r)
        // }

    }

    async startGame(roomId: string) {
        let r = await this.roomService.fetch(roomId)
        let room = r.attachDocument(r)
        this.loopService.startGame(room)
    }
}
