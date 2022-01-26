export enum FlightChessStatus {
    AT_HOME,
    AT_PORT,
    AT_ROAD,
    WON,
}

class FlightChess {
    status = FlightChessStatus.AT_HOME
    pos: number = -1
}

export enum FlightChessError {
    CHESS_CANT_MOVE,
    CHESS_STATUS_WRONG,
}


export type FlightChessErrorCallback = (FlightChessError) => void

export type FlightChessStatusCallback = (player: number, chess: number, status: FlightChessStatus) => void

export  type FlightChessResultCallback = (player: number, chess: number, from: number, to: number) => void

export class FlightChessGame {

    chessPos: FlightChess[][] = []

    errCallback: FlightChessErrorCallback
    statusCallback: FlightChessStatusCallback
    resultCallback: FlightChessResultCallback

    constructor(
        errCallback: FlightChessErrorCallback,
        statusCallback: FlightChessStatusCallback,
        resultCallback: FlightChessResultCallback
        ) {

            this.errCallback = errCallback
            this.statusCallback = statusCallback
            this.resultCallback = resultCallback
            this._initChessPos()
    }

    private _initChessPos() {
        for (let player of [0, 1, 2, 3]) {
            let chesses: FlightChess[] = []
            for (let chess of [0, 1, 2, 3]) {
                let chess = new FlightChess()
                chesses.push(chess)
            }
            this.chessPos.push(chesses)
        }
    }

    goPort(player: number, chess: number) {
        let fc = this.chessPos[player][chess]

        if (fc.status != FlightChessStatus.AT_HOME) {
            this.errCallback.call(FlightChessError.CHESS_STATUS_WRONG)
            return
        }

        fc.status = FlightChessStatus.AT_PORT
        this.statusCallback.call(player, chess, FlightChessStatus.AT_PORT)
    }

    moveChess(player: number, chess: number, step: number) {

        let fc = this.chessPos[player][chess]

        if (fc.status != FlightChessStatus.AT_PORT && fc.status != FlightChessStatus.AT_ROAD) {
            this.errCallback.call(FlightChessError.CHESS_STATUS_WRONG)
            return
        }

        let finalPos = 0

        let from = fc.pos

        // TODO: 完成「叠子不让通过」逻辑

        if (fc.status == FlightChessStatus.AT_PORT) {
            finalPos = this._startIndex(player) + step
            this.resultCallback.call(player, chess, from, finalPos)
        }

        if (fc.status == FlightChessStatus.AT_ROAD) {
            finalPos = from + step
            this.resultCallback.call(player, chess, from, finalPos)
        }
        // TODO: Handle jump
        // TODO: Handle fly
    }

    private _startIndex(pos: number) {
        return pos * 13
    }
}