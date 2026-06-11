import Login from './login'
import Register from './register';
import Dashboard from './dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const token=localStorage.getItem("token");

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={token?<Navigate to='/dashboard'/>:<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
