namespace web {
    const CHANNEL = "web";

    function sendJSON(json: any) {
        const msg = JSON.stringify(json);
        const buf = Buffer.fromUTF8(msg);
        control.simmessages.send(CHANNEL, buf);
    }

    export function open(url: string) {
        sendJSON({
            action: "open",
            url: url
        });
    }

    export function sendScore(score: number) {
        sendJSON({
            action: "sendScore",
            score: score
        });
    }

    control.simmessages.onReceived(CHANNEL, (buf: Buffer) => {
        const msg = JSON.parse(buf.toString());
        if (msg.action === "sendScore") {
            handleReceivedScore(msg.score);
        } else if (msg.action === "open") {
            open(msg.url);
        }
    });

    function handleReceivedScore(score: number) {
        info.setScore(1000);
        console.log("Score received: " + score);
    }
}