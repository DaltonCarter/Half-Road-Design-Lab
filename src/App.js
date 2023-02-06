import {useState, useContext} from 'react'
import { Routes, Route} from 'react-router-dom'
import './App.css';
import TitlePage from './components/TitlePage/TitlePage';
import GameScreen from './components/GameScreen/GameScreen';
import About from './components/About/About';
import BattleScene from './components/BattleScene/BattleScene';
import Auth from './components/GameStart/Auth';
import GameStart from './components/GameStart/GameStart';
import Introduction from './components/GameStart/Introduction';
import Credits from './components/Credits/Credits';
import LoadGameModal from './components/Modals/LoadGameModal';

function App() {
  const [initialize, setInitialize] = useState(true)

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<TitlePage />}/>
        <Route path='/Auth' element={<Auth />}/>
        <Route path='/Game' element={<GameScreen />}/>
        <Route path='/About' element={<About />}/>
        <Route path='/Start' element={<GameStart />}/>      
        <Route path='/Intro' element={<Introduction />}/>      
        <Route path='/Credits' element={<Credits />}/>  
        <Route path='/Load' element={<LoadGameModal />}/>    
        <Route path='/Battle' element={<BattleScene initialize={initialize} setInitialize={setInitialize}/>}/>      
      </Routes>
    </div>
  );
}

export default App;
