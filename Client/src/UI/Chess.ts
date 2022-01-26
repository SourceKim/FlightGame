import { FGChessUtils } from "../Foundation/ChessUtils";
import { FGViewScale } from "./UI";
import { FGView } from "./View";

class FGChess extends FGView {

    idx: number

    x: number = 0
    y: number = 0
    w: number = 0.8
    h: number = 0.8

    parent: FGView | undefined

    constructor(pos: number, idx: number) {
        super("Chess")
        this.color = FGChessUtils.getColor(pos)
        this.idx = idx
        this.frame = { x: this.x, y: this.y, w: this.w, h: this.h }
        this.alpha = 1
    }

    protected customElement(elem: HTMLElement): void {
        elem.style.cssText += `
        border-radius: 50%
        `
    }
}

export {FGChess}