import { FGLOG } from "../Foundation/Logger";
import { FGChess } from "../UI/Chess";
import { FGChessHome } from "../UI/ChessHome";
import { FGChessStep } from "../UI/ChessStep";
import { FGSceneFrame, FGStepType } from "../UI/UI";
import { FGView } from "../UI/View";

class FGChessManager {

    chessView = new FGView("Chess View")

    chesses: {[pos: number]: FGChess[] } = {}

    constructor() {
        this.chessView.frame = FGSceneFrame
        this.chessView.update()
    }

    addViewToRoot(root: FGView) {
        root.addSubview(this.chessView)
    }

    createChess(): void {
        for (let pos: number = 0; pos < 4; pos++) {
            let cs: FGChess[] = []
            for (let idx = 0; idx < 4; idx++) {
                let c = new FGChess(pos, idx)
                c.update()
                cs.push(c)
            }
            this.chesses[pos] = cs
        }
    }

    chessesGoHome(home: FGChessHome, pos: number, idx: number): void {
        let chess = this.chesses[pos][idx]
        let slot = home.slots[idx]
        let x = home.frame.x + slot.x
        let y = home.frame.y + slot.y

        let cw = chess.frame.w
        let ch = chess.frame.h

        x += (slot.frame.w - cw) / 2
        y += (slot.frame.h - ch) / 2

        chess.frame = {x: x, y: y, w: cw, h: ch}
        // chess.scale = { 
        //     x: home.scale.x * slot.scale.x,
        //     y: home.scale.y * slot.scale.y,
        //     z: home.scale.z * slot.scale.z,
        // }
        chess.update()
        this.chessView.addSubview(chess)
    }

    chessMoveToStep(step: FGChessStep, pos: number, idx: number): void {
        FGLOG(`Chess of [${pos}-${idx}] is moving to step ${step}`)
        let chess = this.chesses[pos][idx]

        let sx = step.frame.x
        let sy = step.frame.y
        let sw = step.frame.w
        let sh = step.frame.h

        let cw = chess.frame.w
        let ch = chess.frame.h

        let x = sx + (sw - cw) / 2
        let y = sy + (sh - ch) / 2

        switch (step.shape) {
            case FGStepType.LEFT_DOWN:
                x -= sw / 5
                y += sh / 5
                break;
            case FGStepType.LEFT_TOP:
                x -= sw / 5
                y -= sh / 5
                break;
            case FGStepType.RIGHT_DOWN:
                x += sw / 5
                y += sh / 5
                break;
            case FGStepType.RIGHT_TOP:
                x += sw / 5
                y -= sh / 5
                break;   
            default:
                break;
        }
        
        chess.frame = {x: x, y: y, w: cw, h: ch}
        chess.update()
        this.chessView.addSubview(chess)
    }
}

export {FGChessManager}