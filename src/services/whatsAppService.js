const https = require("https")
const token = "fdsfdsfds"
function enviarMensajeWP(textResponse, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "text",
        "text": {

            "body": textResponse
        }
    })
    const options = {
        host: "graph.facebook.com",
        path: "/v15.0/101607982814366/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    };
    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
        })
    })

    req.on("error", error => {
        console.error(error)
    })

    req.write(data);
    req.end();
}


module.exports = {
    enviarMensajeWP
}