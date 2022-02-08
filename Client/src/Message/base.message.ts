export class FGBaseMessage {

    uid: string = ""

    roomId: string = ""

    toDict(): { [key: string]: any } {

        return {
            "uid": this.uid,
            "roomId": this.roomId
        }
    }
}