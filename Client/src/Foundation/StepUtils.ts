import { FGChessMidStep } from "../UI/ChessMidStep";
import { FGChessStep } from "../UI/ChessStep";
import { FGCOLOR, FGStepType } from "../UI/UI"
import { FGChessUtils } from "./ChessUtils";
import { FGLOG } from "./Logger";


interface FGStepInterface {
    color: FGCOLOR | undefined,
    x: number,
    y: number,
    width: number,
    height: number,
    shape: FGStepType
}

class FGStepUtil {

    static readSteps(): FGChessStep[] {
        let steps: FGChessStep[] = []

        // Normal steps
        for (let idx = 0; idx < _normalStepRaw.length; idx++) {  
            let raw = _normalStepRaw[idx]  
            let color = FGChessUtils.getColor(raw[0] as number)
            let x = raw[1] as number
            let y = raw[2] as number
            let shape = FGChessUtils.getShape(raw[3] as string)
            let size = FGChessUtils.getSize(shape)

            let step = new FGChessStep(idx, {color: color, x: x, y: y, width: size.width, height: size.height, shape: shape})
            steps.push(step)
        }

        // Mid steps
        for (let pos = 0; pos < 4; pos++) {
            for (let idx = 0; idx < 6; idx++) {
                let step = new FGChessMidStep(idx, pos)
                steps.push(step)
            }
        }
        FGLOG(steps)
        return steps
    }

}

export {FGStepUtil, FGStepInterface}

let _normalStepRaw: (number|string)[][] = [
    [3, 0, 4, "RD"],
    [0, 2, 4, "V"],
    [1, 3, 4, "V"],
    [2, 4, 4, "LD"],
    [3, 4, 4, "RT"],
    [0, 4, 3, "H"],
    [1, 4, 2, "H"],
    [2, 4, 0, "RD"],
    [3, 6, 0, "V"],
    [0, 7, 0, "V"],
    [1, 8, 0, "V"],
    [2, 9, 0, "V"],
    [3, 10, 0, "V"],
    [0, 11, 0, "LD"],
    [1, 11, 2, "H"],
    [2, 11, 3, "H"],
    [3, 11, 4, "LT"],
    [0, 11, 4, "RD"],
    [1, 13, 4, "V"],
    [2, 14, 4, "V"],
    [3, 15, 4, "LD"],
    [0, 15, 6, "H"],
    [1, 15, 7, "H"],
    [2, 15, 8, "H"],
    [3, 15, 9, "H"],
    [0, 15, 10, "H"],
    [1, 15, 11, "LT"],
    [2, 14, 11, "V"],
    [3, 13, 11, "V"],
    [0, 11, 11, "RT"],
    [1, 11, 11, "LD"],
    [2, 11, 13, "H"],
    [3, 11, 14, "H"],
    [0, 11, 15, "LT"],
    [1, 10, 15, "V"],
    [2, 9, 15, "V"],
    [3, 8, 15, "V"],
    [0, 7, 15, "V"],
    [1, 6, 15, "V"],
    [2, 4, 15, "RT"],
    [3, 4, 14, "H"],
    [0, 4, 13, "H"],
    [1, 4, 11, "RD"],
    [2, 4, 11, "LT"],
    [3, 3, 11, "V"],
    [0, 2, 11, "V"],
    [1, 0, 11, "RT"],
    [2, 0, 10, "H"],
    [3, 0, 9, "H"],
    [0, 0, 8, "H"],
    [1, 0, 7, "H"],
    [2, 0, 6, "H"],
]
