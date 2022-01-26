// import { IResponse, ResponseStatus } from "src/foudation/interface";
// import { PlayerModel } from "src/model/PlayerModel";
// import { RoomModel } from "src/model/RoomModel";

// interface joinRoomResponseDto extends IResponse {
//     room: RoomModel
// }

// export class RoomLogic {

//     rooms: { [key: string]: RoomModel } = {}

//     constructor() {
//         this._readDataBase()
//     }

//     join(roomId: string, userId: string): joinRoomResponseDto {

//         let user = PlayerModel.fetch(userId)
//         if (!user) {
//             return { room: null, status: ResponseStatus.FAIL }
//         }

//         let room = this.rooms[roomId]
//         if (!room) {
//             room = new RoomModel()
//             this.rooms[roomId] = room
//         }
//         room.players.push(user)
//         return { room: room, status: ResponseStatus.SUCCESS }
//     }

//     _readDataBase() {
//         this.rooms = {}
//     }
    
// }