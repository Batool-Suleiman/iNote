import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';
import Header from './Nav';

export default function Home({ setIsLoggedIn }) {
    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('');

    const getNotes = async (token) => { 
        const res = await axios.get('api/notes', {
            headers: { Authorization: token}
        });

        setNotes(res.data.data.notes);
    }

    useEffect(() => {
        const token = localStorage.getItem('tokenStore');
        setToken(token);

        if(token) {
            getNotes(token);
        }
    }, []);

    const deleteNote = async (id) => {
        try {
            if(token) {
                await axios.delete(`api/notes/${id}`, {
                    headers: { Authorization: token}
                });

                getNotes(token);
            }
        } catch (error) {
            window.location.href='/';
        }
    }

    return (
        <>
            <div className='notes-page'>
                <Header setIsLoggedIn={setIsLoggedIn} />
                
                <div className='note-wrapper'>
                    {
                        notes.map((note) => (
                            <div className='card' key={note._id}>
                                <h4 title={note.title}>
                                    {note.title}
                                </h4>
                                
                                <div className='text-wrapper'>
                                    <p>
                                        {note.content}
                                    </p>
                                </div>

                                <p className='date'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg>
                                    
                                    {format(note.date) === 'just now' ? 'No Date' : format(note.date)}
                                </p>

                                <div className='card-footer'>
                                    <div title='you' className="youTooltip usernameText">{note.username}</div>
                                    <div>
                                        <Link className="editTooltip edit" to={`edit/${note._id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                                        </Link> 

                                        <button className='close' onClick={() => deleteNote(note._id)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    
                        <Link to='/create' className='card end'>
                            <p className='textEnd'>Add new note</p>
                        </Link>
                    </div>
            </div>
        </>
    );
}