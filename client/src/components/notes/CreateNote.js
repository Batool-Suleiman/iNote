import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Nav';

export default function CreateNote({setIsLoggedIn}) {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: ''
    });

    const history = useNavigate();

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setNote({...note, [name]: value});
    }

    const createNote = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('tokenStore');

            if(token) {
                const {title, content, date} = note;

                const newNote = {
                    title,
                    content,
                    date
                }

                await axios.post('/api/notes', newNote, {
                    headers: {Authorization: token}
                });

                return history.push('/');
            }
        } catch (error) {
            window.location.href = '/';
        }
    }

    return (
        <>
            <div className='notes-page'>
            <Header setIsLoggedIn={setIsLoggedIn} />
                <div className='create-note'>
                    <h2>Add a note</h2>

                    <form onSubmit={createNote} autoComplete='off' >
                        <div className='row'>
                            <label htmlFor='title'>Title</label>
                            <input type='text' value={note.title} id='title' name='title' required onChange={onChangeInput} ></input>
                        </div>

                        <div className='row'>
                            <label htmlFor='content'>Description (optional)</label>
                            <textarea type='text' value={note.content} id='content' name='content' required rows='10' onChange={onChangeInput} ></textarea>
                        </div>

                        <div className='row'>
                            <label htmlFor='date'>Date: {note.date}</label>
                            <input type='date' value={note.date} id='date' name='date' onChange={onChangeInput}></input>
                        </div>

                        <button type='submit'>Save</button>
                    </form>
                </div>
            </div> 
        </>
    );
}
