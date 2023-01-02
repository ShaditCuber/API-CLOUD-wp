const fs = require('fs')
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"))
const whatsappService = require("../services/whatsAppService")

const verifyToken = (req, res) => {

    try {
        var accessToken = "SFHJ34FY3489FYHFUIJDSHBF4389FHDIF9DD";
        var token = req.query["hub.verify_token"];
        var challengue = req.query["hub.challengue"];

        if (challengue != null && token != null && token == accessToken) {
            res.send(challengue)
        } else {
            res.status(400).send()

        }
    } catch (e) {
        res.status(400).send()
    }
};




const receivedMessage = (req, res) => {
    try {
        var entry = (req.body['entry'])[0];
        var changes = (entry['changes'])[0];
        var value = changes['value'];
        var messageObject = value['messages'];

        if (typeof messageObject != "undefined") {
            var messages = messageObject[0]
            var number = messages['from']
            var text = getTextUser(messages)
            myConsole.log(text);
            whatsappService.enviarMensajeWP("El usuario dijo : " + text, number)
        }

        res.send("EVENT_RECEIVED")
    } catch (error) {
        res.send("EVENT_RECEIVED")
    }
};

function getTextUser(messages) {
    var text = "";
    var typeMessage = messages['type'];
    if (typeMessage == "text") {
        text = (messages["text"])["body"]
    } else if (typeMessage == "interactive") {
        var interactiveObject = messages['interactive'];
        var typeInteractive = interactiveObject["type"];

        if (typeInteractive == "button_reply") {
            text = (interactiveObject["button_reply"])["title"]
        } else if (typeInteractive == "list_reply") {
            text = (interactiveObject["list_reply"])["title"]
        } else {
            myConsole.log("Sin mensaje")
        }
    } else {
        myConsole.log("Sin mensaje")

    }
    return text
}




module.exports = {
    verifyToken,
    receivedMessage
}