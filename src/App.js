import './App.css';
import { useState } from "react";

function App() {
  const [allNotes, setAllNotes] = useState([])
  const [inputState, setInputState] = useState("")
  const [textState, setTextState] = useState("")
  const [dict, setDict] = useState({})
  for(var element in Object.keys(localStorage)){
    const a = localStorage.key(element)
    const b = localStorage[a]
    dict[a] = b
  }
  

  const handleAdd = e => {
    e.preventDefault()

    if (inputState !== ""){
    setAllNotes([
      ...allNotes,
      inputState
    ])
    const x = inputState
    const y = textState
    setInputState("")
    setTextState("")
    dict[x] = y
    Object.keys(dict).forEach(element => {
      localStorage.setItem(element, dict[element])
    });
  }else{
    alert("Name can't be empty")
  }
  }

  const showNote = (i) => (e) => {
    e.preventDefault()
    setTextState(dict[e.target.innerText])
    setInputState(e.target.innerText)
    setAllNotes(a => 
      a.filter((m, n) => i !== n)
    )
  }

  const deleteNote = (note) => (e) => {
    setAllNotes(a => 
      a.filter((m, n) => note !== m)
    )
    Object.keys(dict).map((j, k) => {if(note === j){ delete dict[note] }} )
    localStorage.removeItem(note)
  }


  const onTextChange= e => {
    e.preventDefault()
    setTextState(e.target.value)
    dict[inputState] = textState
    Object.keys(dict).forEach(element => {
      localStorage.setItem(element, dict[element])})
  }

  const onInputChange= e => {
    e.preventDefault()
    setInputState(e.target.value)
    const q = inputState
    setTextState(dict[q])
    Object.keys(dict).forEach(element => {
      localStorage.setItem(element, dict[element])})
  }
    
  
  

  return (
    <div className="App">
      <div className="container">
        <div className="left">
        <h1>My Notes</h1>
          <div className="leftHeader">
          
          <input
          type="text"
          placeholder="New note"
          value={inputState}
          onChange={onInputChange}
        />
          <button className="save" onClick={handleAdd}>SAVE</button>
          
          </div>
          <hr></hr>
          <ul>
        {Object.keys(dict).map((note, i) => 
          <li key={i} value={note}>
            <div className="li-container">
            <div onClick={showNote(i)}>
            {note}
            </div>
            <div>
            <button onClick={deleteNote(note)}>DELETE</button>
            </div>
            </div>
            <hr/>
          </li>
        )}
      </ul>
        </div>
        <div className="right">
          <textarea
            className="text"
            placeholder="note"
            value={textState}
            onChange={onTextChange}
          >
          </textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
