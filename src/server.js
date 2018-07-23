const io = require('socket.io')();

io.on('connection', (client) => {
    console.log("a user connected connected!")
    // here you can start emitting events to the client
    client.on("saySomething", (name) => {
        console.log("received event")
        let sentence = `Hello ${name}, nice to see you`
        io.emit("sendBack", sentence)
    })
    client.on("disconnect", () => {
        console.log("disconnected")
    })
    client.on("newMessage", () => {
        console.log("message received")
        io.emit("tellClients")
    })
})

const port = 8000;
io.listen(port);
console.log('listening on port ', port);