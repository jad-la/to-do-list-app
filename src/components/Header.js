import React from 'react';

const Header = () => {
    return (
        <nav>
                <img 
                    src="/images/list_5649209.png" 
                    alt="todo list logo"
                />
                <button className='btnLogin'>  <a  className="lien-nav" href="/#signup-login">Connexion </a></button>
        </nav>
    );
};

export default Header;