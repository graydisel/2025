import { useState } from 'react'
import './App.css'

function App() {
    const [inputText, setInputText] = useState("");
    const [displayText, setDisplayText] = useState("");

    const handleClick = () => {
        setDisplayText(inputText);
    };

    return (
        <div>
            <h1>React practice</h1>
            <label>
                Please, enter text here<br/>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            </label>
            <button onClick={handleClick}>Enter</button>
            <p>You entered: {displayText}</p>
        </div>
    );
}
export default App
