import { FGCOLOR, FGSize, FGStepType } from "../UI/UI";

class FGChessUtils {

    static getColor(position: number): FGCOLOR {
        return [FGCOLOR.LIGHT_GREEN, FGCOLOR.ROSEATE, FGCOLOR.BLUE, FGCOLOR.ORANGE][position]
    }

    static getShape(code: string): FGStepType {
        if (code == "RD") {
            return FGStepType.RIGHT_DOWN
        } else if (code == "LD") {
            return FGStepType.LEFT_DOWN
        } else if (code == "RT") {
            return FGStepType.RIGHT_TOP
        } else if (code == "LT") {
            return FGStepType.LEFT_TOP
        } else if (code == "V") {
            return FGStepType.VERTICAL
        } else if (code == "H") {
            return FGStepType.HORIZON
        }
        return FGStepType.STEP_TYPE_ERROR
    }

    static getSize(shape: FGStepType): FGSize {
        let w = 0, h = 0
        switch (shape) {
            case FGStepType.VERTICAL:
                w = 1
                h = 2
                break
            case FGStepType.HORIZON:
                w = 2
                h = 1
                break
            case FGStepType.LEFT_DOWN:
            case FGStepType.RIGHT_TOP:
            case FGStepType.LEFT_TOP:
            case FGStepType.RIGHT_DOWN:
                w = 2
                h = 2
                break
            default:
                break;
        }
        return {width: w, height: h}
    }
}

export {FGChessUtils}