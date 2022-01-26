import { getModelForClass, modelOptions, Prop, Ref } from "@typegoose/typegoose";
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

}