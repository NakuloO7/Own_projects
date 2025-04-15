import { useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [weight, setWeight] = useState(40);
  const [height, setHeight] = useState(70);

  const onWeightChange = (e)=>{
    setWeight(e.target.value);
    console.log(weight)
  }

  const onHeightChange = (e)=>{
    setHeight(e.target.value)
  }

  const output = useMemo(()=>{
    let calcH = height /100;
    let bmi = weight /(calcH * calcH);
    return (bmi).toFixed(2)
  },[height, weight])

  return (
    <main>
      <h1>BMI Calculator</h1>
      <div className="input-section">
        <p className="slider-output">Weight : {weight} kg</p>
        <input
          type="range"
          className="input-slider"
          step={1}
          min={40}
          max={200}
          onChange={onWeightChange}
        />
        <p className="slider-output">Height : {height} cm</p>
        <input type="range" className="input-slider"
           step={1}
           min={120}
           max={220}
           onChange={onHeightChange}
         />
      </div>
      <div className="output-section">
        <p>Your BMI is </p>
        <p className="">{output}</p>
      </div>
    </main>
  );
}

export default App;
