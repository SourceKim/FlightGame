import { FGLOG } from "../Foundation/Logger";
import { FGStepUtil } from "../Foundation/StepUtils";
import { FGChess } from "../UI/Chess";
import { FGChessHome } from "../UI/ChessHome";
import { FGChessStep } from "../UI/ChessStep";
import { FGCOLOR, FGSceneFrame } from "../UI/UI";
import { FGView } from "../UI/View";

class FGChessboardManager {

    chessboard = new FGView('Chess Board')

    homes: FGChessHome[] = []

    steps: FGChessStep[] = []

    constructor() {
        this.chessboard.frame = FGSceneFrame
        this.chessboard.color = FGCOLOR.RICE
        this.chessboard.update()
    }

    addViewToRoot(root: FGView) {
        root.addSubview(this.chessboard)
    }

    createHomes(): void {
        const configs: [number, number, FGCOLOR][] = [[0, 0, FGCOLOR.LIGHT_GREEN], [13, 0, FGCOLOR.ROSEATE], [13, 13, FGCOLOR.BLUE], [0, 13, FGCOLOR.ORANGE]]
        for (const config of configs) {
            const home = new FGChessHome()
            home.frame = {x: config[0] + 0.4, y: config[1] + 0.4, w: 3.2, h: 3.2}
            home.color = config[2]
            home.update()
            home.addSlots()
            this.chessboard.addSubview(home)
            this.homes.push(home)
        }
    }

    createSteps(): void {
        let steps = FGStepUtil.readSteps()
        for (const step of steps) {
            step.update()
            FGLOG(step)
            this.chessboard.addSubview(step)
        }
        this.steps = steps
    }
}

export {FGChessboardManager}