import React from 'react';
import Header from './notes/Nav';
import Home from './notes/Home';
import CreateNote from './notes/CreateNote';
import EditNote from './notes/EditNote';
import { Route, Routes } from 'react-router-dom';

export default function Notes({ setIsLoggedIn }) {
  return (
      <div className='notes-page'>
        <Header setIsLoggedIn={setIsLoggedIn} />
          
            <section>
              <Routes>
                <Route path='/' element={<Home />} exact/>
                <Route path='/create' element={<CreateNote />} exact/>
                <Route path='/edit/:id' element={<EditNote />} exact/>
              </Routes>
            </section>
      </div>
  );
}