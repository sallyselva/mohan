namespace web {
    const CHANNEL = "web";

    // Function to send a JSON message
    function sendJSON(json: any) {
        const msg = JSON.stringify(json);
        const buf = Buffer.fromUTF8(msg);
        control.simmessages.send(CHANNEL, buf);
    }

    // Function to open a URL
    export function open(url: string) {
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

            // Process the received message
            if (data.action === "setSprite") {
                //const imageUrl = data.imageUrl;
                //setSpriteImage(imageUrl);
                console.log("Alert received:" + data.action);
            } else if (data.action === "alert") {
                console.log("Alert received:" + data.message);
            }
        } catch (error) {
            console.error("Failed to parse message:" +  error);
        }
    });
   
}