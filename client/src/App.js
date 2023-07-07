import './App.css';
import ChatState from './context/chat/ChatState';
import Auth from './pages/auth/Auth';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/home/Home';
function App() {
  return (
    <>
    <ChatState>
    <Routes>
      <Route path='/chat' element={<Home />} />
      <Route path='/' element={<Auth />} />
    </Routes>
      </ChatState>
    </>
  );
}

export default App;
