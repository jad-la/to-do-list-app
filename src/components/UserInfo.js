// import axios from 'axios';
// import React from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useParams } from 'react-router-dom';

// const UserInfo = () => {
//   const { idUser } = useParams();
//     const [utilisateur, setUtilisateur] = useState([]);
   
//     console.log('ID de l\'utilisateur depuis useParams :', idUser);

//     const fetchLists = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         console.log('Token récupéré depuis le localStorage :', token);
//         const response = await axios.get(`http://localhost:4000/api/user/compte/${idUser}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//             // Ajouter votre token d'authentification ici si nécessaire
//           },
//         });
//         console.log('Données récupérées depuis l\'API :', response.data);
//         setUtilisateur(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des donnée utilisateur', error);
//       }
//     };

  
//     useEffect(() => {
//         console.log('Le composant Compte est monté.');
//       fetchLists();
      
//   console.log('Requête fetchLists exécutée.');
//     }, []);
//     return (
//         <div>
//             <h2>teste donné utilisateur </h2>
//         </div>
//     );
// };

// export default UserInfo;