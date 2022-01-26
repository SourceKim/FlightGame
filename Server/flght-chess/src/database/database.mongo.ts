import { getModelForClass } from "@typegoose/typegoose";
import { Player } from "src/player/player.model";
import { Room } from "src/room/room.model";

export const PlayerModel = getModelForClass(Player)
export const RoomModel = getModelForClass(Room)