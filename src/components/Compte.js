import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';




const Compte = () => {
  const { id } = useParams();
  const [utilisateur, setUtilisateur] = useState([]);

  useEffect(() => {
    console.log('Le composant Compte est monté.');
    console.log('Valeur de idUser depuis useParams :', id); // Assurez-vous que idUser est correct

    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
      
        const response = await axios.get(`http://localhost:4000/api/user/compte/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Données récupérées depuis l\'API :', response.data);
        setUtilisateur(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur', error);
      }
    };

    fetchUserDetails(); // Appelez la fonction ici

  }, [id]);

  return (
    <div>
      <h1>Mes informations</h1>
      <img width={"100px"} height={'100px'} src={utilisateur.profilePicture} alt={utilisateur.name} />
      <p>nom: {utilisateur.name}</p>
      <p>email: {utilisateur.email}</p>
      <p>Mot de passe: </p>
    </div>
  );
};

export default Compte;