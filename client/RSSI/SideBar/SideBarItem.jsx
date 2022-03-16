import React from "react";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";


function SideBarItem({ network, eventKey }) {
  const getBackgroundColor = (value) => {
    let color;
    if (value === 0) {
      color = "";
    } else if (value >= 1 && value < 80) {
      color = "red";
    } else if (value >= 80 && value < 90) {
      color = "orange";
    } else if (value >= 90 && value < 100) {
      color = "yellow";
    } else if (value >= 100) {
      color = "green";
    }
    return color;
  };


  return (
    <Accordion.Item eventKey={eventKey} style={{ backgroundColor: getBackgroundColor(network.quality)}}>
      <Accordion.Header >{network.ssid}</Accordion.Header>
      <Accordion.Body>
        <ListGroup horizontal>
          <ListGroup.Item>Channel:  {network.channel}</ListGroup.Item>
          <ListGroup.Item>
            Frequency:  {network.frequency/1000} GHz
          </ListGroup.Item>
          <ListGroup.Item>Quality:  {network.quality}%</ListGroup.Item>
          <ListGroup.Item>
            RSSI:  {network.signal_level}  dbm
          </ListGroup.Item>
          <ListGroup.Item>
            Securtiy:  {network.security}
          </ListGroup.Item>
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default SideBarItem;
