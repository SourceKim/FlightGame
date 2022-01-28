export enum MessageType {
    UNKNOWN = 0,
    PLAYER = 1,
    ROOM = 2,
}

export class BaseMessage {

    type = MessageType.UNKNOWN
    
    id: string

    sender: any

    receiver: any

    toJson(): string {
        return JSON.stringify(this)
    }

}