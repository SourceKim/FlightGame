import { FGWebSocket } from "../Foundation/Socket";
import { FGBaseMessage } from "./base.message";

export enum FGMessageEvent {
    JOIN_ROOM = "joinRoom"
}

export class FGMessageHandler {

    private server: FGWebSocket

    constructor(server: FGWebSocket) {
        this.server = server

        this.server.onReceiveMessage = (msg: any) => {
            
            console.log("handler")
            console.log(msg)
        }
    }

    sendMessage(event: FGMessageEvent, message: FGBaseMessage) {

        let msgDict: { [key: string] : any} = {}
        msgDict["event"] = event
        msgDict["data"] = message.toDict()

        let msgJson = JSON.stringify(msgDict)
        this.server?.send(msgJson)
    }

    listenMessage() {

    }


}