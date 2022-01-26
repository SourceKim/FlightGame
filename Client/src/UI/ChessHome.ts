import { FGLOG } from "../Foundation/Logger";
import { FGChessHomeSlot } from "./ChessHomeSlot";
import { FGCOLOR, FGFrame } from "./UI";
import { FGView } from "./View";

class FGChessHome extends FGView  {

    slots: FGChessHomeSlot[] = []

    constructor() {
        super("ChessHome");
    }

    addSlots() {
        for (let idx = 0; idx < 4; idx++) {
            let slot = new FGChessHomeSlot(idx)
            slot.update()
            this.addSubview(slot)
            this.slots.push(slot)
        }
    }

}

export {FGChessHome}