import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/iNoteLogo.PNG';

export default function Nav({ setIsLoggedIn }) {
    const logoutSubmit = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    }

    return (
        <header>
            <div>
                <Link to='/'><img src={logo} alt='logo' className='logo'/> </Link> 
            </div>
            
            <nav>
                <ul className="navigationNav">
                    <li className="navEl">
                        <Link to='/' className='notesNav'> Home </Link>
                    </li>

                    <li className="navEl">
                        <Link to='/create' className='notesNav'> Add a note </Link>
                    </li>

                    <li className="navEl" onClick={logoutSubmit}>
                        <Link to='/' className='notesNav'> Logout </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
