const express = require('express');
const path = require('path');
const app = express();
const http = require("http");

const socketio = require("socket.io");
const { log } = require('console');

const server = http.createServer(app);

const io = socketio(server);

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on('connection',function (socket){
    socket.on('sendLocation',function (data){
        io.emit("receive-location", {id: socket.id, ...data})
    });
    console.log("connected");
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    }) 
})

app.get('/',function (req,res){
    res.render("index")
})

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

server.listen(3000,()=>{
    console.log("server is running on port 3000")
})