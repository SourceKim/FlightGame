import { FGLOG } from "../Foundation/Logger";
import { FGStepInterface } from "../Foundation/StepUtils";
import { FGFrame, FGStepType } from "./UI";
import { FGView } from "./View";

interface FGStringMap {
    [index: string]: string
}

class FGChessStep extends FGView implements FGStepInterface {
    idx: number
    shape: FGStepType
    x: number
    y: number
    width: number
    height: number

    constructor(idx: number, data: FGStepInterface) {
        super('ChessStep')
        this.idx = idx
        this.color = data.color
        this.shape = data.shape
        this.frame = {x: data.x, y: data.y, w: data.width, h: data.height}
        this.x = data.x
        this.y = data.y
        this.width = data.width
        this.height = data.height
    }

    protected generateElement(): HTMLElement {
        FGLOG(`Creating element ${this.vname}`)
        let elem = document.createElement('div')
        elem.className = this.className
        elem.style.cssText = this._css()
        return elem
    }

    private _css(): string {
        let css = this.positionCss()
        switch (this.shape) {
            case FGStepType.VERTICAL:
            case FGStepType.HORIZON:
            case FGStepType.MIDSTEP:
                css += this.sizeCss()
                css += this.colorCss()
                break
            case FGStepType.RIGHT_DOWN:
                css += `border-bottom: ${this.frame.h * FGView.scale}px solid ${this.color};`
                css += `border-left: ${this.frame.w * FGView.scale}px solid transparent;`
                break
            case FGStepType.LEFT_DOWN:
                css += `border-bottom: ${this.frame.h * FGView.scale}px solid ${this.color};`
                css += `border-right: ${this.frame.w * FGView.scale}px solid transparent;`
                break
            case FGStepType.LEFT_TOP:
                css += `border-top: ${this.frame.h * FGView.scale}px solid ${this.color};`
                css += `border-right: ${this.frame.w * FGView.scale}px solid transparent;`
                break
            case FGStepType.RIGHT_TOP:
                css += `border-top: ${this.frame.h * FGView.scale}px solid ${this.color};`
                css += `border-left: ${this.frame.w * FGView.scale}px solid transparent;`
                break
            default:
                break;
        }
        return css
    }
}

export {FGChessStep}
