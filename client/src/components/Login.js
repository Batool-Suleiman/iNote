import React, {useEffect, useState} from 'react';
import '../styles/styleLogin.css';
import phonePhoto from './images/note-phone.svg';
import teamPhoto from './images/note-team.svg';
import Notes from './Notes';
import axios from 'axios';

export default function Login() {
    <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
    
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
        const sign_up_btn = document.querySelector('#sign-up-btn');
        const sign_in_btn = document.querySelector('#sign-in-btn');
        const container = document.querySelector('.container');
    
        const signUpClickHandler = () => {
          container.classList.add('sign-up-mode');
        };
    
        const signInClickHandler = () => {
          container.classList.remove('sign-up-mode');
        };
    
        sign_up_btn.addEventListener('click', signUpClickHandler);
        sign_in_btn.addEventListener('click', signInClickHandler);
    
        return () => {
          // Cleanup by removing the event listeners when the component unmounts
          sign_up_btn.removeEventListener('click', signUpClickHandler);
          sign_in_btn.removeEventListener('click', signInClickHandler);
        };
      }, []);

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [err, setErr] = useState('');

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
        setErr('');
    }

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/register', {
                username: user.username,
                email: user.email,
                password: user.password
            });

            setUser({username: '', email: '', password: ''});
            setErr(res.data.message);
        } catch (error) {
            error.response.data.message && setErr(error.response.data.message);
        }
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/login', {
                email: user.email,
                password: user.password
            });

            setUser({ username: '', email: '', password: '' });
            localStorage.setItem('tokenStore', res.data.data.token);            
            setIsLoggedIn(true);
            window.location.href='/';
            setErr('');
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErr(error.response.data.message);
            } else {
                setErr('');
            }
        }
    }

    const clearErr = () => {
        setErr('');
    }

  return (
    <section>
         { isLoggedIn ? <Notes setIsLoggedIn={setIsLoggedIn}/> : 
         (<div className="container">
                    <div className="forms-container">
                        <div className="signin-signup">
                            <form onSubmit={loginSubmit} action="" className="sign-in-form">
                                <h2 className="title">
                                    Sign in
                                </h2>

                                <div className="input-field">
                                    <i>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg</style><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                                    </i>
                                    
                                    <input type="email" name = "email" placeholder="Email" required value={user.email} onChange={onChangeInput}></input>
                                </div>

                                <div className="input-field">
                                    <i><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg</style>
                                        <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>   
                                    </i>
                                    <input type="password" name = "password" placeholder="Password" required value={user.password} autoComplete='true' onChange={onChangeInput}></input>
                                </div>

                                <input type="submit" value="Login" className="btn solid"></input>

                                <h3>{err}</h3>
                            </form>

                            <form  onSubmit={registerSubmit} action="" className="sign-up-form">
                                <h2 className="title">
                                    Sign up
                                </h2>

                                <div className="input-field">
                                    <i>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg</style><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                                    </i>
                                    
                                    <input type="text" name="username" placeholder="Username" required value={user.username} onChange={onChangeInput}></input>
                                </div>

                                <div className="input-field">
                                    <i>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg</style><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                                    </i>
                                    
                                    <input type="email" name = "email" placeholder="Email" required value={user.email} onChange={onChangeInput}></input>
                                </div>

                                <div className="input-field">
                                    <i><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg</style>
                                        <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>   
                                    </i>
                                    <input type="password" name = "password" placeholder="Password" required value={user.password} autoComplete='true' onChange={onChangeInput}></input>
                                </div>

                                <input type="submit" value="Sign up" className="btn solid"></input>

                                <h3>{err}</h3>
                            </form>
                        </div>
                    </div>

                    <div className="panels-container">
                        <div className="panel left-panel">
                            <div className="content">
                                <h3>New here?</h3>
                                <p>Click sign up to register now!</p>
                                <button onClick={clearErr} className="btn transparent" id="sign-up-btn">
                                    Sign up
                                </button>
                            </div>

                            <img src={teamPhoto} className="image" alt="" />
                        </div>

                        <div className="panel right-panel">
                            <div className="content">
                                <h3>Already registered?</h3>
                                <p>Click sign in to continue!</p>
                                <button onClick={clearErr} className="btn transparent" id="sign-in-btn">
                                    Sign in
                                </button>
                            </div>

                            <img src={phonePhoto} className="image" alt="" />
                        </div>
                    </div>
            </div>)}
            
    </section>
  );
}