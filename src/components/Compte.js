import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


const Compte = ({userId, fetchUserDetails, utilisateur}) => {

  const [modeEdition, setModeEdition] = useState(false);
  const [nouvellesDonnees, setNouvellesDonnees] = useState({
    email: '',
    newPassword: '',
    profilePicture: '',
  });
  const [champsModifies, setChampsModifies] = useState({
    email: false,
    newPassword: false,
    profilePicture: false,
  });


  useEffect(() => {
    fetchUserDetails(); 
  }, [fetchUserDetails]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'profilePicture') {
      // Gérez le champ de fichier image
      const imageFile = e.target.files[0];
      setNouvellesDonnees({
        ...nouvellesDonnees,
        profilePicture: imageFile,
      });
    } else {
      // Gérez les autres champs normalement
      setNouvellesDonnees({
        ...nouvellesDonnees,
        [name]: value,
      });
    }
  
    // Marquez le champ comme modifié
    setChampsModifies({
      ...champsModifies,
      [name]: true,
    });
  };

  const toggleEditionMode = () => {
    setModeEdition(!modeEdition);
  };

  const handleModificationSubmit = async (e) => {
    e.preventDefault();

    // Vérifiez au moins un champ modifié
    if (
      !champsModifies.email &&
      !champsModifies.newPassword &&
      !champsModifies.profilePicture
    ) {
      alert('Vous devez modifier au moins un champ.');
      return;
    }

    // Le reste du code pour envoyer la requête de mise à jour
    const token = localStorage.getItem('token');
    const formData = new FormData();

    if (champsModifies.email) {
      formData.append('email', nouvellesDonnees.email);
    }

    if (champsModifies.oldPassword) {
      formData.append('oldPassword', nouvellesDonnees.oldPassword);
    } 

    if (champsModifies.newPassword) {
      formData.append('newPassword', nouvellesDonnees.newPassword);
    }

    if (champsModifies.profilePicture) {
      formData.append('profilePicture', nouvellesDonnees.profilePicture);
    }

    try {
      await axios.put(`https://todo-check-api.onrender.com/api/user/compte/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Modifications enregistrées avec succès.');
      fetchUserDetails()
      setModeEdition(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil', error);
    }
  };


  return (
    <div className='compte-utilisateur'>
      
      {modeEdition ? (
        <form className='form-user-update' onSubmit={handleModificationSubmit}>
          <h1>Modifier information</h1>
          <p>Veuillez noter que pour enregistrer les modifications, au moins un champ doit être rempli. Assurez-vous de saisir au moins une information mise à jour (par exemple: adresse e-mail).</p>
          <div className='infoUser'>
              <input
                placeholder='Nouvelle adresse mail'
                type='text'
                name='email'
                value={nouvellesDonnees.email}
                onChange={handleInputChange}
              />
              <input
                type='password'
                name='oldPassword' // Champ de l'ancien mot de passe
                placeholder='Ancien mot de passe'
                value={nouvellesDonnees.oldPassword}
                onChange={handleInputChange}
              />
              <input
                type='password'
                name='newPassword' // Champ du nouveau mot de passe
                placeholder='Nouveau mot de passe'
                value={nouvellesDonnees.newPassword}
                onChange={handleInputChange}
              />
              <input type="file" enctype="multipart/form-data" name="profilePicture" accept="image/*"  onChange={handleInputChange}/>
              <button type='submit'>Enregistrer</button>
          </div>
        </form>
      ) : (
        <div className='compte'>
          <h1>Mes informations</h1>
          <div className='infoUser'>
            <img width={"100px"} height={'100px'} src={utilisateur.profilePicture} alt={utilisateur.name} />
            <p>
              <span>Nom:</span> 
              {utilisateur.name}
            </p>
            <p>
              <span>Email:</span>
              {utilisateur.email}
            </p>
            <p>
              <span>Mot de passe:</span>
              ********* 
            </p>
            <button className='btn-modif' onClick={toggleEditionMode}>Modifier</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compte;