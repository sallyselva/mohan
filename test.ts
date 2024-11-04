namespace web {
    const CHANNEL = "web";

    function sendJSON(json: any, callback: (data: any) => void) {
        const msg = JSON.stringify(json);
        const buf = Buffer.fromUTF8(msg);

        // Listen for the response once the message is sent
        control.simmessages.onReceived(CHANNEL, (responseBuf: Buffer) => {
            const responseMsg = JSON.parse(responseBuf.toString());

            // Check if the response matches the request action, then call the callback
            if (responseMsg.action === json.action) {
                callback(responseMsg.data);  // Invoke the callback with the response data
            }
        });

        // Send the message
        control.simmessages.send(CHANNEL, buf);
    }

    export function open(url: string, callback: (data: any) => void) {
        sendJSON({
            action: "open",
            url: url
        }, callback);
    }

    control.simmessages.onReceived(CHANNEL, (buf: Buffer) => {
        const msg = JSON.parse(buf.toString());
        info.setScore(2100);

        if (msg.action === "myGameFunction") {
            myGameFunction(msg.data);
        }
    });

    function myGameFunction(data: any) {
        console.log("Game function called with data: " + data);
        // Perform specific game actions here
    }
}
