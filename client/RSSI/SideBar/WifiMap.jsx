import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "sk.eyJ1IjoiYWxleG1uYWhhcyIsImEiOiJjbDB1Y3UyNHIwdG92M2JycGpjeDBuN3JrIn0.XV9anygTsg9AscgC0HfJWA"; // Set your mapbox token here

function WifiMap() {
  const [hotSpots, setHotSpots] = useState([]);
  const [viewPort, setViewPort] = useState({
    latitude: 39.155823228525456,
    longitude: -84.42472236058843,
    zoom: 14,
    width: "80vw",
    height: "60vh",
  });

  useEffect(() => {
    const getHotSpots = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "Public Networks"));
      const arr = [];
      console.log("querySnapshot", querySnapshot);
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setHotSpots(arr);
    };
    getHotSpots();
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken="pk.eyJ1IjoiYWxleG1uYWhhcyIsImEiOiJjbDB1NnlodDAwdTdtM2Rxb2U2NGp3ZTd6In0.diIpF1rtD19BvakZeCuBfw"
        style={{ width: 500, height: 300 }}
        mapStyle="mapbox://styles/alexmnahas/cl0ucr9ah000315qddpcj8yvj"
        onViewportChange={(viewPort) => {
          setViewPort(viewPort);
        }}
      >
        {hotSpots.map((hotspot) => {
          console.log(hotspot["Router Location"]._long);
          console.log(hotspot["Router Location"]._lat);
          console.log(hotspot.NetworkName);

          return (
            <Marker
              Key={hotspot.NetworkName}
              latitude={hotspot["Router Location"]._lat}
              longitude={hotspot["Router Location"]._long}
            >
              <div className="marker" onClick={() => alert("You need to go to bed")}>
                <span>
                  <h1>{hotspot.NetworkName}</h1>
                </span>
              </div>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
}

export default WifiMap;
