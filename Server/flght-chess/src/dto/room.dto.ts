import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto {
    @ApiProperty({description: "room name"})
    name: string
}

export class AddPlayerRoomDto {

    room_id: string
    player_id: string
}

