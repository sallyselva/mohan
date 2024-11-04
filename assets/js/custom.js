/**
 * This will be loaded before starting the simulator.
 * If you wish to add custom javascript, 
 * ** make sure to add this line to pxt.json**
 * 
 *      "disableTargetTemplateFiles": true
 * 
 * otherwise MakeCode will override your changes.
 * 
 * To register a constrol simmessages, use addSimMessageHandler
 */
addSimMessageHandler("web", (data) => {
    console.log("Message received in custom.js:", data);
    switch (data.action) {
        case "open":
            const url = data.url;
            console.log("Opening URL:", url);
            const myArray = url.split("?");
            const score = myArray[1].split('&')[1].split('=')[1];

            $.ajax({
                url: '../dbmani.aspx/Insertscore',
                data: JSON.stringify({ un: window.localStorage.getItem('un'), score: score }),
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    console.log('Score inserted:', res);
                    const message = JSON.stringify({ action: "myGameFunction", data: { score: score } });
                    console.log("Posting message:", message);
                    window.postMessage(message, "*");
                },
                error: function (xhr) {
                    const err = JSON.parse(xhr.responseText);
                    console.error(err.message);
                    alert(err.message);
                }
            });
            break;
    }
});
