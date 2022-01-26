import { FGLOG, FGLOG_ERROR } from "../Foundation/Logger";
import { FGChess } from "../UI/Chess";
import { FGChessStep } from "../UI/ChessStep";
import { FGPosition } from "../UI/UI";
import { FGView } from "../UI/View";

class FGAnimationManager {

    moveView(view: FGView, from: FGPosition, to: FGPosition, durationMS: number, cb: ()=>void): void {
        if (view.frame.x != from.x || view.frame.y != from.y) {
            FGLOG_ERROR(`Wrong, because view is not at position - x: ${from.x}, y: ${from.y}`)
            return
        }

        FGLOG_ERROR("Moving view")

        const tikTimeMS = 100
        let stepCnt = durationMS / tikTimeMS

        let disX = to.x - from.x
        let disY = to.y - from.y

        let stepX = disX / stepCnt
        let stepY = disY / stepCnt

        let step = 0
        let timer = setInterval(() => {

            view.frame = { x: view.frame.x + stepX, y: view.frame.y += stepY, w: view.frame.w, h: view.frame.h}
            view.update()
            view.parent?.render()

            if (step == stepCnt) {
                view.frame = { x: view.frame.x + stepX, y: view.frame.y += stepY, w: view.frame.w, h: view.frame.h}
                view.update()
                view.parent?.render()
                clearInterval(timer)
                cb()
            }
            step++
        }, tikTimeMS)
    }

    moveChess(chess: FGChess, step: FGChessStep, cb: ()=>void) {
        this.moveView(chess, { x: chess.frame.x, y: chess.frame.y }, { x: step.frame.x, y: step.frame.y}, 1000, () => {
            step.addSubview(chess)
            step.update()
            cb()
            step.render()
        })
    }
}

export {FGAnimationManager}