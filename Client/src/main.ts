import { FGLOG } from "./Foundation/Logger"
import { FGAnimationManager } from "./Manager/AnimationManager"
import { FGChessboardManager } from "./Manager/ChessboardManager"
import { FGChessManager } from "./Manager/ChessManager"
import { FGView } from "./UI/View"

function start() {
    FGLOG("Start.")

    let rootView = new FGView("root")
    rootView.element = document.body
    rootView.isRoot = true

    let bMgr = new FGChessboardManager()
    let cMgr = new FGChessManager()

    bMgr.addViewToRoot(rootView)
    cMgr.addViewToRoot(rootView)

    bMgr.createHomes()
    bMgr.createSteps()

    cMgr.createChess()

    for (let pos: number = 0; pos < 4; pos++) {
        for (let idx = 0; idx < 4; idx++) {
            cMgr.chessesGoHome(bMgr.homes[pos], pos, idx)

        }
    }

    cMgr.chessMoveToStep(bMgr.steps[5], 1, 2)


    rootView.render()

    // let ani = new FGAnimationManager()
    // let startChess = mgr.chesses[0][0]
    // let des = mgr.steps[3]
    //     ani.moveView(startChess, {x: startChess.frame.x, y: startChess.frame.y}, {x: 3, y: 3}, 1000, () => {
    //     console.log("end")
    // })

    // ani.moveChess(startChess, des, () => {
    //     console.log("end")
    // })


}

start()


export ={}