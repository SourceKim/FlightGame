import { Room } from "src/room/room.model";
import { DocumentType, getModelForClass, modelOptions, Prop, Ref } from '@typegoose/typegoose'

export enum PlayerStatus {
    IDLE = 0,
    IN_ROOM = 1,
    READY = 2,
    GAMING = 3
}

@modelOptions({
    options:{}
})
export class Player {

    @Prop()
    name?: string

    @Prop({default: PlayerStatus.IDLE})
    status?: PlayerStatus

    @Prop( { ref: () => Room, autopopulate: true } )
    room?: Ref<Room>;
}