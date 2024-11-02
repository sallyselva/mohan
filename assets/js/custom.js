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
$.ajax(
            {
                
                url: '../dbmani.aspx/Insertscore',
                data: '{"un":"' + window.localStorage.getItem('un') + '","score":"' + myArray[1].split('&')[1].split('=')[1] + '"}',
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8", success: function (res) {
                    debugger;
                    alert('{"action": "setSprite", "data":' +  res + '}');                    
                    console.log(res);                    
                    //return '{"action:setSprite"}';
                    //window.parent.postMessage('{"type":"Rtnmsg", "action": "setSprite", "data":' +  res + '}', "*");
                   // sendMessageToArcade("myGameFunction", );    
                    message = JSON.stringify({ action: "myGameFunction", data: {score: 100}});
                  //  buf = uint8ArrayToString(message);
                  //  control.simmessages.send("web", message);
                    //window.postMessage(message,window.localStorage.getItem("simurl"));
                    window.postMessage(message,"*");
                },
                error: function (xhr) {
                    var err = JSON.parse(xhr.responseText);
                    alert(err.message);
                }
            });
//break;
} 
})
