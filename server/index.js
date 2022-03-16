const express = require("express");
const app = express();
const path = require("path");
const wifi = require("node-wifi");
const _ = require("lodash");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});
wifi.init({
  iface: null, // network interface, choose a random wifi interface if set to null
});
// const DIST_DIR = path.join(__dirname, "dist");
// const HTML_FILE = path.join(DIST_DIR, "index.html");

app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(__dirname + "/../client/dist"));

app.get("/rssi", (req, res) => {
  console.log("req.url", req.url);
  if (req.url === "/rssi") {
    res.setHeader("Content-Type", "text/event-stream");
    // res.write("data: " + "test!\n\n")
    // wifi.init({
    //   iface: null, // network interface, choose a random wifi interface if set to null
    // });
    const sendRssi = () => {
      wifi.getCurrentConnections((error, currentConnections) => {
        if (error) {
          console.log(error);
        } else {
          res.write("data: " + JSON.stringify(currentConnections) + "\n\n");
        }
      });
    };
    setInterval(sendRssi, 100);
  }
});

app.get("/intialLoadrssi", (req, res) => {

    const sendRssi = () => {
      wifi.getCurrentConnections((error, currentConnections) => {
        if (error) {
          console.log(error);
        } else {
          res.send(JSON.stringify(currentConnections));
        }
      });
    };
    sendRssi();

});

app.get("/currentConections", (req, res) => {
  wifi.scan((error, networks) => {
    if (error) {
      console.log(error);
    } else {
      console.log(networks.length);
      const newlist = networks
        .filter((network) => {
          return network.quality > 90;
        })
        .sort((a, b) => {
          return b.quality - a.quality;
        });
      console.log(newlist.length);
      res.send(JSON.stringify(newlist));
    }
  });
});

app.get("/auto", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");

  const updateConections = () => {
    wifi.scan((error, networks) => {
      if (error) {
        console.log(error);
      } else {
        console.log(networks.length);
        const newlist = networks
          .filter((network) => {
            return network.signal_level > -70;
          })
          .sort((a, b) => {
            return b.quality - a.quality;
          });
        console.log(newlist.length);
        res.write("data: " + JSON.stringify(newlist) + "\n\n");

      }
    });
  };
  setInterval(updateConections, 1000);
});
