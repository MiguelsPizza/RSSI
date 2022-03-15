import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const MainButton = () => {
  const [toggle, changeToggle] = useState(false);
  const [rssi, changeRssi] = useState(null);

  const upDateWIFIdata = (data) => {
    console.log(data[0]);
    changeRssi(data[0].signal_level);
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
    }
  }, [toggle]);

  return (
    <>
      <Card className="text-center" style={{ heigth: "18rem", color: "green" }}>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>{rssi}</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              changeToggle(!toggle);
            }}
          >
            Go somewhere
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </>
  );
};

export default MainButton;

/* <div
        class="component"
        data-path-start="..."
        data-path-listen="..."
        data-path-player="..."
      >
        <svg class="morpher" width="300" height="500">
          <path class="morph__button" d="..." />
        </svg>

        <button class="button button--start">
          <span class="button__content button__content--start">
            Listen to this song
          </span>
          <span class="button__content button__content--listen">
            <span class="icon icon--microphone"></span>
          </span>
        </button>
      </div> */
