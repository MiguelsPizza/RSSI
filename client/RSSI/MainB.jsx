import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Animation from "./Animation.jsx"

const MainButton = () => {
  const [toggle, changeToggle] = useState(false);
  const [rssi, changeRssi] = useState(null);
  const [channel, changechannel] = useState(null);
  const [frequency, changefrequency] = useState(null);
  const [security, changesecurity] = useState(null);
  const [ssid, changessid] = useState(null);

  const upDateWIFIdata = (data) => {
    console.log(data[0]);
    changeRssi(data[0].quality);
    changechannel(data[0].channel);
    changefrequency(data[0].frequency);
    changesecurity(data[0].security);
    changessid(data[0].ssid);
  };

  useEffect(() => {
    if (toggle) {
      let eventSource = new EventSource("http://localhost:3000/rssi");
      eventSource.onmessage = (e) => upDateWIFIdata(JSON.parse(e.data));
      // eventSource.onmessage =console.log  // console.log(eventSource)
      // eventSource.onmessage = (e) => {
      //   // console.log("e", e);
      //   // changeRssi(JSON.parse(e.data));
      //   // changeToggle(true);
      // };

      eventSource.onerror = () => {
        // error log here

        eventSource.close();
      };
      return () => {
        eventSource.close();
      };
    } else {
      fetch("/intialLoadrssi")
        .then((response) => response.json())
        .then((dataList) => upDateWIFIdata(dataList));
    }
  }, [toggle]);

  const getBackgroundColor = () => {
    let color;
    let r = 255;
    let g = 0;
    let b = 0;
    let value = rssi * 3;
    if (value === NaN) {
      color = "white";
    } else if (value >= 1 && value < 255) {
      color = `rgb(255, ${value}, 0`;
    } else if (value >= 255 && value < 510) {
      color = `rgb(${255 - value + 255}, 255, 0`;
    } else if (value >= 510) {
      color = `rgb(0, 255, ${value - 510}`;
    }
    return color;
  };

  return (
    <Card
      className="text-center h-100"
      style={{ heigth: "500px", width: "100%" }}
    >
      <Card.Header>
        Conection: {security ? "Secure" : "Unprotected"}
      </Card.Header>
      <Card.Body style={{ background: getBackgroundColor() }}>
        <Card.Title>Currently Conected to: {ssid}</Card.Title>
        <Card.Text>{rssi}</Card.Text>
          <Animation toggle={toggle} changeToggle={changeToggle}/>
      </Card.Body>
    </Card>
  );
};

export default MainButton;


