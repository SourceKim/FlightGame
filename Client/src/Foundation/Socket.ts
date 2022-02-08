export class FGWebSocket {

    ws?: WebSocket

    constructor() {

    }

    connect(url: string): void {
        this.ws = new WebSocket(url, "tr_json2");
        this.ws.onopen = this.onOpen;
        this.ws.onmessage = this.onMessage;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
    }

    onOpen(event: any): void {
        console.log(event.target)
        console.log("ii - connected");

        console.log(this.ws)
        this.ws?.send("hi")
        event.target.send("{'a': '11'}")
    }

    onMessage(event: any): void {
        console.log(JSON.stringify(event.data));
    
        let str = JSON.parse(event.data.toString());
    
    }

    onError(event: any): void {
        console.log(JSON.stringify(event.data));
        
    }

    onClose(event: any): void {
        console.log(JSON.stringify(event.data));
    }

    send(data: any) {
        this.ws?.send(data) 
    }

}