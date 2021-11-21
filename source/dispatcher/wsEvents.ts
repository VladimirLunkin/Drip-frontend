import ws from '../store/wsStore.js';
import { NewMessage } from './chatEvents.js';
import { NewMessageWS } from '../requests/messageWS.js'

export const wsRegister = () => {
    ws.get().connect.onmessage = NewMessageWS(NewMessage);
};
