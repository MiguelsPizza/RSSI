import React from "react";
import SideBarItem from "./SideBarItem.jsx";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function SideBar({ networks, ToggleAutoFetch, autoFetch, updateNetworksData }) {
  let counter = 0;
  // ${getBackgroundColor(network.quality)}
  const StyledDiv = styled.div`
    &&& {
      max-height: 600px; /* or any value */
      overflow-y: auto;
    }
  `;
  const Styledh3 = styled.h3`
  &&& {
    color: grey;
    font-size: 20px;
  }
`;
  return (
    <Container>
      <Navbar bg="dark" variant="dark">


        <Styledh3>AVAILBLE NETWORKS</Styledh3>

          <Button onClick={() => updateNetworksData(null)}> Update</Button>

          <Button onClick={() => ToggleAutoFetch(!autoFetch)}>
            {autoFetch ? "Turn off Auto Fetch" : "Turn on Auto Fetch"}
          </Button>
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
