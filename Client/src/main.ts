import { FGLOG } from "./Foundation/Logger"
import { FGWebSocket } from "./Foundation/Socket"
import { FGAnimationManager } from "./Manager/AnimationManager"
import { FGChessboardManager } from "./Manager/ChessboardManager"
import { FGChessManager } from "./Manager/ChessManager"
import { FGBaseMessage } from "./Message/base.message"
import { FGMessageEvent, FGMessageHandler } from "./Message/message.handler"
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


let ws = new FGWebSocket()
ws.connect("ws://localhost:3002")
console.log("connect ws")

let msg = new FGBaseMessage()
msg.uid = "6202a3703a5776a9c038bdb7"
msg.roomId = "61f2b8ff6d409df5418b806f"

let msgHandler = new FGMessageHandler(ws)
msgHandler.sendMessage(FGMessageEvent.JOIN_ROOM, msg)

start()


export ={}