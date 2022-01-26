import { Body, Controller, Get, Inject, Injectable, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger'
import { CreatePlayerDto, UpdateStatusPlayerDto } from 'src/dto/player.dto';
import { PlayerService } from './player.service';

@Controller('player')
@ApiTags("Player")
export class PlayerController {

    constructor(
        @Inject(PlayerService) private readonly playerService: PlayerService
    ) {

    }

    @Get('all')
    @ApiOperation({ summary: "Get all players"})
    async allPlayers() {
        return this.playerService.fetchAll()
    }

    @Get(':id')
    @ApiOperation({ summary: "Get a single player" } )
    async player(@Param('id') id: string) {
        return this.playerService.fetch(id)
    }

    @Post('register')
    @ApiOperation( { summary: "Register a player"} )
    async regist(@Body() body: CreatePlayerDto) {
        return this.playerService.regist(body)
    }

    @Put(':id')
    @ApiOperation( {summary: "Update player meta data by player id"})
    async updateRoom(@Param('id') id: string, @Body() body: CreatePlayerDto) {
        return this.playerService.update(id, body)
    }

    @Post('update_status')
    @ApiOperation( { summary: "Update player's status"} )
    async updateStatus(@Body() dto: UpdateStatusPlayerDto) {
        return this.playerService.updateStatus(dto)
    }
}
