import axios from 'axios';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

const ResetPassword = () => {
  const { token } = useParams(); // Extrayez le jeton de l'URL
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  // console.log('le log de token', token );

  const handleResetPassword = () => {
    // Envoyez une requête au backend pour mettre à jour le mot de passe
    axios.post('https://todo-check-api.onrender.com/api/user/reset-password', {
        resetToken: token,
        newPassword: newPassword,
    })
    .then((response) => {
      //   console.log(newPassword);
      console.log('Mot de passe réinitialisé avec succès', response.data);
      alert('Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.');
      // objet history pour effectuer la redirection
      navigate('/');
    })
    .catch((error) => {
        // console.log(newPassword);
      console.error('Erreur lors de la réinitialisation du mot de passe', error);
      // Gérez l'erreur de réinitialisation du mot de passe ici
    });
  };

  return (
    <div className="mot-de-passe-oublie">
        <Header/>
      <h1>Réinitialisation du mot de passe</h1>
      <p>Saisissez votre nouveau mot de passe :</p>
      <form >
        <div className="form-group">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button onClick={handleResetPassword}>Réinitialiser le mot de passe</button>
        
      </form>
    </div>
  );
}

export default ResetPassword;