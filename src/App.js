import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'https://long-tan-monkey-veil.cyclic.app'

function App() {
  const [number,setNumber] = useState(0)
  const [data,setData] = useState([])

  useEffect(()=>{
    axios.get(baseUrl+'/recipe').then((res)=>{
      console.log(res.data.data)
    })
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
