
import React from "react";
import styled, { keyframes } from "styled-components";


function Animation({toggle, changeToggle}) {

    //  // 30% { height: 100px; width: 100px; opacity: 1 }
  // 40% { height: 200px; width: 200px; opacity: 0.3; }
  const breatheAnimation = keyframes`
  0% { height: 0px; width: 0px; }

  100% { height: 300px; width: 300px; opacity: 0.0; }
 `;
  const Circle = styled.div`
    height: 100px;
    width: 100px;
    border-style: solid;
    border-width: 5px;
    border-radius: 50%;
    border-color: black;
    animation-name: ${toggle ? breatheAnimation : null};
    animation-duration: 1s;
    animation-iteration-count: infinite;
  `;
  const CircleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 450px;
  `;

  return (
    <CircleContainer>
    <Circle           onClick={() => {
      changeToggle(!toggle);
    }}/>
  </CircleContainer>
  )
}

export default React.memo(Animation);