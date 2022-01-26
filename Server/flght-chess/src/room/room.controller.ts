import { Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateRoomDto } from '../dto/room.dto';
import { RoomService } from './room.service';

@Controller('room')
@ApiTags("Room")
export class RoomController {

    constructor(
        @Inject(RoomService) private readonly roomService: RoomService
    ) {

    }

    @Get('all')
    @ApiOperation({ summary: "Get all rooms"})
    async allRooms() {
        return this.roomService.fetchAll()
    }

    @Get(':id')
    @ApiOperation({ summary: "Get a single room" } )
    async room(@Param('id') id: string) {
        return this.roomService.fetch(id)
    }

    @Post('create')
    @ApiOperation( { summary: "Create a room"} )
    async createRoom(@Body() body: CreateRoomDto) {
        return this.roomService.create(body)
    }

    @Post('add_player')
    @ApiOperation( { summary: "Add player"} )
    async addPlayer(@Body() body: CreateRoomDto) {
        // return this.roomService.addPlayer()
    }

    @Put(':id')
    @ApiOperation( {summary: "Update room meta data by room id"})
    async updateRoom(@Param('id') id: string, @Body() body: CreateRoomDto) {
        return this.roomService.update(id, body)
    }
}
