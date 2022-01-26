import { BaseMessage } from "./base.message";

import { Player } from "src/model/player.model"
import { Room } from "src/model/room.model"

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