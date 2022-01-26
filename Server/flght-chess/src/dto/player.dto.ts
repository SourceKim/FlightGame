import { ApiProperty } from "@nestjs/swagger";
import { PlayerStatus } from "src/player/player.model";

export class CreatePlayerDto {
    @ApiProperty({description: "player name"})
    name: string
}

export class UpdateStatusPlayerDto {
    @ApiProperty({description: "player id"})
    id: string
    @ApiProperty({description: "new status"})
    status: PlayerStatus
}