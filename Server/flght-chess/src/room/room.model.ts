import { getModelForClass, modelOptions, Prop, Ref, DocumentType } from "@typegoose/typegoose";
import { Player } from "src/player/player.model";

@modelOptions({
    schemaOptions: {
        toObject: {
            virtuals: false,
            getters: true,
        }
    }
})
export class Room {

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


}