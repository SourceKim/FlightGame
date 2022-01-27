import { Player } from "src/player/player.model";
import { Room } from "src/room/room.model";
import { BaseMessage } from "./base.message";

export enum PlayerCommand {
    READY,
    ROLL_DICE,
    CHOOSE_CHESS,
}

export class GamePlayerMessage extends BaseMessage {

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