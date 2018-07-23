// const io = require('socket.io')();

// io.on('connection', (client) => {
//     console.log("a user connected connected!")
//     // here you can start emitting events to the client
//     client.on("saySomething", (name) => {
//         console.log("received event")
//         let sentence = `Hello ${name}, nice to see you`
//         io.emit("sendBack", sentence)
//     })
//     client.on("disconnect", () => {
//         console.log("disconnected")
//     })
//     client.on("newMessage", () => {
//         console.log("message received")
//         io.emit("tellClients")
//     })
// })

// const port = 8000;
// io.listen(port);
// console.log('listening on port ', port);


const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

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

server.listen(port, () => console.log(`Listening on port ${port}`))