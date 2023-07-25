import { useState } from 'react';
import { evaluate } from 'mathjs';
import './App.css';

function App() {
  const [display, setDisplay] = useState()
  const buttonContents = [ "1", "2", "3", " + ", "4", "5", "6", " - ", "7", "8", "9", " * ", "C", "0", "=", " / "]
  const sumFunc = (char) => {
    if (display === undefined){
      setDisplay(char);
    }else if (char !== "=" && char !== "C"){
      setDisplay(display + char);
    }else if(char === "="){
      setDisplay(evaluate(display));
    } else {
      setDisplay("")
    }
  }
  return (
    <div className='calcWrap'>
      <div className='textWrap'>
        <h1 className='text'>{display}</h1>
      </div>
      <div className='buttonWrap'>
        {buttonContents.map((char, index) => {
          return (
            <Buttons key={index} click={() => sumFunc(char)} char={char}/>
          )
        })}
      </div>
    </div>
  );
}

const Buttons = (props) => {
  return (
    <div>
      <button className='buttons' onClick={props.click}>{props.char}</button>
    </div>
  )
}



export default App;
