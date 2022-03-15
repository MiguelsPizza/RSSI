import React, { useState, useEffect } from "react";
import MainB from "./RSSI/MainB.jsx";
import TopBar from "./RSSI/TopBar.jsx";
import SideBar from "./RSSI/SideBar/SideBar.jsx";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MainPage = () => {
  const [networks, setNetworks] = useState([]);
  const [autoFetch, ToggleAutoFetch] = useState(false);

  const updateNetworksData = (data) => {
    if (data) {
      setNetworks(data);
    } else {
      fetch("/currentConections")
        .then((response) => response.json())
        .then((dataList) => setNetworks(dataList));
    }
  };
  useEffect(() => {
    console.log("autoFetch", autoFetch);
    if (autoFetch) {
      let eventSource = new EventSource("http://localhost:3000/auto");
      eventSource.onmessage = (e) => updateNetworksData(JSON.parse(e.data));
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
      console.log("here");
      updateNetworksData(null);
    }
  }, [autoFetch]);

  return (
    <Container className="bg-light" style={{ height: "1000px" }}>
      <Row>
        <TopBar />
      </Row>
      <Row>
        <MainB />
      </Row>
      <Row>
        <SideBar
          networks={networks}
          ToggleAutoFetch={ToggleAutoFetch}
          autoFetch={autoFetch}
          updateNetworksData={updateNetworksData}
        />
      </Row>
    </Container>
  );
};
//md={{ span: 3, offset: 3 }}

export default MainPage;
