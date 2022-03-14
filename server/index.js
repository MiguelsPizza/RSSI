const express = require("express");
const app = express();
const path = require("path");
const wifi = require("node-wifi");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});

// const DIST_DIR = path.join(__dirname, "dist");
// const HTML_FILE = path.join(DIST_DIR, "index.html");

app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(__dirname + "/../client/dist"));

app.get("/rssi", (req, res) => {
  console.log('req.url', req.url)
  if (req.url === "/rssi") {
    res.setHeader("Content-Type", "text/event-stream");
    res.write("data: " + "test!\n\n")
    wifi.init({
      iface: null, // network interface, choose a random wifi interface if set to null
    });
    const sendRssi = () => {
      wifi.getCurrentConnections((error, currentConnections) => {
        if (error) {
          console.log(error);
        } else {
          res.write("data: " + JSON.stringify(currentConnections)+"\n\n");
        }
      });
    };
    setInterval(sendRssi, 1000);
  }

});

// const http = require("http");

// http
//   .createServer((request, response) => {

//     console.log("Requested url: " + request);

//     if (request.url.toLowerCase() === "/") {
//       response.writeHead(200, {
//         Connection: "keep-alive",
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache"
//       });
//       wifi.init({
//         iface: null, // network interface, choose a random wifi interface if set to null
//       });

//       const sendRssi = () => {
//         wifi.getCurrentConnections((error, currentConnections) => {
//           if (error) {
//             console.log(error);
//           } else {
//             response.write(JSON.stringify(currentConnections));
//           }
//         });
//       };

//       setInterval(sendRssi, 10);
//     } else {
//       response.writeHead(404);
//       response.end();
//     }
//   })
//   .listen(3000, () => {
//     console.log("Server running at port:3000");
//   });

// // response.writeHead(200, {
// //   Connection: "keep-alive",
// //   "Content-Type": "text/event-stream",
// //   "Cache-Control": "no-cache"
// // });

// // setTimeout(() => {
// //   response.write('data: {"flight": "I768", "state": "landing"}');
// //   response.write("\n\n");
// // }, 3000);

// // setTimeout(() => {
// //   response.write('data: {"flight": "I768", "state": "landed"}');
// //   response.write("\n\n");
// // }, 6000);
