// const http = require("http");

// //Entry point
// const server = http.createServer(function(req, res) {
//   if (req.url === "/") {
//     //check the url of the current request
//     console.log("New request to main page " + Date());
//     //set response header
//     res.writeHead(200, { "Content-type": "text/html" });
//     //set response Content
//     res.write("<html><body><h1>This is home page .</h1></body></html>");
//     res.write("<h2>The time is: " + Date() + " </h2>");
//     res.end();
//   } else if (req.url === "/student") {
//     console.log("New request to student page at " + Date());
//     res.writeHead(400, { "Content-Type": "text/html" });
//     res.write("<html><body><h1>This is student page .</h1></body></html>");
//     res.end();
//   } else {
//     res.end(
//       "<html><body><h2>invalid request at " + Date() + " </h2></body></html>"
//     );
//   }
// });

// //Server start
// server.listen(5001, () => {
//   console.log("Node.js web server at port 5000 is running...");
// });
