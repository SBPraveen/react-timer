import './App.css';
import React, { useState, useRef } from 'react';
import Timer from './Timer';



function App() {
  const [start, setStart] = useState(false)
  const parentRenderCount = useRef(0)

  parentRenderCount.current++
  


  return (
    <div className="App">
      <Timer start={start} />
      <button onClick={() => setStart(true)}>Start</button>
      <button onClick={() => setStart(false)}>Stop</button>
      <button onClick={() => setStart("reset")}>Reset</button>
      <p>No of times parent component rendered: {parentRenderCount.current}</p>
    </div>
  );
}

export default App;
