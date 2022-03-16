import React, { useState } from "react";
import SideBarItem from "./SideBarItem.jsx";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function SideBar({ networks, ToggleAutoFetch, autoFetch, updateNetworksData }) {
  const [rememberAuto, setRemeberAuto] = useState(null);
  let counter = 0;
  // ${getBackgroundColor(network.quality)}
  const StyledDiv = styled.div`
    &&& {
      max-height: 1000px; /* or any value */
      overflow-y: auto;
    }
  `;
  const Styledh3 = styled.h3`
    &&& {
      color: grey;
      font-size: 20px;
    }
  `;
  const decideToggleFetch = () => {
    if (rememberAuto) {
      ToggleAutoFetch(true);
    }
  };
  //onMouseLeave={() => decideToggleFetch}
  return (
    <Container

      style={{width: "100%"}}
    >
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Styledh3>AVAILBLE NETWORKS</Styledh3>
          </Navbar.Brand>
          <Navbar.Text className="justify-content-end">
            <Row>
              <Col md="auto">
                <Button onClick={() => updateNetworksData(null)}>
                  {networks.length > 0 ? "Refresh" : "Loading..."}
                </Button>
              </Col>
              <Col >
                <Button onClick={() => ToggleAutoFetch(!autoFetch)}>
                  {autoFetch ? "Turn off Auto Fetch" : "Turn on Auto Fetch"}
                </Button>
              </Col>
            </Row>
          </Navbar.Text>
        </Container>
      </Navbar>
      <StyledDiv>
        <Accordion>
          {networks.map((network) => {
            return <SideBarItem network={network} eventKey={counter++} />;
          })}
        </Accordion>
      </StyledDiv>
    </Container>
  );
}

export default SideBar;
