import { FGCOLOR, FGFrame, FGStepType } from "./UI";
import { FGView } from "./View";

class FGChessHomeSlotMask extends FGView {

    constructor() {
        super("Chess Slot Mask")
        this.color = FGCOLOR.BLACK
        this.frame = { x: 0, y: 0, w: 1.6, h: 1.6 }
        this.alpha = 0.3
        this.scale = {x: 0.8, y: 0.8, z: 0.8}
    }

}

class FGChessHomeSlot extends FGView {

    x: number = 0
    y: number = 0
    w: number = 1.6
    h: number = 1.6

    constructor(pos: number) {
        super(`Chess home slot ${pos}`)

        if (pos == 0) {
            this.x = 0
            this.y = 0
        } else if (pos == 1) {
            this.x = 1.6
            this.y = 0
        } else if (pos == 2) {
            this.x = 0
            this.y = 1.6
        } else if (pos == 3) {
            this.x = 1.6
            this.y = 1.6
        }

        this.frame = { x: this.x, y: this.y, w: this.w, h: this.h }

        let mask = new FGChessHomeSlotMask()
        mask.update()
        this.addSubview(mask)
    }
}

export {FGChessHomeSlot}