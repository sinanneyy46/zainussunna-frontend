import React, { useEffect, useState } from "react";
import "../styles/Intro.scss";

function Intro({ onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDone) onDone();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onDone]);

  if (!visible) {
    return null;
  }

  return (
    <div className="intro-overlay">
      <img
        src={require("../assets/images/geomtric.png")}
        className="geo-shape geo-1"
        alt=""
      />
      <img
        src={require("../assets/images/geomtric.png")}
        className="geo-shape geo-2"
        alt=""
      />
      <img
        src={require("../assets/images/geomtric.png")}
        className="geo-shape geo-3"
        alt=""
      />

      <div className="intro-content">
        <h1 className="intro-title">Zainussunna</h1>
        <p className="intro-subtitle">Academy Of Integrated Studies</p>
      </div>
    </div>
  );
}

export default Intro;
