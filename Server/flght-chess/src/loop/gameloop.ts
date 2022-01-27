import { BaseMessage } from "src/message/base.message";
import { GamePlayerChooseChessMessage, GamePlayerMessage, GamePlayerRollDiceMessage, PlayerCommand } from "src/message/game.player.message";
import { GameRoomErrorMessage, GameRoomMessage, GameRoomPlayerMoveMessage, GameRoomPlayerRollDiceMessage, GameRoomStartMessage, GameRoomTurnChangeMessage } from "src/message/game.room.message";
import { Player } from "src/player/player.model";
import { Room } from "src/room/room.model";
import { FlightChessError, FlightChessGame, FlightChessStatus } from "./flightchess";


enum GameLoopStatus {

}

interface WatingPlayer {
    player: Player,
    step: number
}

export type GameSendMessageHandler = (toPlayer: string, msg: BaseMessage) => void

export class GameLoop {

    room: Room

    turnIdx = -1

    waiting?: WatingPlayer

    fc: FlightChessGame

    sendMessageHandler: GameSendMessageHandler

    constructor(
        room: Room,
        sendMessageHandler: GameSendMessageHandler
    ) {
        console.log("c")
        this.room = room
        this.fc = new FlightChessGame(
            this._onFlightChessGameError,
            this._onFLightChessStatusChanged,
            this._onFlightChessResult
        )

        this.sendMessageHandler = sendMessageHandler

        this._onGameStart()
    }

    // Flight Chess Game Callbacks
    _onFlightChessGameError(error: FlightChessError) {

    }

    _onFLightChessStatusChanged(player: number, chess: number, status: FlightChessStatus) {

    }

    _onFlightChessResult(player: number, chess: number, from: number, to: number) {
        let moveMsg = new GameRoomPlayerMoveMessage()
        moveMsg.player = (this.room.players as Player[])[player]
        moveMsg.chess = chess
        moveMsg.from = from
        moveMsg.to = to
        this._broadcastMessage(moveMsg)
    }

    _onGameStart() {
        console.log("On game start")
        this._broadcastStartMessage()
        this.turnIdx = -1
        this._nextTurn()
    }

    _nextTurn(updateTurnIdx: boolean = true) {
        if (updateTurnIdx) {
            this.turnIdx += 1
            if (this.turnIdx > this.room.players.length - 1) {
                this.turnIdx = 0
            }
        }
        let ply = this.room.players as Player[]
        this._broadcastTurnChangeMessage(ply[this.turnIdx])
    }

    _broadcastStartMessage() {
        let msg = new GameRoomStartMessage()
        msg.players = this.room.players as Player[]
        this._broadcastMessage(msg)
    }

    _broadcastTurnChangeMessage(player: Player) {
        let msg = new GameRoomTurnChangeMessage()
        msg.player = player
        this._broadcastMessage(msg)
    }

    _broadcastPlayerRollDiceMessage(player: Player, result: number) {
        let msg = new GameRoomPlayerRollDiceMessage()
        msg.player = player
        msg.result = result
        this._broadcastMessage(msg)
    }
    
    onReceiveRollDiceMessage(player: Player) {
        const max = 6
        const min = 0
        let res = parseInt(Math.random()*(max-min+1)+min + "");
        this.waiting = { player: player, step: res }
        this._broadcastPlayerRollDiceMessage(player, res)
    }

    onReceiveChooseChessMessage(player: Player, chess: number) {
        if (!this.waiting) {
            let msg = new GameRoomErrorMessage()
            msg.alert = "Not your turn"
            this._sendMessage(player, msg)
            return
        }

        let step = this.waiting.step

        let idx = this.room.players.indexOf(player)

        this.fc.moveChess(idx, chess, step)

        this.waiting = null

        this._nextTurn(step != 6)
    }


    _broadcastMessage(msg: GameRoomMessage) {

        console.log(`Broadcast message: ${msg}`)

        for (let player of this.room.players) {
            this._sendMessage(player as Player, msg)
        }
     }

     _sendMessage(to: Player, msg: GameRoomMessage) {
         msg.receiver = to
         msg.sender = this.room

         console.log("send")
         console.log(to)
         // TODO: do send by socket
        //  this.sendMessageHandler(to)
     }

    onMessageReceive(msg: GamePlayerMessage) {

        if (msg.receiver != this.room) {
            return
        }

        switch (msg.cmd) {
            case PlayerCommand.ROLL_DICE:
                this.onReceiveRollDiceMessage(msg.sender)
                break

            case PlayerCommand.CHOOSE_CHESS:
                let ccMsg = msg as GamePlayerChooseChessMessage
                this.onReceiveChooseChessMessage(msg.sender, ccMsg.chess)
                break
        }

    }
}