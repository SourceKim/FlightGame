export class FGWebSocket {

    ws?: WebSocket

    private pendingData: any[] = []

    public onReceiveMessage?: (msg: any) => void

    constructor() {

    }

    connect(url: string): void {
        this.ws = new WebSocket(url, "tr_json2");
        this.ws.onopen = this.onOpen;
        this.ws.onmessage = this.onMessage;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
    }

    onOpen = (event: any) => {
        // console.log(event.target)
        console.log("ii - connected");

        // this.ws?.send("hi")
        // event.target.send("{'a': '11'}")
        let msgs: any[] = []
        for (const data of this.pendingData) {
            msgs.push(this.pendingData.pop())
        }
        for (const data of msgs) {
            this.send(data)
        }
    }

    onMessage = (event: any) => {
        console.log(event.data)
        console.log(JSON.stringify(event.data));
    
        let str = JSON.parse(event.data.toString());

        this.onReceiveMessage?.call(this, event.data)
    }

    onError = (event: any) => {
        console.log(JSON.stringify(event.data));
        
    }

    onClose = (event: any) => {
        console.log(JSON.stringify(event.data));
    }

    send(data: any) {
        if (this.ws?.readyState == WebSocket.OPEN) {
            this.ws?.send(data)
        } else {
            this.pendingData.push(data)
        }

    }

}