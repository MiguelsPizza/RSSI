const express = require("express");
const app = express();
const path = require("path");
const wifi = require("node-wifi");
const _ = require('lodash');
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
  console.log("req.url", req.url);
  if (req.url === "/rssi") {
    res.setHeader("Content-Type", "text/event-stream");
    // res.write("data: " + "test!\n\n")
    wifi.init({
      iface: null, // network interface, choose a random wifi interface if set to null
    });
    const sendRssi = () => {
      wifi.getCurrentConnections((error, currentConnections) => {
        if (error) {
          console.log(error);
        } else {
          res.write("data: " + JSON.stringify(currentConnections) + "\n\n");
        }
      });
    };
    setInterval(sendRssi, 1000);
  }
});

app.get("/currentConections", (req, res) => {
  wifi.init({
    iface: null, // network interface, choose a random wifi interface if set to null
  });
    wifi.scan((error, networks) => {
      if (error) {
        console.log(error);
      } else {
        console.log(networks.length);
        const newlist = networks.filter((network) =>{
          return (network.quality > 90)

        }).sort((a, b) =>{
          return b.quality - a.quality
        })
        console.log(newlist.length);
        res.send(JSON.stringify(newlist));
        /*
          networks = [
              {
                ssid: '...',
                bssid: '...',
                mac: '...', // equals to bssid (for retrocompatibility)
                channel: <number>,
                frequency: <number>, // in MHz
                signal_level: <number>, // in dB
                quality: <number>, // same as signal level but in %
                security: 'WPA WPA2' // format depending on locale for open networks in Windows
                security_flags: '...' // encryption protocols (format currently depending of the OS)
                mode: '...' // network mode like Infra (format currently depending of the OS)
              },
              ...
          ];
          */
      }
    });
});




app.get("/auto", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  // res.write("data: " + "test!\n\n")
  wifi.init({
    iface: null, // network interface, choose a random wifi interface if set to null
  });

  // Scan networks
  const updateConections = () => {
    wifi.scan((error, networks) => {
      if (error) {
        console.log(error);
      } else {
        console.log(networks.length);
        const newlist = networks.filter((network) =>{
          return (network.signal_level > -70)

        }).sort((a, b) =>{
          return b.quality - a.quality
        })
        console.log(newlist.length);
        res.write("data: " + JSON.stringify(newlist) + "\n\n");
        /*
          networks = [
              {
                ssid: '...',
                bssid: '...',
                mac: '...', // equals to bssid (for retrocompatibility)
                channel: <number>,
                frequency: <number>, // in MHz
                signal_level: <number>, // in dB
                quality: <number>, // same as signal level but in %
                security: 'WPA WPA2' // format depending on locale for open networks in Windows
                security_flags: '...' // encryption protocols (format currently depending of the OS)
                mode: '...' // network mode like Infra (format currently depending of the OS)
              },
              ...
          ];
          */
      }
    });
  };
  setInterval(updateConections, 5000);
});


