import { FGChessUtils } from "../Foundation/ChessUtils";
import { FGStepInterface } from "../Foundation/StepUtils";
import { FGStepType } from "./UI";
import { FGChessStep } from "./ChessStep";

class FGChessMidStep extends FGChessStep {

    constructor(idx: number, position: number) {

        let x = 0
        let y = 0
        let w = 1
        let h = 1

        if (position == 0) {
            x = idx + 2
            y = 8
        } else if (position == 1) {
            x = 8
            y = idx + 2
        } else if (position == 2) {
            x = 17 - 2 - idx -1
            y = 8
        } else if (position == 3) {
            x = 8
            y = 17 - 2 - idx - 1
        }

        let color = FGChessUtils.getColor(position)
        
        super(idx, {x: x, y: y, width: w, height: h, color: color, shape: FGStepType.MIDSTEP})

        this.scale = {x: 0.9, y: 0.9, z: 0.9}
    }
}

export {FGChessMidStep}