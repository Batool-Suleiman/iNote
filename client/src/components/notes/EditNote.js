import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from './Nav';

export default function EditNote({setIsLoggedIn}) {
    const params = useParams();
    const { id } = params;

    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    });

    const history = useNavigate();

    useEffect(() => {
        const getNote = async () => {
            const token = localStorage.getItem('tokenStore');

            if(id) {
                const res = await axios.get(`/api/notes/${id}`, {
                    headers: {Authorization: token}
                });

                //console.log(res);

                setNote({
                    title: res.data.note.title,
                    content: res.data.note.content,
                    date: new Date(res.data.note.date).toLocaleDateString(),
                    id: res.data.note._id
                });
            }
        }

        getNote();
    }, [id]);

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setNote({...note, [name]: value});
    }

    const editNote = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('tokenStore');

            if(token) {
                const {title, content, date, id} = note;
                const newNote = {
                    title,
                    content,
                    date
                }

                await axios.put(`/api/notes/${id}`, newNote, {
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
                    <h2>Edit note</h2>

                    <form onSubmit={editNote} autoComplete='off' >
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
