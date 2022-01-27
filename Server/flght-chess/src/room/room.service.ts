import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ApiErrorCode, ApiException } from "src/foudation/api.exception";
import { CreateRoomDto } from "../dto/room.dto";
import { Room } from "./room.model";
import { RoomModel } from "../database/database.mongo"
import { DocumentType } from '@typegoose/typegoose';
import { model } from "mongoose";
import { Player } from "src/player/player.model";

@Injectable()
export class RoomService {

    constructor(
    ) {


    }

    async fetch(id: string) {
        // if (id == "") {
        //     return null
        // }
        const room = await RoomModel
        .findById(id)
        .populate({
            path: "players",
            model: Player
        })

        // if (!room) {
        //     return null
        // }

        return room
    }
    async fetchAll() {
        // return this.fetch("ass")
        return RoomModel.find()
    }

    async create(roomDto: CreateRoomDto) {
        let room = new Room()
        room.name = roomDto.name
        room.players = []
        return RoomModel.create(room)
    }

    async update(id: string, newRoomDto: CreateRoomDto) {
        let room = await this.fetch(id)

        room.name = newRoomDto.name

        return RoomModel.findByIdAndUpdate(id, room)
    }
}