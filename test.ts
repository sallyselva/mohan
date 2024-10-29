namespace web {
    const CHANNEL = "web";
    let responseCallback: ((data: any) => void) | null = null;

    // Function to send a JSON message
    function sendJSON(json: any) {
        const msg = JSON.stringify(json);
        const buf = Buffer.fromUTF8(msg);
        control.simmessages.send(CHANNEL, buf);
    }

    // Function to open a URL with a callback
    export function open(url: string, callback: (data: any) => void): void {
        responseCallback = callback; // Store the callback function

        sendJSON({
            action: "open",
            url: url
        });
    }

    // Setting up the message receiver
    control.simmessages.onReceived(CHANNEL, (buf: Buffer) => {
        const msg = buf.toString(); // Convert buffer to string
        try {
            const data = JSON.parse(msg); // Parse the JSON string
            //game.showLongText(msg,);
            // Process the received message and invoke the callback if available
           // if ((data.action === "setSprite" || data.action === "alert") && responseCallback) {
                console.log("Message received:" + data);
                responseCallback(data); // Call the callback with received data
                responseCallback = null; // Clear the callback after use
           // }
        } catch (error) {
            console.error("Failed to parse message:" + error);
        }
    });
}