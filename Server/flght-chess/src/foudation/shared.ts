import { BaseMessage } from "src/message/base.message";


export type SendMessageHandler = (toPlayer: string, msg: BaseMessage) => void