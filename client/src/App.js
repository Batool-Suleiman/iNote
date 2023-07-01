import HomePage from './components/HomePage';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CreateNote from './components/notes/CreateNote';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './components/notes/Home';
import EditNote from './components/notes/EditNote';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
        const token = localStorage.getItem('tokenStore');
  
        if(token) {
          const verified = await axios.get('/users/verify', {
            headers: { Authorization: token }
          });
  
          //console.log(verified);
          setIsLoggedIn(verified.data);
  
          if(verified.data === false) {
            return localStorage.clear();
          }
        } else {
          setIsLoggedIn(false);
        }
    }
  
    checkLogin();
  });

  return (
    <div>
    <Routes>
      <Route>
        <Route index element={ isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <HomePage />}/>
        <Route path="login" element={<Login />}/>
        <Route path="create" element={<CreateNote setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path="edit/:id" element={<EditNote setIsLoggedIn={setIsLoggedIn} />}/>
      </Route>
    </Routes>
    </div>
  );
}

export default App;
