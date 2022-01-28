import { Player } from "src/player/player.model";
import { Room } from "src/room/room.model";
import { BaseMessage, MessageType } from "./base.message";

enum RoomCommand {
    GAME_START = 0,
    TURN_CHANGE = 1,
    PLAYER_ROLL_DICE = 2,
    PLAYER_MOVE = 3,
    PLAYER_ARRIVED = 4,
    PLAYER_WIN = 5,
    ERROR = 6,
}

export class GameRoomMessage extends BaseMessage {

    type = MessageType.ROOM

    sender: Room

    receiver: Player

    cmd: RoomCommand
}

export class GameRoomStartMessage extends GameRoomMessage {

    cmd = RoomCommand.GAME_START
    players: Player[]
}

export class GameRoomTurnChangeMessage extends GameRoomMessage {
    cmd = RoomCommand.TURN_CHANGE
    player: Player
}

export class GameRoomPlayerRollDiceMessage extends GameRoomMessage {
    cmd = RoomCommand.PLAYER_ROLL_DICE
    player: Player
    result: number
}

export class GameRoomErrorMessage extends GameRoomMessage {
    cmd = RoomCommand.ERROR

    alert: string
}

export class GameRoomPlayerMoveMessage extends GameRoomMessage {
    cmd = RoomCommand.PLAYER_MOVE
    player: Player
    chess: number
    
    from: number
    to: number

    isFly = false
    isJump = false
}