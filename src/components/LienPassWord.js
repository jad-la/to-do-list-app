import axios from 'axios';
import React, { useState } from 'react';
import Header from './Header';

const LienPassWord = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();

        axios
        .post('http://localhost:4000/api/user/reset-password-request', { email })
        .then((response) => {
            setMessage('Un e-mail de réinitialisation de mot de passe a été envoyé.');
        })
        .catch((error) => {
            setMessage('Adresse e-mail non trouvée. Veuillez vérifier votre e-mail.');
            console.error('Erreur lors de la réinitialisation du mot de passe :', error);
        });
    };

  return (
    <div className="mot-de-passe-oublie">
      <Header/>
      <h1>Mot de passe oublié</h1>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="email">E-mail :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
      <p>{message}</p>
    </div>
  );
};


export default LienPassWord;