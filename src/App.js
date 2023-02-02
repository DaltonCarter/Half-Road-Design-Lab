import {useState, useContext} from 'react'
import { Routes, Route} from 'react-router-dom'
import './App.css';
import TitlePage from './components/TitlePage/TitlePage';
import GameScreen from './components/GameScreen/GameScreen';
import About from './components/About/About';
import BattleScene from './components/BattleScene/BattleScene';
import AuthContext from "./components/Store/authContext"
import Auth from './components/GameStart/Auth';

function App() {
  const [initialize, setInitialize] = useState(true)

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<TitlePage />}/>
        <Route path='/Auth' element={<Auth />}/>
        <Route path='/Game' element={<GameScreen />}/>
        <Route path='/About' element={<About />}/>
        <Route path='/Battle' element={<BattleScene initialize={initialize} setInitialize={setInitialize}/>}/>      
      </Routes>
    </div>
  );
}

export default App;
