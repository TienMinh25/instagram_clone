const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (s) => {
    console.error("socket.io connection");
    for (var t = 0; t < 3; t++)
        setTimeout(() => s.emit("message", "message from server"), 1000 * t);
});
