import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';
import './App.css';

function App() {
  const [equalPressed, setEqualPressed] = useState( false);
  const [display, setDisplay] = useState("0");
  const [answer, setAnswer] = useState("");
  const buttonContents = ["7", "8", "9","(", ")", "sqrt", "4", "5", "6", "*", "/", "%", "1", "2", "3", "+", "-", ".", "0", "=","C","Ans"];
  


  useEffect(() => {
    const handleKeypress = (event) => {
      for(let i = 0; i < buttonContents.length; i++){
        if (event.key === buttonContents[i]) 
          sumFunc(event.key);
      }
    }

    document.addEventListener("keypress", handleKeypress);

    return () =>{
      document.removeEventListener("keypress", handleKeypress);
    }
  })
  

  const sumFunc = (char) => {
    
    if(char === "C"){
      setDisplay("0");
    } else if (char === "Ans"){
      setDisplay(answer);
      setEqualPressed(false);
    }else if (display === "" || equalPressed === true || display === "0"){
      setDisplay(char);
      setEqualPressed(false);
    }else if (char !== "=" && char !== "C" && char !== "Ans"){
      setDisplay(display + char);
    }else if(char === "="){
      setEqualPressed(true);
      try {
        setAnswer(evaluate(display));
        setDisplay(evaluate(display));
      }
      catch(err){
        setDisplay("Incorrect syntax, please try again.")
      }
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
      <button className={props.char === "C" ? "C-button buttons" : props.char === "sqrt" ? "sqrt-button buttons" : props.char === "0" ? "zero-button buttons" : props.char === "Ans" ? "sqrt-button buttons" : "buttons"} onClick={props.click}>{props.char}</button>
    </div>
  )
}



export default App;
