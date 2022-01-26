export class BaseMessage {
    
    id: string

    sender: any

    receiver: any

    toJson(): string {
        return JSON.stringify(this)
    }

}