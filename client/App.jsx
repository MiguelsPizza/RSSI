import React, { useState, useEffect } from "react";
import MainB from "./RSSI/MainB.jsx";
import TopBar from "./RSSI/TopBar.jsx";
import SideBar from "./RSSI/SideBar/SideBar.jsx";

const App = () => {
  const [rssi, changeRssi] = useState(null);
  const [toggle, changeToggle] = useState(false);


  const upDateWIFIdata = (data) =>{
    console.log(data[0])
    changeRssi(data[0].signal_level)
  }
  useEffect(() => {
    if (toggle) {
      let eventSource = new EventSource("http://localhost:3000/rssi");
      eventSource.onmessage = e => upDateWIFIdata(JSON.parse(e.data));
      // eventSource.onmessage =console.log  // console.log(eventSource)
      // eventSource.onmessage = (e) => {
      //   // console.log("e", e);
      //   // changeRssi(JSON.parse(e.data));
      //   // changeToggle(true);
      // };

      eventSource.onerror = () => {
        // error log here

        eventSource.close();
      }
      return () => {
        eventSource.close();
      };

    }
  }, [toggle]);

  return (
    <div className="test">
      <TopBar/>
      <SideBar/>
      <button
        onClick={() => {
          changeToggle(!toggle);
        }}
      >
        get data
      </button>
      {rssi}

      <MainB />

    </div>
  );
};

export default App;
