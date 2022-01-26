import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayerDto, UpdateStatusPlayerDto } from 'src/dto/player.dto';
import { ApiErrorCode, ApiException } from 'src/foudation/api.exception';
import { Player } from './player.model';
import { PlayerModel } from "../database/database.mongo"

@Injectable()
export class PlayerService {

    constructor(
    ) {


    }

    async regist(dto: CreatePlayerDto) {
        console.log(dto)
        let player = new Player()
        player.name = dto.name
        return PlayerModel.create(player)
    }

    async fetch(id: string) {
        // if (id == "") {
        //     throw new ApiException("Room id is empty", ApiErrorCode.INVALID_PARAM, HttpStatus.EXPECTATION_FAILED)
        // }
        return PlayerModel.findById(id)
    }

    async fetchAll() {
        return PlayerModel.find()
    }

    async update(id: string, dto: CreatePlayerDto) {
        let player = await this.fetch(id)
        player.name = dto.name
        return PlayerModel.findByIdAndUpdate(id, player)
    }

    async updateStatus(dto: UpdateStatusPlayerDto) {
        let obj = await this.fetch(dto.id)
        obj.status = dto.status
        return obj.save()
    }
}
