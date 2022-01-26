import { FGLOG } from "../Foundation/Logger"
import { FGCOLOR, FGFrame, FGViewScale } from "./UI"

class FGView {

    static scale = 40

    vname: string

    frame: FGFrame = { x: 0, y: 0, w: 0, h: 0}

    scale: FGViewScale = {x: 1, y: 1, z: 1}

    // Will be inherited from parent element
    alpha: number = 1

    brightness: number = 1

    isRoot: boolean = false

    color: FGCOLOR | undefined

    element?: HTMLElement
    subviews: FGView[] = []

    parent: FGView | undefined
    
    constructor(vname: string = "DEFAULT") {
        FGLOG(`View has been created, name: ${vname}`)
        this.vname = vname
        this.element = this.generateElement()
    }

    update(): void {
        if (this.isRoot) {
            return
        }
        FGLOG(`Updating ${this.vname}`)
        let elem = this.generateElement()
        this.scaleElement(elem)
        this.alphaElement(elem)
        this.brightElement(elem)
        this.customElement(elem)
        this.element = elem
    }

    render(): void {
        FGLOG(`Rendering ${this.vname}`)
        if (!this.element) {
            FGLOG("No element")
            return
        }

        for (const cn of this.element.childNodes) {
            this.element.removeChild(cn)
        }

        for (const subview of this.subviews) {
            FGLOG(subview)
            if (subview.element) {
                // TODO: Really need this?
                FGLOG(`${this.vname} is appending child: ${subview.vname}`)
                FGLOG(this.element)
                FGLOG(subview.element)
                this.element.appendChild(subview.element)
            }
            subview.render()
        }
    }

    get className(): string {
        return `view`
    }

    protected generateElement(): HTMLElement {
        FGLOG(`Creating element ${this.vname}`)
        let css = this.positionCss() + this.sizeCss() + this.colorCss() || ""
        let elem = document.createElement('div')
        elem.className = this.className
        elem.style.cssText = css
        return elem
    }

    protected positionCss(): string {
        return `
        left: ${this.frame.x * FGView.scale}px;
        top: ${this.frame.y * FGView.scale}px;
        `
    }

    protected sizeCss(): string {
        return `
        width: ${this.frame.w * FGView.scale}px;
        height: ${this.frame.h * FGView.scale}px;
        `
    }

    protected colorCss(): string | undefined {
        if (this.color) {
            return `
            background-color: ${this.color};
            `
        }
        return undefined
    }

    protected scaleElement(elem: HTMLElement) {
        let scaleX = this.scale.x
        let scaleY = this.scale.y
        let scaleZ = this.scale.z
        if (scaleX == 1 && scaleY == 1 && scaleZ == 1) {
            return
        }
        elem.style.cssText += `
        transform:scale3d(${scaleX}, ${scaleY}, ${scaleZ}) ;
        -webkit-transform:scale3d(${scaleX}, ${scaleY}, ${scaleZ});  /*兼容-webkit-引擎浏览器*/
        -moz-transform:scale3d(${scaleX}, ${scaleY}, ${scaleZ});     /*兼容-moz-引擎浏览器*/
        `
    }

    protected alphaElement(elem: HTMLElement) {
        if (this.alpha == 1) {
            return
        }

        elem.style.cssText += `
        opacity: ${this.alpha};
        filter:alpha(opacity=${this.alpha * 100});
        `
    }

    protected brightElement(elem: HTMLElement) {
        if (this.brightness == 1) {
            return
        }

        elem.style.cssText += `
        -webkit-filter:brightness(${this.brightness});//兼容不同浏览器
        -o-filter:brightness(${this.brightness});
        -moz-filter:brightness(${this.brightness});
        filter:brightness(${this.brightness});//设置亮度值，范围 0-1
        `
    }

    // User override
    protected customElement(elem: HTMLElement) {
        return
    }

    protected beingAdded(parent: FGView) {
        // this.removeFromParent()
        this.parent = parent
    }

    removeFromParent() {
        if (this.parent && this.parent.element) {
            const index = this.parent.subviews.indexOf(this, 0);
            if (index > -1) {
                this.parent.subviews.splice(index, 1);
            }
            
            if (this.element) {
                this.parent.element.removeChild(this.element)
            }
        }
    }

    addSubview(view: FGView) {
        view.beingAdded(this)
        this.subviews.push(view)
        this.update()
    }
}

export {FGView}