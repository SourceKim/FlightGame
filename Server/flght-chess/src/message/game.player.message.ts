import { Player } from "src/player/player.model";
import { Room } from "src/room/room.model";
import { BaseMessage, MessageType } from "./base.message";

export enum PlayerCommand {
    READY,
    ROLL_DICE,
    CHOOSE_CHESS,
}

export class GamePlayerMessage extends BaseMessage {

    type = MessageType.PLAYER

    sender: Player

    receiver: Room

    cmd: PlayerCommand
}


export class GamePlayerRollDiceMessage extends GamePlayerMessage {
    cmd = PlayerCommand.ROLL_DICE

}

export class GamePlayerChooseChessMessage extends GamePlayerMessage {
    cmd = PlayerCommand.CHOOSE_CHESS

    chess: number

}