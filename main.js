// // const express = require("express");

// // const app = express;
// var app = require("express")();
// var http = require("http").createServer(app);
// var io = require("socket.io")(http);
// /*
// or we can do it all together in one line like this
// #### const app = require("express")(); ####
// */

// app.get("/milley", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
// io.on("connection", function (socket) {
//   console.log("a user connected");
//   // socket.on("disconnect", function() {
//   //   console.log("user disconnected");
//   // });
//   socket.on("chat message", function (msg) {
//     console.log("message: " + msg);
//     io.emit("chat message", msg);
//   });
// });

// http.listen(3000, () => {
//   console.log("Listening on port 3000!");
// });
