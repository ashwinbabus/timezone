import React, { useEffect, useState, useRef } from "react";
import "./timezone.styles.scss";
import axios from "axios";

function Timezone() {
  const [zoneList, setZoneList] = useState([]);
  const [currentZone, setCurrentZone] = useState("Europe/Andorra");
  const [currentTime, setCurrentTime] = useState("");
  let timer = useRef();

  useEffect(() => {
    const getList = async () => {
      let response = await axios.get(
        "https://api.timezonedb.com/v2.1/list-time-zone?key=XWSLLPX5RMIZ&format=json&zone=Europe/*"
      );
      let zones = response.data.zones;
      setZoneList(zones);
      //   setCurrentZone(zones[0].zoneName);
    };
    getList();
  }, []);

  useEffect(() => {
    setCurrentTime("");
    timer.current = setInterval(() => {
      const getZoneData = async () => {
        let response = await axios.get(
          `https://api.timezonedb.com/v2/get-time-zone?key=XWSLLPX5RMIZ&format=json&by=zone&zone=${currentZone}`
        );
        setCurrentTime(response.data.formatted);
      };
      getZoneData();
    }, 5000);
    return () => {
      clearInterval(timer.current);
    };
  }, [currentZone]);

  const handleZoneChange = (e) => {
    console.log(e.target.value);
    setCurrentZone(e.target.value);
  };

  return (
    <div className="timezone__container">
      <select name="zones" id="" onChange={(e) => handleZoneChange(e)}>
        {zoneList && zoneList.map((zone) => <option>{zone.zoneName}</option>)}
      </select>
      <h1>{currentTime === "" ? "loading ..." : currentTime} </h1>
    </div>
  );
}

export default Timezone;
