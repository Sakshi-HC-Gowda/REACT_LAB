import React, { useState } from "react";
import "./index.css";
import sampleimage from "./assets/sampleimage.jpg";

const ProfileCard = ({ name, bio, initialBg }) => {
  const [bg, setBg] = useState(initialBg);

  return (
    <div
      className="card"
      style={{ background: bg }}
      onMouseEnter={() =>
        setBg("linear-gradient(135deg, #FFD700, #FFA07A)")
      }
      onMouseLeave={() => setBg(initialBg)}
    >
      <img src={sampleimage} alt={name} className="pic" />
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
};

export default function App() {
  return (
    <div className="container">
      <ProfileCard
        name="Steve Jobs"
        bio="Co-founder of Apple Inc."
        initialBg="linear-gradient(135deg, #ADD8E6, #E6E6FA)"
      />
    </div>
  );
}
