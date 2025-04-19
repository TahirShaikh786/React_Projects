import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [timeleft, setTimeLeft] = useState(60);
  const timeref = useRef(null);

  const handleTimer = (action) => {
    if (action === "start") {

      // if (timeref.current !== null || timeleft === 0) return;

      timeleft.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1){
            clearInterval(timeref.current);
            timeref.current = null;
            return 0;
          }
          return prevTime - 1;
        })
      }, 1000);
    } else if (action === "reset") {
      if(timeref.current !== null){
        clearInterval(timeref.current);
        timeref.current = null;
      }
      setTimeLeft(60);
    }
  }

  return (
    <>
      {timeleft !== 0 && <h1>timeleft {timeleft}s</h1>}
      <div className="btns">
        <button onClick={() => handleTimer("start")}>Start</button>
        <button onClick={() => handleTimer("reset")}>Reset</button>
      </div>

      {timeleft === 0 && <h2>Your time is Over</h2>}
    </>
  )
}

export default App
