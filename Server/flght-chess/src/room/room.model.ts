import { getModelForClass, modelOptions, Prop, Ref, DocumentType } from "@typegoose/typegoose";
import { Player } from "src/player/player.model";
import { BaseModel } from "src/models/base.model";

@modelOptions({
    schemaOptions: {
        toObject: {
            virtuals: false,
            getters: true,
        }
    }
})
export class Room extends BaseModel<Room> {

    @Prop()
    name: string

    @Prop( { 
        ref: () => Player,
     } )
    players?: Ref<Player>[]

    hasPlayer(player: DocumentType<Player>): boolean {
        for (let p of this.players as DocumentType<Player>[]) {
            if (p._id.toString() == player._id.toString()) {
                return true
            }
        }
        return false
    }

    protected afterAttached(): void {
        for (let p of this.players) {
            let dp = p as DocumentType<Player>
            (p as Player).attachDocument(dp)
        }
    }


}